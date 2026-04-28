export const weatherForecast = [
    { day: 'MON', icon: 'wb_sunny', temp: 28, fullDay: 'Monday' },
    { day: 'TUE', icon: 'cloud', temp: 24, fullDay: 'Tuesday' },
    { day: 'WED', icon: 'rainy', temp: 21, fullDay: 'Wednesday' },
    { day: 'THU', icon: 'wb_sunny', temp: 27, fullDay: 'Thursday' },
    { day: 'FRI', icon: 'partly_cloudy_day', temp: 29, fullDay: 'Friday' },
    { day: 'SAT', icon: 'wb_sunny', temp: 30, fullDay: 'Saturday' },
];

export const weatherChartData = [
    { name: 'Mon', temp: 28 },
    { name: 'Tue', temp: 24 },
    { name: 'Wed', temp: 21 },
    { name: 'Thu', temp: 27 },
    { name: 'Fri', temp: 29 },
    { name: 'Sat', temp: 30 },
];

export const cropProgressStages = [
    { id: 1, name: 'Sowing', status: 'completed', date: 'Oct 12', icon: 'check' },
    { id: 2, name: 'Germination', status: 'completed', date: 'Oct 28', icon: 'check' },
    { id: 3, name: 'Vegetative', status: 'active', date: 'In Progress', icon: 'grass' },
    { id: 4, name: 'Flowering', status: 'future', date: 'Est. Nov 20', icon: 'water_drop' },
    { id: 5, name: 'Harvest', status: 'future', date: 'Est. Dec 15', icon: 'agriculture' },
];

export const marketInsights = [
    {
        id: 1,
        name: 'Wheat (Premium)',
        region: 'Midwest Hub',
        price: 240.50,
        change: 5.2,
        status: 'HIGH DEMAND',
        statusColor: 'green',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=200&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'Corn (Hybrid)',
        region: 'Central Valley',
        price: 185.00,
        change: 2.1,
        status: 'STABLE',
        statusColor: 'blue',
        image: 'https://images.unsplash.com/photo-1599370126788-b4babe8c0c45?q=80&w=200&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Soybeans',
        region: 'Northern Plains',
        price: 410.25,
        change: -1.4,
        status: 'PRICE DROP',
        statusColor: 'red',
        image: 'https://images.unsplash.com/photo-1628001614741-f7a63aa36e1c?q=80&w=200&auto=format&fit=crop',
    },
];

export const exploreCrops = [
    {
        id: 1,
        name: 'Basmati Rice',
        description: 'High yield potential for upcoming monsoon',
        badge: 'TOP PRIORITY',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Maize (Hybrid)',
        description: 'Drought resistant variant for dry zones',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Bt Cotton',
        description: 'Pest resistant with long fiber length',
        image: 'https://images.unsplash.com/photo-1647427022830-ec667c2957b9?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Black Soy',
        description: 'Nitrogen fixing cover crop option',
        image: 'https://images.unsplash.com/photo-1521575791263-dcae8a881cb5?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Sugarcane',
        description: 'High profitability with steady water supply',
        image: 'https://images.unsplash.com/photo-1590391038501-c67d3071bb25?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 6,
        name: 'Groundnut',
        description: 'Excellent for sandy loam soils',
        image: 'https://images.unsplash.com/photo-1629828557929-e8dafb66cb1e?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 7,
        name: 'Turmeric',
        description: 'High value cash crop with medicinal properties',
        image: 'https://images.unsplash.com/photo-1615484477201-cb864b2811cc?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 8,
        name: 'Pigeon Pea (Arhar)',
        description: 'Deep-rooted, drought-tolerant pulse',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 9,
        name: 'Pearl Millet (Bajra)',
        description: 'Resilient crop for semi-arid regions',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 10,
        name: 'Sorghum (Jowar)',
        description: 'Dual-purpose grain and fodder crop',
        image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=300&auto=format&fit=crop'
    }
];

export const marketTableData = [
    { id: 1, commodity: 'Premium Wheat', market: 'Haryani Mandi, Punjab', price: 212.45, change: 1.2, volume: '12,450', grade: 'A+ GRADE', gradeColor: 'green', status: 'Active', category: 'Cereals' },
    { id: 2, commodity: 'Long Grain Rice', market: 'Ayutthaya Center, Thailand', price: 408.20, change: -0.4, volume: '8,200', grade: 'EXPORT', gradeColor: 'gray', status: 'Active', category: 'Cereals' },
    { id: 3, commodity: 'Yellow Corn', market: 'Chicago Board of Trade', price: 186.10, change: 0.8, volume: '45,000', grade: 'STANDARD', gradeColor: 'green', status: 'Active', category: 'Cereals' },
    { id: 4, commodity: 'Upland Cotton', market: 'Gujarat Central Mandi', price: 842.00, change: 0.0, volume: '3,400', grade: 'PRIME', gradeColor: 'green', status: 'Volatile', category: 'Fibers' },
    { id: 5, commodity: 'Soybeans', market: 'Mato Grosso Hub, Brazil', price: 325.50, change: -2.1, volume: '22,100', grade: 'B GRADE', gradeColor: 'gray', status: 'Active', category: 'Oilseeds' },
    { id: 6, commodity: 'Durum Wheat', market: 'Kansas City Board', price: 280.00, change: 3.1, volume: '15,000', grade: 'A+ GRADE', gradeColor: 'green', status: 'Active', category: 'Cereals' },
];

export const myCropsList = [
    {
        id: 1,
        name: 'Hard Red Spring Wheat',
        plot: 'PLOT A-12',
        plotColor: 'green',
        stage: 'Booting',
        microbialHealth: 92,
        soilMoisture: 64,
        soilStatus: 'Optimal',
        bioFertilizer: 120,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=500&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Golden Dent Corn',
        plot: 'PLOT B-04',
        plotColor: 'yellow',
        stage: 'Tasseling',
        microbialHealth: 76,
        soilMoisture: 42,
        soilStatus: 'Dry Alert',
        bioFertilizer: 85,
        image: 'https://images.unsplash.com/photo-1599370126788-b4babe8c0c45?q=80&w=500&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Non-GMO Soybean',
        plot: 'PLOT C-01',
        plotColor: 'blue',
        stage: 'Podding',
        microbialHealth: 98,
        soilMoisture: 78,
        soilStatus: 'Optimal',
        bioFertilizer: 150,
        image: 'https://images.unsplash.com/photo-1628001614741-f7a63aa36e1c?q=80&w=500&auto=format&fit=crop'
    }
];

export const treatmentHistory = [
    { id: 1, date: 'Oct 15, 2024', plot: 'PLOT A-12', product: 'NitroFix Pro', focus: 'Nitrogen Fixing', dosage: '15 L/Acre', status: 'Completed' },
    { id: 2, date: 'Oct 18, 2024', plot: 'PLOT B-04', product: 'PhosBoost', focus: 'Phosphorus Solubilizing', dosage: '10 L/Acre', status: 'Completed' },
    { id: 3, date: 'Oct 22, 2024', plot: 'PLOT C-01', product: 'MycoVam Root', focus: 'Mycorrhizal Fungi', dosage: '20 L/Acre', status: 'Completed' },
];
