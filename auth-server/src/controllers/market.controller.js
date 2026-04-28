let marketData = [
    { id:1, commodity:"Basmati Rice", market:"Karnal Mandi, Haryana", price:420.00, change:1.4, volume:18500, grade:"A+ GRADE", status:"Active", name:"Basmati Rice", region:"Haryana", statusColor:"green", image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=200&auto=format&fit=crop" },
    { id:2, commodity:"Premium Wheat", market:"Haryani Mandi, Punjab", price:212.45, change:1.2, volume:12450, grade:"A+ GRADE", status:"HIGH DEMAND", name:"Premium Wheat", region:"Punjab", statusColor:"green", image:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=200&auto=format&fit=crop" },
    { id:3, commodity:"Yellow Corn", market:"Nizamabad APMC", price:165.30, change:0.6, volume:32000, grade:"STANDARD", status:"STABLE", name:"Yellow Corn", region:"Telangana", statusColor:"blue", image:"https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=200&auto=format&fit=crop" },
    { id:4, commodity:"Sugarcane", market:"Muzaffarnagar Mandi, UP", price:95.00, change:0.3, volume:55000, grade:"PRIME", status:"STABLE", name:"Sugarcane", region:"Uttar Pradesh", statusColor:"blue", image:"https://images.unsplash.com/photo-1590391038501-c67d3071bb25?q=80&w=200&auto=format&fit=crop" },
    { id:5, commodity:"Soybeans", market:"Indore APMC", price:310.00, change:-1.8, volume:19000, grade:"B GRADE", status:"PRICE DROP", name:"Soybeans", region:"Madhya Pradesh", statusColor:"red", image:"https://images.unsplash.com/photo-1628001614741-f7a63aa36e1c?q=80&w=200&auto=format&fit=crop" },
    { id:6, commodity:"Cotton (Kapas)", market:"Rajkot Mandi", price:756.00, change:-0.5, volume:8400, grade:"PRIME", status:"VOLATILE", name:"Cotton (Kapas)", region:"Gujarat", statusColor:"red", image:"https://images.unsplash.com/photo-1647427022830-ec667c2957b9?q=80&w=200&auto=format&fit=crop" },
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
