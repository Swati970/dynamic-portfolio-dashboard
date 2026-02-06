
import { NextResponse } from 'next/server';
import { PortfolioService } from '@/lib/services/portfolio';

// Mark route as dynamic because it fetches data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const portfolioService = new PortfolioService();

export async function GET() {
    try {
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
