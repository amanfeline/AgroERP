import { useState, useEffect, useCallback } from 'react';

export const countryMarketData = {
  "India": [
    { id:1, commodity:"Basmati Rice",    market:"Karnal Mandi, Haryana",        price:420.00, change:1.4, volume:18500, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Premium Wheat",   market:"Haryani Mandi, Punjab",        price:212.45, change:1.2, volume:12450, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:3, commodity:"Yellow Corn",     market:"Nizamabad APMC, Telangana",    price:165.30, change:0.6, volume:32000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:4, commodity:"Sugarcane",       market:"Muzaffarnagar Mandi, UP",      price:95.00,  change:0.3, volume:55000, grade:"PRIME",    gradeColor:"default", status:"Active"   },
    { id:5, commodity:"Soybeans",        market:"Indore APMC, Madhya Pradesh",  price:310.00, change:-1.8, volume:19000, grade:"B GRADE",  gradeColor:"default", status:"Active"   },
    { id:6, commodity:"Cotton (Kapas)",  market:"Rajkot Mandi, Gujarat",        price:756.00, change:-0.5, volume:8400,  grade:"PRIME",    gradeColor:"default", status:"Volatile" },
  ],
  "North America (USA)": [
    { id:1, commodity:"Hard Red Wheat",  market:"Kansas City Board of Trade",   price:545.00, change:2.1, volume:42000, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Yellow Corn",     market:"Chicago Board of Trade",       price:445.00, change:0.8, volume:95000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:3, commodity:"Soybeans",        market:"Chicago Mercantile Exchange",  price:1180.00,change:-1.2, volume:61000, grade:"A GRADE",  gradeColor:"green",   status:"Active"   },
    { id:4, commodity:"Long Grain Rice", market:"USDA Memphis Exchange",        price:560.00, change:-0.4, volume:14000, grade:"EXPORT",   gradeColor:"default", status:"Active"   },
    { id:5, commodity:"Upland Cotton",   market:"ICE Futures, New York",        price:842.00, change:0,    volume:28000, grade:"PRIME",    gradeColor:"default", status:"Volatile" },
    { id:6, commodity:"Oats",            market:"Minneapolis Grain Exchange",   price:320.00, change:1.5, volume:9500,  grade:"STANDARD", gradeColor:"default", status:"Active"   },
  ],
  "South Asia": [
    { id:1, commodity:"Basmati Rice",    market:"Lahore Commodity Exchange",    price:390.00, change:1.1, volume:14000, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Wheat",           market:"Karachi Grain Market",         price:198.00, change:0.9, volume:22000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:3, commodity:"Jute",            market:"Dhaka Commodity Exchange",     price:620.00, change:2.3, volume:7800,  grade:"PRIME",    gradeColor:"default", status:"Active"   },
    { id:4, commodity:"Tea (CTC)",       market:"Colombo Tea Auctions",         price:2800.00,change:-0.6, volume:3200,  grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:5, commodity:"Sugarcane",       market:"Faisalabad Mandi, Pakistan",   price:88.00,  change:0.4, volume:41000, grade:"B GRADE",  gradeColor:"default", status:"Active"   },
    { id:6, commodity:"Soybeans",        market:"Chittagong Port Exchange",     price:295.00, change:-1.4, volume:11000, grade:"EXPORT",   gradeColor:"default", status:"Active"   },
  ],
  "Europe": [
    { id:1, commodity:"Milling Wheat",   market:"Euronext Paris",               price:210.00, change:-0.8, volume:38000, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Feed Barley",     market:"London Baltic Exchange",       price:185.00, change:0.5, volume:19000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:3, commodity:"Rapeseed",        market:"Euronext Paris",               price:460.00, change:1.7, volume:12000, grade:"PRIME",    gradeColor:"default", status:"Active"   },
    { id:4, commodity:"Sunflower Oil",   market:"Budapest Commodity Exchange",  price:920.00, change:-2.3, volume:8500,  grade:"A GRADE",  gradeColor:"green",   status:"Volatile" },
    { id:5, commodity:"Corn (Maize)",    market:"Euronext Paris",               price:190.00, change:0.3, volume:44000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:6, commodity:"Sugar (White)",   market:"London ICE Exchange",          price:548.00, change:1.1, volume:17000, grade:"EXPORT",   gradeColor:"default", status:"Active"   },
  ],
  "China": [
    { id:1, commodity:"Rice (Japonica)", market:"Zhengzhou Commodity Exchange", price:480.00, change:0.7, volume:62000, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Corn (Maize)",    market:"Dalian Commodity Exchange",    price:265.00, change:1.3, volume:88000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:3, commodity:"Soybeans",        market:"Dalian Commodity Exchange",    price:580.00, change:-0.9, volume:71000, grade:"A GRADE",  gradeColor:"green",   status:"Active"   },
    { id:4, commodity:"Wheat",           market:"Zhengzhou Commodity Exchange", price:310.00, change:0.5, volume:47000, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:5, commodity:"Cotton",          market:"Zhengzhou Commodity Exchange", price:1650.00,change:-1.6, volume:9200,  grade:"PRIME",    gradeColor:"default", status:"Volatile" },
    { id:6, commodity:"Sugar",           market:"Zhengzhou Commodity Exchange", price:390.00, change:0.8, volume:21000, grade:"EXPORT",   gradeColor:"default", status:"Active"   },
  ],
  "Brazil": [
    { id:1, commodity:"Soybeans",        market:"B3 Bolsa de Valores",          price:1195.00,change:1.9, volume:82000, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Arabica Coffee",  market:"Santos Exchange, São Paulo",   price:2480.00,change:3.2, volume:6800,  grade:"PRIME",    gradeColor:"default", status:"Active"   },
    { id:3, commodity:"Sugarcane",       market:"CEPEA/Esalq, São Paulo",       price:112.00, change:-0.4, volume:95000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:4, commodity:"Corn (Maize)",    market:"B3 Bolsa de Valores",          price:195.00, change:0.6, volume:74000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:5, commodity:"Cotton",          market:"B3 Bolsa de Valores",          price:870.00, change:-1.1, volume:11000, grade:"A GRADE",  gradeColor:"green",   status:"Active"   },
    { id:6, commodity:"Orange Juice",    market:"CEPEA/Esalq, São Paulo",       price:1820.00,change:2.7, volume:4200,  grade:"EXPORT",   gradeColor:"default", status:"Active"   },
  ],
  "Australia": [
    { id:1, commodity:"Hard Wheat",      market:"ASX Sydney Grain",             price:290.00, change:1.0, volume:28000, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Canola",          market:"ASX Perth Grain",              price:520.00, change:1.8, volume:13000, grade:"PRIME",    gradeColor:"default", status:"Active"   },
    { id:3, commodity:"Barley",          market:"ASX Adelaide Grain",           price:220.00, change:-0.3, volume:17000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:4, commodity:"Sorghum",         market:"ASX Brisbane Grain",           price:175.00, change:0.7, volume:9800,  grade:"B GRADE",  gradeColor:"default", status:"Active"   },
    { id:5, commodity:"Chickpeas",       market:"ASX Sydney Pulses",            price:480.00, change:2.1, volume:6200,  grade:"EXPORT",   gradeColor:"default", status:"Active"   },
    { id:6, commodity:"Wool",            market:"Australian Wool Exchange",     price:1240.00,change:-0.8, volume:3100,  grade:"PRIME",    gradeColor:"default", status:"Active"   },
  ],
  "Southeast Asia": [
    { id:1, commodity:"Long Grain Rice", market:"Ayutthaya Center, Thailand",   price:408.00, change:-0.4, volume:38000, grade:"EXPORT",   gradeColor:"default", status:"Active"   },
    { id:2, commodity:"Palm Oil",        market:"Bursa Malaysia Derivatives",   price:980.00, change:2.4, volume:52000, grade:"A GRADE",  gradeColor:"green",   status:"Active"   },
    { id:3, commodity:"Rubber",          market:"Singapore Commodity Exchange", price:1650.00,change:1.1, volume:14000, grade:"PRIME",    gradeColor:"default", status:"Active"   },
    { id:4, commodity:"Cassava",         market:"Thai Tapioca Exchange",        price:125.00, change:0.5, volume:28000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:5, commodity:"Coffee Robusta",  market:"Vietnam Coffee Exchange",      price:1920.00,change:3.5, volume:9400,  grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:6, commodity:"Coconut Oil",     market:"Manila Commodity Exchange",    price:1340.00,change:-1.2, volume:7100,  grade:"EXPORT",   gradeColor:"default", status:"Active"   },
  ],
  "Middle East": [
    { id:1, commodity:"Dates (Medjool)", market:"Dubai Commodity Centre",       price:3200.00,change:1.6, volume:4200,  grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Wheat (Durum)",   market:"Cairo Commodity Exchange",     price:238.00, change:0.9, volume:19000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:3, commodity:"Barley",          market:"Saudi SAGO Exchange",          price:195.00, change:-0.6, volume:14000, grade:"B GRADE",  gradeColor:"default", status:"Active"   },
    { id:4, commodity:"Cotton",          market:"Egyptian Cotton Exchange",     price:1820.00,change:2.2, volume:5800,  grade:"PRIME",    gradeColor:"default", status:"Active"   },
    { id:5, commodity:"Lentils",         market:"Ankara Grain Exchange, Turkey",price:640.00, change:1.4, volume:7200,  grade:"EXPORT",   gradeColor:"default", status:"Active"   },
    { id:6, commodity:"Chickpeas",       market:"Istanbul Commodity Exchange",  price:520.00, change:-1.0, volume:6100,  grade:"A GRADE",  gradeColor:"green",   status:"Active"   },
  ],
  "Africa": [
    { id:1, commodity:"Cocoa",           market:"Ghana Cocoa Board, Accra",     price:8200.00,change:4.1, volume:5600,  grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Arabica Coffee",  market:"Ethiopian Commodity Exchange", price:2650.00,change:2.8, volume:4800,  grade:"PRIME",    gradeColor:"default", status:"Active"   },
    { id:3, commodity:"Maize (Corn)",    market:"SAFEX Johannesburg",           price:168.00, change:0.4, volume:31000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:4, commodity:"Sunflower",       market:"SAFEX Johannesburg",           price:430.00, change:-1.3, volume:12000, grade:"B GRADE",  gradeColor:"default", status:"Active"   },
    { id:5, commodity:"Cashew Nuts",     market:"Abidjan Commodity Exchange",   price:1480.00,change:3.6, volume:3900,  grade:"EXPORT",   gradeColor:"default", status:"Active"   },
    { id:6, commodity:"Sesame Seeds",    market:"Sudan Khartoum Exchange",      price:1120.00,change:1.9, volume:5200,  grade:"A GRADE",  gradeColor:"green",   status:"Active"   },
  ],
  "Russia": [
    { id:1, commodity:"Spring Wheat",    market:"Moscow Exchange (MOEX)",       price:196.00, change:0.8, volume:52000, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Barley",          market:"Moscow Exchange (MOEX)",       price:172.00, change:-0.3, volume:28000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:3, commodity:"Sunflower Oil",   market:"Moscow Exchange (MOEX)",       price:890.00, change:2.1, volume:16000, grade:"PRIME",    gradeColor:"default", status:"Active"   },
    { id:4, commodity:"Corn (Maize)",    market:"St. Petersburg Grain Exchange",price:185.00, change:0.6, volume:21000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:5, commodity:"Rapeseed",        market:"Moscow Exchange (MOEX)",       price:440.00, change:-1.8, volume:9800,  grade:"EXPORT",   gradeColor:"default", status:"Volatile" },
    { id:6, commodity:"Flaxseed",        market:"Novosibirsk Grain Exchange",   price:380.00, change:1.2, volume:7300,  grade:"B GRADE",  gradeColor:"default", status:"Active"   },
  ],
  "Canada": [
    { id:1, commodity:"Canola",          market:"ICE Futures Canada, Winnipeg", price:595.00, change:1.4, volume:34000, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:2, commodity:"Hard Red Spring", market:"Minneapolis Grain Exchange",   price:560.00, change:2.0, volume:29000, grade:"A+ GRADE", gradeColor:"green",   status:"Active"   },
    { id:3, commodity:"Barley",          market:"ICE Futures Canada",           price:215.00, change:-0.5, volume:18000, grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:4, commodity:"Yellow Peas",     market:"Winnipeg Commodity Exchange",  price:340.00, change:1.1, volume:11000, grade:"EXPORT",   gradeColor:"default", status:"Active"   },
    { id:5, commodity:"Oats",            market:"ICE Futures Canada",           price:295.00, change:0.7, volume:9600,  grade:"STANDARD", gradeColor:"default", status:"Active"   },
    { id:6, commodity:"Lentils",         market:"Saskatchewan Grain Exchange",  price:420.00, change:-0.9, volume:7800,  grade:"PRIME",    gradeColor:"default", status:"Active"   },
  ],
};

export const fetchLivePrices = async (selectedCountry) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = countryMarketData[selectedCountry] || countryMarketData["India"];
            const mappedData = data.map(item => {
                const fluctuation = item.price * (Math.random() * 0.01 - 0.005);
                return {
                    ...item,
                    price: parseFloat((item.price + fluctuation).toFixed(2))
                };
            });
            resolve(mappedData);
        }, 300); // simulate network delay
    });
};

export const useLivePrices = (selectedCountry = "India") => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const updateData = useCallback(async () => {
        setIsLoading(true);
        const newData = await fetchLivePrices(selectedCountry);
        setData(newData);
        setLastUpdated(new Date());
        setIsLoading(false);
    }, [selectedCountry]);

    useEffect(() => {
        updateData();
        const interval = setInterval(updateData, 30000);
        return () => clearInterval(interval);
    }, [updateData]);

    return { data, isLoading, lastUpdated, refresh: updateData };
};
