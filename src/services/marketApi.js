import { useState, useEffect, useCallback } from 'react';

export const useLivePrices = (selectedCountry = "India") => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPrices = useCallback(async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/market-prices?country=${selectedCountry}`);
            const result = await res.json();
            
            if (result.success) {
                setData(result.data);
            }
        } catch (error) {
            console.error("Error fetching live market data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedCountry]);

    useEffect(() => {
        fetchPrices(); 
        
        const intervalId = setInterval(fetchPrices, 30000);
        return () => clearInterval(intervalId);
    }, [fetchPrices]);

    return { data, isLoading, refresh: fetchPrices };
};
