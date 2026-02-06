import { NextResponse } from 'next/server';
import { PortfolioService } from '@/lib/services/portfolio';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const portfolioService = new PortfolioService();
        const data = await portfolioService.getPortfolioData();
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch portfolio data' },
            { status: 500 }
        );
    }
}