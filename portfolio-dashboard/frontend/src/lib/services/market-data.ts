
export class MarketDataService {
    /**
     * Fetches current market price (CMP) for a list of symbols
     */
    async fetchCMP(symbols: string[]): Promise<Record<string, number>> {
        const data: Record<string, number> = {};
        
        // Mock data for fast loading
        symbols.forEach(symbol => {
            data[symbol] = 100 + Math.random() * 500;
        });
        
        return data;
    }
}
