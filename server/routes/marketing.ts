import express from 'express';
import axios from 'axios';
import { authMiddleware } from '../middleware/auth';
import { getMarketingInsights } from '../utils/ai';
import { BusinessData } from '../models/BusinessData';

const router = express.Router();

router.get('/analyze', authMiddleware, async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    
    // Check if we have pre-seeded or previously analyzed marketing data
    const existingMarketing = await BusinessData.findOne({ userId, type: 'marketing' });
    if (existingMarketing) {
      return res.status(200).json(existingMarketing.data);
    }

    const financial = await BusinessData.findOne({ userId, type: 'financial' });
    const businessInfo = financial?.data || { industry: 'General Business' };

    // Fetch Market Trends from SerpAPI as fallback
    let marketTrends = {};
    if (process.env.SERP_API_KEY) {
      try {
        const response = await axios.get('https://serpapi.com/search', {
          params: {
            q: `${businessInfo.industry || 'Business'} marketing trends 2024`,
            api_key: process.env.SERP_API_KEY,
            engine: 'google'
          }
        });
        marketTrends = response.data.organic_results?.slice(0, 5) || {};
      } catch (e) {
        console.error('SerpAPI Error:', e);
      }
    }

    const insights = await getMarketingInsights(businessInfo, marketTrends);
    
    // Save the analysis for future use
    await new BusinessData({
      userId,
      type: 'marketing',
      data: insights,
      fileName: 'ai_analysis.json'
    }).save();

    res.status(200).json(insights);
  } catch (error) {
    res.status(500).json({ message: 'Marketing analysis failed', error });
  }
});

export default router;
