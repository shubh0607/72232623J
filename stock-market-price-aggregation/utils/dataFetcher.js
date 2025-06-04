
const axios = require("axios");
const priceCache = new Map();

exports.fetchStockData = async (ticker, minutes) => {
    const cacheKey = `${ticker}-${minutes}`;
    if (priceCache.has(cacheKey)) return priceCache.get(cacheKey);

    try {
        const response = await axios.get(
            `http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`
        );
        const data = response.data.map((entry) => ({
            price: entry.price,
            time: new Date(entry.lastUpdatedAt).getTime(),
        }));
        priceCache.set(cacheKey, data);
        setTimeout(() => priceCache.delete(cacheKey), 30000);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch stock data");
    }
};
