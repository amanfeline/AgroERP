import { asyncHandler } from '../utils/error.js';
import User from '../models/User.js';

// In-memory store for crops to simulate a database table
let cropsDB = [
    {
        id: 'crop_1',
        name: 'Wheat (Winter)',
        variety: 'HD-2967',
        area: 450,
        status: 'Healthy',
        sownDate: 'Nov 15, 2023',
        expectedHarvest: 'April 2024',
        soilHealth: 92,
        moisture: 45,
        nitrogen: 'Optimal',
        nextAction: 'Apply Nitrogen top dressing in 5 days'
    },
    {
        id: 'crop_2',
        name: 'Mustard',
        variety: 'Pusa Bold',
        area: 120,
        status: 'Needs Attention',
        sownDate: 'Oct 20, 2023',
        expectedHarvest: 'March 2024',
        soilHealth: 78,
        moisture: 22,
        nitrogen: 'Low',
        nextAction: 'Irrigate immediately. Low soil moisture.'
    }
];

export const getMyCrops = asyncHandler(async (req, res) => {
    // Dynamically adjust crop data based on user profile if needed
    const email = req.query.email;
    const user = await User.findOne({ email });

    let userCrops = [...cropsDB];
    
    // If the user specified a planted crop during registration, inject it dynamically if not present
    if (user && user.plantedCrop) {
        if (!userCrops.find(c => c.name.toLowerCase().includes(user.plantedCrop.toLowerCase()))) {
            userCrops[0].name = user.plantedCrop;
        }
    }

    res.status(200).json({
        success: true,
        count: userCrops.length,
        data: userCrops
    });
});
