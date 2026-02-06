
import NodeCache from 'node-cache';
import { MarketDataService } from './market-data';
import { ScraperService } from './scraper';
import { StockData, SectorSummary, PortfolioStock } from '@/types';
import portfolioData from '@/data/portfolio.json'; // Direct import of JSON

export class PortfolioService {
    private marketDataService: MarketDataService;
    private scraperService: ScraperService;
    private cache: NodeCache;

    constructor() {
        this.marketDataService = new MarketDataService();
        this.scraperService = new ScraperService();
        this.cache = new NodeCache({ stdTTL: 15 });
    }

    async getPortfolioData() {
        try {
            // 1. Get Static Data
            const portfolio: PortfolioStock[] = portfolioData as PortfolioStock[];
            const symbols = portfolio.map(p => p.symbol);

            // 2. Get Dynamic Data (CMP) - Cache key: 'marketData'
            let prices = this.cache.get<Record<string, number>>('marketData');
            if (!prices) {
                prices = await this.marketDataService.fetchCMP(symbols);
                this.cache.set('marketData', prices, 15);
            }

            // 3. Get Fundamentals (P/E, Earnings) - Disabled for faster loading
            const fundamentals: Record<string, { pe: string | null; eps: string | null }> = {};

            // 4. Calculate Derived Values & Merge
            const totalInvestment = portfolio.reduce((sum, stock) => sum + (stock.purchasePrice * stock.quantity), 0);
            const stockPrices = prices || {};

            const stocks: StockData[] = portfolio.map(stock => {
                const cmp = stockPrices[stock.symbol] || 0;
                const investment = stock.purchasePrice * stock.quantity;
                const presentValue = cmp * stock.quantity;
                const gainLoss = presentValue - investment;
                const portfolioPercentage = totalInvestment > 0 ? (investment / totalInvestment) * 100 : 0;

                const fund = (fundamentals && fundamentals[stock.symbol]) || { pe: null, eps: null };

                return {
                    ...stock,
                    cmp,
                    presentValue,
                    investment,
                    gainLoss,
                    portfolioPercentage,
                    peRatio: fund.pe,
                    earnings: fund.eps
                };
            });

            // 5. Aggregate Sector Summary
            const sectorMap = new Map<string, SectorSummary>();

            stocks.forEach(stock => {
                if (!sectorMap.has(stock.sector)) {
                    sectorMap.set(stock.sector, {
                        sector: stock.sector,
                        totalInvestment: 0,
                        totalPresentValue: 0,
                        totalGainLoss: 0,
                        stocks: []
                    });
                }

                const summary = sectorMap.get(stock.sector)!;
                summary.totalInvestment += stock.investment;
                summary.totalPresentValue += (stock.presentValue || 0);
                summary.totalGainLoss += (stock.gainLoss || 0);
                summary.stocks.push(stock);
            });

            const sectors = Array.from(sectorMap.values());

            return {
                timestamp: new Date().toISOString(),
                totalInvestment,
                totalPresentValue: stocks.reduce((sum, s) => sum + (s.presentValue || 0), 0),
                totalGainLoss: stocks.reduce((sum, s) => sum + (s.gainLoss || 0), 0),
                stocks,
                sectors
            };

        } catch (error) {
            console.error('Error constructing portfolio data:', error);
            throw error;
        }
    }
}
