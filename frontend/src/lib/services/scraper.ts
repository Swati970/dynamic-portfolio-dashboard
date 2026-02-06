
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

interface ScrapedData {
    peRatio: string | null;
    earnings: string | null;
}

export class ScraperService {
    private readonly GOOGLE_FINANCE_URL = 'https://www.google.com/finance/quote/';

    private async getBrowser() {
        // @sparticuz/chromium configuration for Vercel
        // Note: In local development, we might need a local executable path or use full puppeteer
        // But for Vercel deployment, this is critical.

        const isLocal = process.env.NODE_ENV === 'development';

        let executablePath;
        if (isLocal) {
            // For local dev, we unfortunately need a local Chrome. 
            // Since we installed puppeteer-core only, we might need to point to a local Chrome installation or rely on the user having one.
            // OR, we can try to use the installed full 'puppeteer' if present, but we only installed core.
            // A common trick is to use a local path if available.
            // For now, let's assume standard paths or if completely missing, fail gracefully.
            // Ideally, for true local dev, we should devDependencies: "puppeteer".
            executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"; // Common Windows Path
        } else {
            executablePath = await chromium.executablePath();
        }

        // Define type for sparticuz/chromium to avoid 'any' and IDE errors
        interface ChromiumLib {
            args: string[];
            defaultViewport: { width: number; height: number };
            executablePath: () => Promise<string>;
            headless: boolean | "new" | "shell";
        }

        const chromiumLib = chromium as unknown as ChromiumLib;

        // Puppeteer v22+ deprecated 'new'. Use true/false or 'shell'.
        const headlessMode: boolean | "shell" = isLocal ? true : (chromiumLib.headless === "new" ? true : chromiumLib.headless as boolean | "shell");

        try {
            return await puppeteer.launch({
                args: isLocal ? ['--no-sandbox'] : chromiumLib.args,
                defaultViewport: chromiumLib.defaultViewport,
                executablePath: executablePath || await chromiumLib.executablePath(),
                headless: headlessMode as boolean,
                timeout: 5000 // Fast fail for browser launch (5s)
            });
        } catch (e: any) {
            console.error("Failed to launch browser:", e.message);
            throw new Error("Browser launch failed"); // Re-throw to be caught by fetchFundamentals
        }
    }

    async fetchFundamentals(symbol: string): Promise<ScrapedData> {
        const result: ScrapedData = { peRatio: null, earnings: null };

        // In local dev, if browser launch fails, just return empty data to prevent hanging
        let browser = null;
        let page = null;

        try {
            browser = await this.getBrowser();
            if (!browser) return result; // Should catch in getBrowser but safety check

            page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

            // Map NSE symbols to Google Finance format
            const formattedSymbol = this.formatSymbolForGoogle(symbol);

            await page.goto(`${this.GOOGLE_FINANCE_URL}${formattedSymbol}`, {
                waitUntil: 'domcontentloaded',
                timeout: 10000
            });

            const data = await page.evaluate(() => {
                const getTextFromLabel = (label: string) => {
                    const elements = Array.from(document.querySelectorAll('div, tr, td')) as HTMLElement[];
                    for (const el of elements) {
                        if (el.textContent?.trim() === label) {
                            const sibling = el.nextElementSibling;
                            if (sibling) return sibling.textContent?.trim() || null;
                        }
                    }
                    return null;
                };

                return {
                    pe: getTextFromLabel('P/E ratio'),
                    eps: getTextFromLabel('Earnings per share'),
                };
            });

            result.peRatio = data.pe;
            result.earnings = data.eps;

        } catch (error) {
            console.error(`Scraping failed for ${symbol}:`, error instanceof Error ? error.message : error);
        } finally {
            if (page) await page.close();
            if (browser) await browser.close();
        }

        return result;
    }

    private formatSymbolForGoogle(symbol: string): string {
        if (symbol.endsWith('.NS')) {
            return `${symbol.replace('.NS', '')}:NSE`;
        }
        if (symbol.endsWith('.BO')) {
            return `${symbol.replace('.BO', '')}:BOM`;
        }
        return symbol;
    }
}
