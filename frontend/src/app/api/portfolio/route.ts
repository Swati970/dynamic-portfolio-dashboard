import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Simple mock data that will always work
        const mockData = {
            timestamp: new Date().toISOString(),
            totalInvestment: 500000,
            totalPresentValue: 550000,
            totalGainLoss: 50000,
            stocks: [
                {
                    sector: "Technology",
                    stockName: "Infosys Ltd",
                    symbol: "INFY.NS",
                    purchasePrice: 1450.50,
                    quantity: 50,
                    cmp: 1500.00,
                    presentValue: 75000,
                    investment: 72525,
                    gainLoss: 2475,
                    portfolioPercentage: 14.5,
                    peRatio: null,
                    earnings: null
                },
                {
                    sector: "Banking",
                    stockName: "HDFC Bank",
                    symbol: "HDFCBANK.NS",
                    purchasePrice: 1600.00,
                    quantity: 40,
                    cmp: 1650.00,
                    presentValue: 66000,
                    investment: 64000,
                    gainLoss: 2000,
                    portfolioPercentage: 12.8,
                    peRatio: null,
                    earnings: null
                }
            ],
            sectors: [
                {
                    sector: "Technology",
                    totalInvestment: 72525,
                    totalPresentValue: 75000,
                    totalGainLoss: 2475,
                    stocks: []
                },
                {
                    sector: "Banking",
                    totalInvestment: 64000,
                    totalPresentValue: 66000,
                    totalGainLoss: 2000,
                    stocks: []
                }
            ]
        };
        
        return NextResponse.json({ success: true, data: mockData });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'API Error' },
            { status: 500 }
        );
    }
}