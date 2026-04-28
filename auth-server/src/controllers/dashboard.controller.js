import { asyncHandler } from '../utils/error.js';
import User from '../models/User.js';

// Mock DB for crops and history to avoid full DB schema setup immediately, 
// eventually we can migrate this to MongoDB models if requested.
let userCropsDB = {};
let treatmentHistoryDB = {};

/**
 * Get aggregated dashboard data for the logged-in user
 * GET /api/dashboard
 */
export const getDashboardData = asyncHandler(async (req, res) => {
    // In a real app, this would come from req.user set by auth middleware
    // We'll simulate fetching for the user based on email passed or just give tailored mock data based on their profile
    
    // For now, let's use the fields we added to User model to generate dynamic data
    // Assuming we have the user email from query or token (we'll just use a generic implementation that takes an email query param for now)
    const email = req.query.email;
    const user = await User.findOne({ email });

    let baseLandSize = 100;
    let baseCrop = 'Mixed';

    if (user) {
        baseLandSize = user.landSize || 100;
        baseCrop = user.plantedCrop || 'Mixed';
    }

    // Dynamic metrics generation based on user profile
    const dashboardData = {
        metrics: {
            totalActiveAcres: baseLandSize,
            acresTrend: '+5.2%',
            avgSoilHealth: user ? 88 : 75,
            soilTrend: '+2.1%',
            bioFertilizerUsage: Math.floor(baseLandSize * 4.5), // Example dynamic calculation
            fertilizerTrend: '-3.4%'
        },
        treatmentHistory: [
            { id: 1, date: 'Oct 12, 2024', plot: `Plot A (${baseCrop})`, product: 'NitroBoost Max', focus: 'Nitrogen Fixation', dosage: '25L/Acre', status: 'Completed' },
            { id: 2, date: 'Oct 05, 2024', plot: `Plot B (${baseCrop})`, product: 'PhosphoSol', focus: 'Phosphorus Solubilization', dosage: '15L/Acre', status: 'In Progress' },
            { id: 3, date: 'Sep 28, 2024', plot: 'Plot C (Fallow)', product: 'MycoRoot Pro', focus: 'Root Expansion', dosage: '10kg/Acre', status: 'Completed' },
            { id: 4, date: 'Sep 20, 2024', plot: `Plot A (${baseCrop})`, product: 'AquaSave Gel', focus: 'Moisture Retention', dosage: '5kg/Acre', status: 'Pending' },
        ]
    };

    res.status(200).json({
        success: true,
        data: dashboardData
    });
});
