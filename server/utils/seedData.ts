import { User } from '../models/User';
import { BusinessData } from '../models/BusinessData';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const DEMO_COMPANIES = [
  {
    name: 'Amazon',
    email: 'amazon@senfy.ai',
    industry: 'Technology/Retail',
    domain: 'amazon.com',
    financial: [
      { month: 'Jan', revenue: 120000000, expenses: 95000000, profit: 25000000, sentiment: 75, cashFlow: 20000000 },
      { month: 'Feb', revenue: 115000000, expenses: 92000000, profit: 23000000, sentiment: 78, cashFlow: 18000000 },
      { month: 'Mar', revenue: 125000000, expenses: 98000000, profit: 27000000, sentiment: 72, cashFlow: 22000000 },
      { month: 'Apr', revenue: 130000000, expenses: 101000000, profit: 29000000, sentiment: 80, cashFlow: 24000000 },
      { month: 'May', revenue: 128000000, expenses: 99000000, profit: 29000000, sentiment: 82, cashFlow: 23000000 },
      { month: 'Jun', revenue: 140000000, expenses: 105000000, profit: 35000000, sentiment: 85, cashFlow: 30000000 }
    ],
    sentiment: {
      overall: 78, positive: 65, neutral: 20, negative: 15,
      aspects: { quality: 85, pricing: 70, delivery: 92, support: 60 }
    },
    marketing: {
      demographics: [
        { category: 'Age', value: '18–45', insight: 'convenience-driven buyers' },
        { category: 'Gender', value: 'Balanced', insight: 'Core Prime membership demographic' },
        { category: 'Region', value: 'US, India, Europe', insight: 'Global dominance' }
      ],
      sentimentInsights: [
        { aspect: 'Delivery', sentiment: 'Positive' },
        { aspect: 'Product Quality', sentiment: 'Mixed' },
        { aspect: 'Pricing', sentiment: 'Negative spikes' }
      ],
      complaints: [
        { keyword: 'Late delivery', count: 320, trend: 'up' },
        { keyword: 'Fake products', count: 210, trend: 'up' },
        { keyword: 'Refund delays', count: 150, trend: 'stable' }
      ],
      competitors: [
        { name: 'Walmart', strength: 'Retail Presence', weakness: 'Online Experience', gap: 'Faster delivery' },
        { name: 'Flipkart', strength: 'Regional Focus', weakness: 'Global Logistics', gap: 'Pricing transparency' }
      ],
      trends: {
        description: 'AI-driven personalized retail and logistics regionalization.',
        imagery: [
          'https://images.unsplash.com/photo-1515169067865-5387ec356754',
          'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da'
        ]
      },
      opportunities: [
        'Improve delivery reliability', 'Strengthen seller verification', 'Expand same-day delivery',
        'Improve refund speed', 'Focus Tier-2 cities', 'Add pricing transparency',
        'Improve customer support', 'Personalize recommendations'
      ]
    }
  },
  {
    name: 'Tesla',
    email: 'tesla@senfy.ai',
    industry: 'Automotive/Tech',
    domain: 'tesla.com',
    financial: [
      { month: 'Jan', revenue: 80000000, expenses: 65000000, profit: 15000000, sentiment: 82, cashFlow: 10000000 },
      { month: 'Feb', revenue: 82000000, expenses: 67000000, profit: 15000000, sentiment: 80, cashFlow: 12000000 },
      { month: 'Mar', revenue: 75000000, expenses: 70000000, profit: 5000000, sentiment: 75, cashFlow: 2000000 },
      { month: 'Apr', revenue: 88000000, expenses: 68000000, profit: 20000000, sentiment: 85, cashFlow: 15000000 },
      { month: 'May', revenue: 92000000, expenses: 70000000, profit: 22000000, sentiment: 88, cashFlow: 18000000 },
      { month: 'Jun', revenue: 95000000, expenses: 72000000, profit: 23000000, sentiment: 82, cashFlow: 20000000 }
    ],
    sentiment: {
      overall: 82, positive: 70, neutral: 15, negative: 15,
      aspects: { quality: 75, pricing: 60, delivery: 85, support: 80 }
    },
    marketing: {
      demographics: [
        { category: 'Age', value: '25–45', insight: 'Tech early adopters' },
        { category: 'Gender', value: 'Male-heavy', insight: 'Performance enthusiasts' },
        { category: 'Region', value: 'US, Europe', insight: 'Expanding global infrastructure' }
      ],
      sentimentInsights: [
        { aspect: 'Performance', sentiment: 'Positive' },
        { aspect: 'Battery', sentiment: 'Mixed' },
        { aspect: 'Software bugs', sentiment: 'Negative' }
      ],
      complaints: [
        { keyword: 'Software bugs', count: 180, trend: 'up' },
        { keyword: 'Charging infra', count: 140, trend: 'up' }
      ],
      competitors: [
        { name: 'BMW EV', strength: 'Luxury Experience', weakness: 'Software Integration', gap: 'Supercharger network' },
        { name: 'BYD', strength: 'Affordability', weakness: 'Premium Status', gap: 'Advanced FSD' }
      ],
      trends: {
        description: 'Full Self-Driving neural networks and renewable energy ecosystems.',
        imagery: [
          'https://images.unsplash.com/photo-1511391409281-6927aee1d7c9',
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d'
        ]
      },
      opportunities: [
        'Improve software stability', 'Expand charging network', 'Reduce service delays',
        'Improve UI', 'Lower entry pricing', 'Focus Asian markets',
        'Improve customer support', 'Add subscription features'
      ]
    }
  },
  {
    name: 'Starbucks',
    email: 'starbucks@senfy.ai',
    industry: 'Food/Beverage',
    domain: 'starbucks.com',
    financial: [
      { month: 'Jan', revenue: 45000000, expenses: 38000000, profit: 7000000, sentiment: 85, cashFlow: 5000000 },
      { month: 'Feb', revenue: 44000000, expenses: 37500000, profit: 6500000, sentiment: 88, cashFlow: 4500000 },
      { month: 'Mar', revenue: 46000000, expenses: 38500000, profit: 7500000, sentiment: 82, cashFlow: 5500000 },
      { month: 'Apr', revenue: 48000000, expenses: 39000000, profit: 9000000, sentiment: 90, cashFlow: 7000000 },
      { month: 'May', revenue: 50000000, expenses: 40000000, profit: 10000000, sentiment: 92, cashFlow: 8000000 },
      { month: 'Jun', revenue: 52000000, expenses: 41000000, profit: 11000000, sentiment: 85, cashFlow: 9000000 }
    ],
    sentiment: {
      overall: 85, positive: 75, neutral: 15, negative: 10,
      aspects: { quality: 90, pricing: 65, delivery: 80, support: 88 }
    },
    marketing: {
      demographics: [
        { category: 'Age', value: '18–35', insight: 'Gen Z lifestyle focus' },
        { category: 'Gender', value: 'Slight female skew', insight: 'Experience-led consumers' },
        { category: 'Region', value: 'Global', insight: 'Urban dominance' }
      ],
      sentimentInsights: [
        { aspect: 'Taste', sentiment: 'Positive' },
        { aspect: 'Pricing', sentiment: 'Negative' },
        { aspect: 'Service', sentiment: 'Mixed' }
      ],
      complaints: [
        { keyword: 'Expensive', count: 250, trend: 'up' },
        { keyword: 'Slow service', count: 180, trend: 'up' }
      ],
      competitors: [
        { name: 'Dunkin', strength: 'Pricing', weakness: 'Experience Quality', gap: 'Premium Third Place' },
        { name: 'Costa', strength: 'Global Reach', weakness: 'App ecosystem', gap: 'Mobile ordering' }
      ],
      trends: {
        description: 'Cold beverage dominance and digital loyalty ecosystem modernization.',
        imagery: [
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
          'https://images.unsplash.com/photo-1461023058943-07fcbe16d735'
        ]
      },
      opportunities: [
        'Introduce affordable menu', 'Improve service speed', 'Expand mobile ordering',
        'Target Gen Z', 'Add local flavors', 'Improve loyalty program',
        'Reduce wait time', 'Improve store experience'
      ]
    }
  }
];

export const seedDemoData = async () => {
  try {
    console.log('🌱 Seeding Genuine Demo Data...');
    
    for (const comp of DEMO_COMPANIES) {
      let user = await User.findOne({ email: comp.email });
      if (!user) {
        const hashedPassword = await bcrypt.hash('senfy123', 12);
        user = new User({
          name: comp.name,
          email: comp.email,
          password: hashedPassword,
          role: 'company_admin',
          isVerified: true,
          domain: comp.domain,
          market: comp.industry
        });
        await user.save();
      }

      await BusinessData.deleteMany({ userId: user._id });

      await new BusinessData({
        userId: user._id, type: 'financial', data: comp.financial, fileName: 'demo_financial.csv'
      }).save();

      await new BusinessData({
        userId: user._id, type: 'sentiment', data: comp.sentiment, fileName: 'demo_sentiment.csv'
      }).save();

      await new BusinessData({
        userId: user._id, type: 'marketing', data: comp.marketing, fileName: 'demo_marketing.json'
      }).save();
    }

    console.log('✅ Genuine Demo Data Seeded Successfully');
  } catch (error) {
    console.error('❌ Seeding Error:', error);
  }
};
