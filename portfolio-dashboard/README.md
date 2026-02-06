# Dynamic Portfolio Dashboard

A Next.js application for tracking stock investments with real-time price updates and sector analytics.

## Features

- **Real-time Data**: Updates Current Market Price (CMP) every 15 seconds.
- **Sector Analysis**: Aggregated views of Investment, Present Value, and Gain/Loss by sector.
- **Visual Indicators**: Color-coded Gain (Green) and Loss (Red) metrics.
- **Unified Architecture**: Frontend and Backend logic combined into a single Next.js application for easy deployment.

## Architecture

The project is a **Unified Next.js Application**:

- **Frontend**: Next.js 14 (App Router), Tailwind CSS.
- **Backend Logic**: Migrated to Next.js API Routes (`/api/portfolio`).
- **Scraping**: Uses `puppeteer-core` and `@sparticuz/chromium` to support serverless deployment on Vercel.

## Deployment (Vercel)

This project is optimized for **Vercel**.

1.  Push this repository to GitHub.
2.  Import into Vercel.
3.  Set **Root Directory** to `frontend`.
4.  Deploy.

## Local Development

1.  Navigate to the directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3005](http://localhost:3005) (or port 3000) in your browser.
