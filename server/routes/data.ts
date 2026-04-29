import express from 'express';
import { BusinessData } from '../models/BusinessData';
import { authMiddleware } from '../middleware/auth';
import { getCorrelationInsights } from '../utils/ai';

const router = express.Router();

// Upload Data
router.post('/upload', authMiddleware, async (req: any, res: any) => {
  try {
    const { type, data, fileName } = req.body;
    const userId = req.user.id;

    // Delete existing data of same type for this user to "override"
    await BusinessData.deleteMany({ userId, type });

    const businessData = new BusinessData({
      userId,
      type,
      data,
      fileName
    });

    await businessData.save();
    res.status(201).json({ message: 'Data uploaded and stored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
});

// Get Data
router.get('/', authMiddleware, async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const data = await BusinessData.find({ userId });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

// Get AI Insights
router.post('/insights', authMiddleware, async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const financial = await BusinessData.findOne({ userId, type: 'financial' });
    const sentiment = await BusinessData.findOne({ userId, type: 'sentiment' });

    if (!financial || !sentiment) {
      return res.status(400).json({ message: 'Financial and Sentiment data both required for insights' });
    }

    const insights = await getCorrelationInsights(financial.data, sentiment.data);
    res.status(200).json(insights);
  } catch (error) {
    res.status(500).json({ message: 'AI Analysis failed', error });
  }
});

export default router;
