# Dynamic Portfolio Dashboard

A Next.js application for tracking stock investments with real-time price updates and sector analytics.

🚀 **Live Demo:** [https://dynamic-portfolio-dashboard-nz3s.vercel.app/](https://dynamic-portfolio-dashboard-nz3s.vercel.app/)

## Features

- **Real-time Data**: Updates Current Market Price (CMP) every 15 seconds
- **Sector Analysis**: Aggregated views of Investment, Present Value, and Gain/Loss by sector
- **Visual Indicators**: Color-coded Gain (Green) and Loss (Red) metrics
- **Unified Architecture**: Frontend and Backend logic combined into a single Next.js application

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Data Visualization**: Recharts, TanStack Table
- **Web Scraping**: Puppeteer Core with Chromium

## Project Structure

```
portfolio-dashboard/
└── frontend/
    ├── src/
    │   ├── app/          # Next.js app router pages
    │   ├── components/   # React components
    │   ├── data/         # Data files
    │   ├── lib/          # Utility functions
    │   └── types/        # TypeScript types
    └── package.json
```

## Getting Started

### Local Development

1. Navigate to the frontend directory:
   ```bash
   cd portfolio-dashboard/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3005](http://localhost:3005) in your browser

### Build for Production

```bash
cd portfolio-dashboard/frontend
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push this repository to GitHub
2. Import into Vercel
3. Set **Root Directory** to `portfolio-dashboard/frontend`
4. Deploy

## Environment Variables

Create a `.env.local` file in the `frontend` directory (see `.env.local.example` for reference).

## License

MIT
