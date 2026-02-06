
export interface PortfolioStock {
  sector: string;
  stockName: string;
  symbol: string;
  purchasePrice: number;
  quantity: number;
}

export interface StockData extends PortfolioStock {
  cmp: number | null;
  presentValue: number | null;
  gainLoss: number | null;
  peRatio: string | null;
  earnings: string | null;
  portfolioPercentage: number;
  investment: number;
  error?: string;
}

export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  stocks: StockData[];
}

export interface PortfolioResponse {
  timestamp: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  stocks: StockData[];
  sectors: SectorSummary[];
}
