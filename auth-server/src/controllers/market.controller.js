let marketData = [
    { id:1, commodity:"Basmati Rice", market:"Karnal Mandi, Haryana", price:420.00, change:1.4, volume:18500, grade:"A+ GRADE", status:"Active" },
    { id:2, commodity:"Premium Wheat", market:"Haryani Mandi, Punjab", price:212.45, change:1.2, volume:12450, grade:"A+ GRADE", status:"Active" },
    { id:3, commodity:"Yellow Corn", market:"Nizamabad APMC", price:165.30, change:0.6, volume:32000, grade:"STANDARD", status:"Active" },
    { id:4, commodity:"Sugarcane", market:"Muzaffarnagar Mandi, UP", price:95.00, change:0.3, volume:55000, grade:"PRIME", status:"Active" },
    { id:5, commodity:"Soybeans", market:"Indore APMC", price:310.00, change:-1.8, volume:19000, grade:"B GRADE", status:"Active" },
    { id:6, commodity:"Cotton (Kapas)", market:"Rajkot Mandi", price:756.00, change:-0.5, volume:8400, grade:"PRIME", status:"Volatile" },
];

setInterval(() => {
    marketData = marketData.map(item => {
        const jitter = 1 + (Math.random() * 0.01 - 0.005); 
        const newPrice = item.price * jitter;
        const newChange = ((newPrice - item.price) / item.price) * 100;
        
        return {
            ...item,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat((item.change + newChange).toFixed(2)) 
        };
    });
}, 5000);

export const getLiveMarketPrices = (req, res) => {
    res.json({ success: true, data: marketData });
};
