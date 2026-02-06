
"use client";

import { useEffect, useState, useCallback } from "react";
import PortfolioTable from "./PortfolioTable";
import SectorSummary from "./SectorSummary";
import { PortfolioResponse } from "../types";

const Dashboard = () => {
    const [data, setData] = useState<PortfolioResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchData = useCallback(async () => {
        try {
            // Use relative path for Vercel deployment
            const res = await fetch('/api/portfolio');
            if (!res.ok) throw new Error("Failed to fetch data");
            const json = await res.json();
            if (json.success) {
                setData(json.data);
                setLastUpdated(new Date());
                setError(null);
            } else {
                setError(json.error || "Unknown error");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to connect to backend. Please check your network connection.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 15000); // 15 seconds polling
        return () => clearInterval(interval);
    }, [fetchData]);

    if (loading && !data) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className="p-8 text-center text-red-600 bg-red-50 h-screen flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-2">Error Loading Dashboard</h2>
                <p>{error}</p>
                <button
                    onClick={() => { setLoading(true); fetchData(); }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Portfolio Dashboard</h1>
                        <p className="text-gray-500 mt-1">Real-time stock investment tracking</p>
                    </div>
                    {lastUpdated && (
                        <div className="text-sm text-gray-400">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </div>
                    )}
                </header>

                {error && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                        <p>Warning: {error}</p>
                        <p className="text-sm">Showing cached/stale data.</p>
                    </div>
                )}

                {data && (
                    <>
                        <SectorSummary sectors={data.sectors} />

                        <div className="bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Portfolio Details</h2>
                            <PortfolioTable data={data.stocks} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <p className="text-gray-500 text-sm">Total Investment</p>
                                <p className="text-2xl font-bold mt-1">{data.totalInvestment.toFixed(2)}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <p className="text-gray-500 text-sm">Total Present Value</p>
                                <p className="text-2xl font-bold mt-1 text-blue-600">{data.totalPresentValue.toFixed(2)}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <p className="text-gray-500 text-sm">Total Gain/Loss</p>
                                <p className={`text-2xl font-bold mt-1 ${data.totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                                    {data.totalGainLoss.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
