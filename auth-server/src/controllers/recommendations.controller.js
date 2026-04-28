export const generateRecommendations = (req, res) => {
    const { location, soilType, landSize } = req.body;

    const profitableCrops = getCropsBySoil(soilType);
    const optimizedRecommendations = [];

    if (soilType?.toLowerCase().includes('alluvial')) {
        optimizedRecommendations.push({
            iconType: "sun",
            title: "Switch to Premium Basmati",
            description: `With your ${landSize || '10'} acres in ${location || 'your region'}, Basmati yields max ROI in alluvial soil right now.`
        });
        optimizedRecommendations.push({
            iconType: "sprout",
            title: "Delay Sowing by 4 days",
            description: "Heavy rainfall predicted. Wait for optimal soil moisture balance to prevent seed rot."
        });
    } else {
        optimizedRecommendations.push({
            iconType: "sprout",
            title: "Plant BT Cotton variants",
            description: `Your ${soilType || 'current'} soil is great for cotton. Use BT variants to minimize pest risks this season.`
        });
        optimizedRecommendations.push({
            iconType: "sun",
            title: "Incorporate Legume Rotation",
            description: "Increase soil nitrogen levels naturally by planting a quick cover crop before main sowing."
        });
    }

    res.json({
        success: true,
        data: {
            profitableCrops,
            optimizedRecommendations
        }
    });
};

function getCropsBySoil(soilType) {
    if (soilType?.toLowerCase().includes('black')) {
        return [{ id: 1, name: 'Cotton', yield: 'High', color: 'bg-green-100 text-green-700' }];
    }
    return [
        { id: 1, name: 'Wheat', yield: 'High', color: 'bg-amber-100 text-amber-700' },
        { id: 2, name: 'Rice', yield: 'Medium', color: 'bg-blue-100 text-blue-700' }
    ];
}
