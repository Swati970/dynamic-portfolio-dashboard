
const check = async () => {
    try {
        const url = 'http://localhost:3005/api/portfolio';
        console.log(`Checking ${url}...`);
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const json = await res.json();
        console.log('✅ API Connection: Success');
        console.log(`📊 Total Investment: ${json.data.totalInvestment}`);
        console.log(`📈 Data Timestamp: ${json.data.timestamp}`);

        if (json.data.stocks.length === 0) {
            console.warn('⚠️ No stocks found in portfolio.');
        } else {
            console.log(`✅ Stocks Loaded: ${json.data.stocks.length}`);
        }

    } catch (error) {
        console.error('❌ Check Failed:', error.message);
        console.error('Ensure the dev server is running on port 3005.');
        process.exit(1);
    }
};

check();
