import { NextResponse } from 'next/server';
import { PortfolioService } from '@/lib/services/portfolio';

// Mark route as dynamic because it fetches data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        console.log('API route called');
        const portfolioService = new PortfolioService();
        const data = await portfolioService.getPortfolioData();
        console.log('Data fetched successfully');
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: `Failed to fetch portfolio data: ${error}` },
            { status: 500 }
        );
    }
}