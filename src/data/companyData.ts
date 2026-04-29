export const AMAZON_DATA = {
  monthly: [
    { month: 'Jan', revenue: 125000000, expenses: 110000000, profit: 15000000, sentiment: 75, cashFlow: 12000000 },
    { month: 'Feb', revenue: 122000000, expenses: 108000000, profit: 14000000, sentiment: 72, cashFlow: 11000000 },
    { month: 'Mar', revenue: 130000000, expenses: 115000000, profit: 15000000, sentiment: 70, cashFlow: 13000000 },
    { month: 'Apr', revenue: 135000000, expenses: 118000000, profit: 17000000, sentiment: 78, cashFlow: 15000000 },
    { month: 'May', revenue: 142000000, expenses: 122000000, profit: 20000000, sentiment: 80, cashFlow: 18000000 },
    { month: 'Jun', revenue: 148000000, expenses: 128000000, profit: 20000000, sentiment: 79, cashFlow: 19000000 }
  ],
  revenueByProduct: [
    { name: 'E-commerce Retail', value: 75000000, color: 'hsl(185, 72%, 42%)' },
    { name: 'AWS (Cloud)', value: 45000000, color: 'hsl(38, 92%, 52%)' },
    { name: 'Advertising', value: 15000000, color: 'hsl(280, 60%, 55%)' },
    { name: 'Subscription Services', value: 10000000, color: 'hsl(160, 72%, 38%)' }
  ],
  overview: { overall: 78, positive: 62, neutral: 20, negative: 18 },
  aspects: [
    { name: "Delivery Speed", score: 92 },
    { name: "Product Variety", score: 88 },
    { name: "Seller Quality", score: 64 },
    { name: "Return Process", score: 68 }
  ],
  complaints: [
    { keyword: 'fake products', count: 542, trend: 'up' },
    { keyword: 'shipping delays', count: 312, trend: 'up' },
    { keyword: 'return hassle', count: 198, trend: 'stable' },
    { keyword: 'package damage', count: 156, trend: 'down' }
  ],
  liveSignals: {
    positive: [
      { text: "Delivery is fast and reliable in metro areas", agreement: 78, aspect: "Logistics" },
      { text: "Huge product variety makes it a one-stop shop", agreement: 72, aspect: "Inventory" },
      { text: "Easy returns process", agreement: 66, aspect: "Support" },
      { text: "Prime benefits are worth it", agreement: 61, aspect: "Value" },
      { text: "Good deals during sale events", agreement: 69, aspect: "Pricing" }
    ],
    negative: [
      { text: "Quality inconsistency from third-party sellers", agreement: 64, aspect: "Quality" },
      { text: "Refunds can be slow", agreement: 58, aspect: "Support" },
      { text: "Too many fake/duplicate listings", agreement: 62, aspect: "Trust" },
      { text: "Customer support not helpful for disputes", agreement: 51, aspect: "Support" },
      { text: "Prices fluctuate unpredictably", agreement: 47, aspect: "Pricing" }
    ]
  },
  regionalInsights: [
    { region: "India", status: "Strong", reason: "Value pricing + fast delivery network" },
    { region: "US", status: "Strong", reason: "Prime ecosystem + logistics scale" },
    { region: "Rural Areas", status: "Weak", reason: "Delivery delays + seller trust issues" }
  ],
  expenses: [
    { category: 'Logistics', amount: 82000000, color: 'hsl(185, 72%, 42%)' },
    { category: 'Marketing', amount: 15000000, color: 'hsl(38, 92%, 52%)' },
    { category: 'Infrastructure', amount: 25000000, color: 'hsl(280, 60%, 55%)' },
    { category: 'Salaries', amount: 32000000, color: 'hsl(160, 72%, 38%)' }
  ],
  insights: [
    { trigger: 'Delivery Sentiment Spike', sentimentFactor: '92% positive rating on Prime shipping', action: 'Expand 2-hour delivery to Tier-2 Indian cities', confidence: 94, severity: 'low' },
    { trigger: 'Seller Trust Decline', sentimentFactor: 'Seller fraud complaints up 14%', action: 'Implement multi-factor seller verification', confidence: 88, severity: 'high' },
    { trigger: 'Market Expansion Signal', sentimentFactor: 'India regional sentiment at 88%', action: 'Aggressive marketing spend in APAC regions', confidence: 82, severity: 'medium' }
  ],
  marketing: {
    demographics: [
      { category: "Age", value: "18-45", insight: "Prime shoppers in urban India & US." },
      { category: "Region", value: "US & India", insight: "India market growing at 24% YoY." },
      { category: "Platform", value: "Mobile App", insight: "88% of orders from Prime members." }
    ],
    regions: [
      { name: "North America", sentiment: 82, potential: "$8.5B", trend: "stable" },
      { name: "India", sentiment: 88, potential: "$4.2B", trend: "up" },
      { name: "Europe", sentiment: 74, potential: "$3.8B", trend: "stable" },
      { name: "Japan", sentiment: 79, potential: "$1.2B", trend: "up" }
    ],
    segments: [
      { name: "Prime Members", value: 65 },
      { name: "Casual Shoppers", value: 20 },
      { name: "Business (B2B)", value: 10 },
      { name: "Gift Card Users", value: 5 }
    ],
    trends: [
      { 
        trend: "Speed-led Campaigns", 
        description: "Highlighting same-day delivery as a lifestyle standard rather than just a feature.", 
        suggestion: "👉 Launch 'The 6-Hour Challenge' series on social media.",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Festival Mega-Sale Storytelling", 
        description: "Shifting from price focus to emotional impact of gifting during regional festivals like Diwali.", 
        suggestion: "👉 Partner with local creators for 'Unboxing Happiness' campaigns.",
        image: "https://images.unsplash.com/photo-15111391409281-6927aee1d7c9?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Trust & Authenticity Revamp", 
        description: "Aggressively showcasing anti-fake product technology to reclaim high-end sentiment.", 
        suggestion: "👉 Transparency series: 'How We Verify Every Seller'.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Influencer Unboxing Ecosystems", 
        description: "Moving beyond simple reviews to cinematic multi-product discovery journeys.", 
        suggestion: "👉 Scale Amazon Live cinematic productions for electronics.",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Subscription Value Narrative", 
        description: "Rebranding Prime as 'The Life Upgrade' rather than just a shipping service.", 
        suggestion: "👉 Bundle Prime Video/Music exclusives into daily utility ads.",
        image: "https://images.unsplash.com/photo-1512428559083-a40ea90132c5?auto=format&fit=crop&q=80&w=800"
      }
    ],
    recommendations: [
      { confidence: 94, region: "India", strategy: "Prime Day for Tier-3 cities", impact: "Expected 22% conversion lift" },
      { confidence: 88, region: "Global", strategy: "AI Virtual Try-On", impact: "Reduce returns by 15%" },
      { confidence: 82, region: "APAC", strategy: "Flipkart Competitive Pricing", impact: "Win 8% market share" },
      { confidence: 71, region: "NA", strategy: "Drone Delivery Pilot", impact: "Cut delivery time by 60%" },
      { confidence: 91, region: "Global", strategy: "Seller Verification Revamp", impact: "Boost trust score by 18pts" },
      { confidence: 85, region: "Europe", strategy: "Amazon Pharmacy Expansion", impact: "Capture health segment" },
      { confidence: 79, region: "Global", strategy: "AWS Startup Credits", impact: "LTV +12% in B2B" },
      { confidence: 84, region: "LATAM", strategy: "Last-Mile Logistics Optimization", impact: "Efficiency +20%" }
    ],
    competitors: [
      { name: "Walmart", strength: "Omnichannel", weakness: "Tech Agility", strategy: "Outpace via AI personalization" },
      { name: "Flipkart", strength: "India Market Share", weakness: "Infrastructure", strategy: "Focus on delivery speed superiority" },
      { name: "eBay", strength: "Niche Inventory", weakness: "Shipping UX", strategy: "Target high-frequency categories" }
    ],
    whatWorks: [
      { item: "Fast delivery (Prime)", impact: "Conversion +18%" },
      { item: "Frustration-free packaging", impact: "Sentiment +12pts" }
    ],
    whatDoesnt: [
      { item: "Third-party seller fraud", impact: "Trust -22%" },
      { item: "Complex return policies (Intl)", impact: "Churn +15%" }
    ],
    sentimentIntelligence: {
      overall: 78,
      aspects: [
        { name: "Delivery", score: 92 },
        { name: "Pricing", score: 71 },
        { name: "Support", score: 65 },
        { name: "Quality", score: 68 }
      ],
      history: [
        { month: 'Jan', score: 75 }, { month: 'Feb', score: 72 }, { month: 'Mar', score: 70 },
        { month: 'Apr', score: 78 }, { month: 'May', score: 80 }, { month: 'Jun', score: 79 }
      ]
    }
  }
};

export const TESLA_DATA = {
  monthly: [
    { month: 'Jan', revenue: 82000000, expenses: 64000000, profit: 18000000, sentiment: 82, cashFlow: 15000000 },
    { month: 'Feb', revenue: 85000000, expenses: 66000000, profit: 19000000, sentiment: 80, cashFlow: 16000000 },
    { month: 'Mar', revenue: 78000000, expenses: 72000000, profit: 6000000, sentiment: 75, cashFlow: 2000000 },
    { month: 'Apr', revenue: 90000000, expenses: 70000000, profit: 20000000, sentiment: 85, cashFlow: 18000000 },
    { month: 'May', revenue: 95000000, expenses: 72000000, profit: 23000000, sentiment: 88, cashFlow: 20000000 },
    { month: 'Jun', revenue: 98000000, expenses: 75000000, profit: 23000000, sentiment: 82, cashFlow: 21000000 }
  ],
  revenueByProduct: [
    { name: 'Vehicle Sales', value: 85000000, color: 'hsl(185, 72%, 42%)' },
    { name: 'Energy Generation & Storage', value: 12000000, color: 'hsl(38, 92%, 52%)' },
    { name: 'Services & Other', value: 5000000, color: 'hsl(280, 60%, 55%)' },
    { name: 'Software / FSD', value: 8000000, color: 'hsl(160, 72%, 38%)' }
  ],
  overview: { overall: 82, positive: 70, neutral: 15, negative: 15 },
  aspects: [
    { name: "Performance", score: 96 },
    { name: "Innovation", score: 94 },
    { name: "Software Bugs", score: 58 },
    { name: "Service Speed", score: 62 }
  ],
  complaints: [
    { keyword: 'autopilot phantom braking', count: 423, trend: 'up' },
    { keyword: 'service wait time', count: 387, trend: 'up' },
    { keyword: 'panel gaps', count: 212, trend: 'down' },
    { keyword: 'charging hub busy', count: 189, trend: 'stable' }
  ],
  liveSignals: {
    positive: [
      { text: "Acceleration and performance are unmatched", agreement: 81, aspect: "Engineering" },
      { text: "Build strength and safety ratings are impressive", agreement: 74, aspect: "Safety" },
      { text: "Tesla tunnel/infra concepts are innovative", agreement: 63, aspect: "Infrastructure" },
      { text: "Autopilot features are exciting", agreement: 67, aspect: "Software" },
      { text: "Minimalist design feels premium", agreement: 59, aspect: "Design" }
    ],
    negative: [
      { text: "Software bugs and updates break features", agreement: 71, aspect: "Software" },
      { text: "Service wait times are too long", agreement: 66, aspect: "Support" },
      { text: "Charging infrastructure gaps in some regions", agreement: 62, aspect: "Logistics" },
      { text: "Panel gaps/build consistency issues reported", agreement: 48, aspect: "Manufacturing" },
      { text: "High price vs competitors", agreement: 54, aspect: "Value" }
    ]
  },
  regionalInsights: [
    { region: "US", status: "Strong", reason: "Brand loyalty + supercharger density + early adoption" },
    { region: "Europe", status: "Moderate", reason: "Strict regulations + EV push boost adoption" },
    { region: "Developing Regions", status: "Weak", reason: "Charging infra gaps + high pricing barrier" }
  ],
  expenses: [
    { category: 'R&D', amount: 42000000, color: 'hsl(215, 80%, 60%)' },
    { category: 'Production', amount: 35000000, color: 'hsl(280, 60%, 55%)' },
    { category: 'Infrastructure', amount: 12000000, color: 'hsl(185, 72%, 42%)' },
    { category: 'Marketing', amount: 5000000, color: 'hsl(38, 92%, 52%)' }
  ],
  insights: [
    { trigger: 'Performance Dominance', sentimentFactor: '96% positive score on vehicle acceleration', action: 'Highlight Plaid performance in EU marketing', confidence: 98, severity: 'low' },
    { trigger: 'Software Reliability Risk', sentimentFactor: 'FSD bug reports up 22%', action: 'Deploy urgent v12.4 patch and clarify beta limitations', confidence: 91, severity: 'high' },
    { trigger: 'Charging Infrastructure Peak', sentimentFactor: 'Vegas Loop sentiment positive', action: 'Expand Supercharger hubs to lifestyle destinations', confidence: 85, severity: 'medium' }
  ],
  marketing: {
    demographics: [
      { category: "Age", value: "25-55", insight: "Early tech adopters & eco-conscious affluent." },
      { category: "Income", value: "$100k+", insight: "Strong correlation with high-disposable income." },
      { category: "Values", value: "Sustainability", insight: "72% cite environmental impact as a key driver." }
    ],
    regions: [
      { name: "North America", sentiment: 88, potential: "$12.4B", trend: "up" },
      { name: "China", sentiment: 81, potential: "$15.2B", trend: "up" },
      { name: "Europe", sentiment: 84, potential: "$9.8B", trend: "up" },
      { name: "Oceania", sentiment: 76, potential: "$2.1B", trend: "stable" }
    ],
    segments: [
      { name: "Tech Enthusiasts", value: 45 },
      { name: "Eco-Conscious", value: 30 },
      { name: "Status Seekers", value: 15 },
      { name: "Fleet/B2B", value: 10 }
    ],
    trends: [
      { 
        trend: "Engineering Stunts", 
        description: "Red Bull–style extreme durability and performance demos drive massive organic virality.", 
        suggestion: "👉 Showcase crash safety and battery endurance in public livestream events.",
        image: "https://images.unsplash.com/photo-1511391409281-6927aee1d7c9?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Founder-led Storytelling", 
        description: "Direct-to-consumer leadership narrative that fuels engagement and brand cultism.", 
        suggestion: "👉 Structured narrative releases for AI/Robotics breakthroughs.",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Real-world Infra Demos", 
        description: "Visualizing Tunnels and Supercharger networks as 'The Future Cities' blueprints.", 
        suggestion: "👉 Expand public demos of Cybervaults and Vegas Loop systems globally.",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Software Feature Showcases", 
        description: "Highlighting Over-the-Air (OTA) updates as a constant 'New Car' experience.", 
        suggestion: "👉 Controlled viral rollouts of FSD v12 to key influencers.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Owner Community UGC", 
        description: "Leveraging organic user-generated content from early adopters to build massive credibility.", 
        suggestion: "👉 Incentivize high-quality cinematic sharing of road-trip logs.",
        image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=800"
      }
    ],
    recommendations: [
      { confidence: 98, region: "Europe", strategy: "FSD v12 Launch Campaign", impact: "Capture premium tech segment" },
      { confidence: 91, region: "China", strategy: "Mobile Service Expansion", impact: "Reduce service wait sentiment" },
      { confidence: 85, region: "Global", strategy: "Model 2 Mass Market Pilot", impact: "3x unit volume projected" },
      { confidence: 79, region: "NA", strategy: "Vegas Loop PR Scale", impact: "Public infra sentiment boost" },
      { confidence: 95, region: "Global", strategy: "Software Stability Patch", impact: "Lift overall sentiment by 8pts" },
      { confidence: 88, region: "APAC", strategy: "Megapack B2B Sales", impact: "Revenue diversification" },
      { confidence: 82, region: "Global", strategy: "Robotic Charging Pilot", impact: "Next-gen tech branding" },
      { confidence: 76, region: "Global", strategy: "Referral Program v2", impact: "Organic growth +15%" }
    ],
    competitors: [
      { name: "BYD", strength: "Price/Volume", weakness: "Software UX", strategy: "Differentiate via AI/FSD features" },
      { name: "BMW EV", strength: "Build Quality", weakness: "Charging Network", strategy: "Highlight Supercharger ecosystem" },
      { name: "Mercedes EV", strength: "Luxury Interior", weakness: "Range Efficiency", strategy: "Focus on range/performance stats" }
    ],
    whatWorks: [
      { item: "Engineering Excellence PR", impact: "Sentiment +18pts" },
      { item: "Over-the-air updates", impact: "Retention +22%" }
    ],
    whatDoesnt: [
      { item: "Software bugs (autopilot)", impact: "Neg Sentiment +30%" },
      { item: "Service wait times", impact: "Churn +12%" }
    ],
    sentimentIntelligence: {
      overall: 82,
      aspects: [
        { name: "Tech", score: 94 },
        { name: "Range", score: 88 },
        { name: "Service", score: 62 },
        { name: "Software", score: 58 }
      ],
      history: [
        { month: 'Jan', score: 82 }, { month: 'Feb', score: 80 }, { month: 'Mar', score: 75 },
        { month: 'Apr', score: 85 }, { month: 'May', score: 88 }, { month: 'Jun', score: 82 }
      ]
    }
  }
};

export const STARBUCKS_DATA = {
  monthly: [
    { month: 'Jan', revenue: 45000000, expenses: 35000000, profit: 10000000, sentiment: 85, cashFlow: 8000000 },
    { month: 'Feb', revenue: 44000000, expenses: 34000000, profit: 10000000, sentiment: 88, cashFlow: 7500000 },
    { month: 'Mar', revenue: 46000000, expenses: 36000000, profit: 10000000, sentiment: 82, cashFlow: 8500000 },
    { month: 'Apr', revenue: 48000000, expenses: 37000000, profit: 11000000, sentiment: 90, cashFlow: 9000000 },
    { month: 'May', revenue: 52000000, expenses: 39000000, profit: 13000000, sentiment: 92, cashFlow: 11000000 },
    { month: 'Jun', revenue: 54000000, expenses: 40000000, profit: 14000000, sentiment: 86, cashFlow: 12000000 }
  ],
  revenueByProduct: [
    { name: 'Beverages (Coffee, Tea)', value: 35000000, color: 'hsl(185, 72%, 42%)' },
    { name: 'Food (Bakery, Snacks)', value: 12000000, color: 'hsl(38, 92%, 52%)' },
    { name: 'Merchandise', value: 5000000, color: 'hsl(280, 60%, 55%)' },
    { name: 'Ready-to-drink products', value: 3000000, color: 'hsl(160, 72%, 38%)' }
  ],
  overview: { overall: 85, positive: 75, neutral: 15, negative: 10 },
  aspects: [
    { name: "Taste Quality", score: 94 },
    { name: "Store Ambience", score: 91 },
    { name: "Pricing Value", score: 54 },
    { name: "Wait Times", score: 68 }
  ],
  complaints: [
    { keyword: 'high coffee price', count: 654, trend: 'up' },
    { keyword: 'long morning lines', count: 432, trend: 'up' },
    { keyword: 'mobile app glitch', count: 124, trend: 'down' },
    { keyword: 'plastic waste', count: 98, trend: 'stable' }
  ],
  liveSignals: {
    positive: [
      { text: "Consistent taste and quality", agreement: 76, aspect: "Product" },
      { text: "Great cafe ambience", agreement: 71, aspect: "Experience" },
      { text: "Strong brand experience", agreement: 68, aspect: "Brand" },
      { text: "Mobile ordering is convenient", agreement: 63, aspect: "Tech" },
      { text: "Seasonal drinks drive excitement", agreement: 65, aspect: "Marketing" }
    ],
    negative: [
      { text: "Too expensive for daily consumption", agreement: 73, aspect: "Pricing" },
      { text: "Long wait times during peak hours", agreement: 58, aspect: "Efficiency" },
      { text: "Inconsistent service across stores", agreement: 52, aspect: "Service" },
      { text: "Over-customization slows operations", agreement: 46, aspect: "Ops" },
      { text: "Limited localization in some markets", agreement: 41, aspect: "Strategy" }
    ]
  },
  regionalInsights: [
    { region: "US", status: "Strong", reason: "Lifestyle integration + morning ritual dominance" },
    { region: "Asia", status: "Strong", reason: "Aspirational brand appeal + status symbol positioning" },
    { region: "Price-Sensitive Markets", status: "Weak", reason: "Premium pricing limits daily frequency" }
  ],
  expenses: [
    { category: 'Inventory', amount: 18000000, color: 'hsl(160, 72%, 38%)' },
    { category: 'Rent/Lease', amount: 12000000, color: 'hsl(215, 80%, 60%)' },
    { category: 'Labor', amount: 15000000, color: 'hsl(280, 60%, 55%)' },
    { category: 'Marketing', amount: 5000000, color: 'hsl(38, 92%, 52%)' }
  ],
  insights: [
    { trigger: 'Digital Order Peak', sentimentFactor: '65% mobile adoption rate', action: 'Optimize mobile pickup lanes in urban centers', confidence: 96, severity: 'low' },
    { trigger: 'Pricing Resistance', sentimentFactor: 'Value score at 54% (Low)', action: 'Launch weekend bundles and star-dash loyalty events', confidence: 92, severity: 'high' },
    { trigger: 'Brand Loyalty Signal', sentimentFactor: '92% positive sentiment in May', action: 'Scale Nitro cold brew to all global locations', confidence: 88, severity: 'medium' }
  ],
  marketing: {
    demographics: [
      { category: "Age", value: "16-40", insight: "Millennials and Gen Z driving digital orders." },
      { category: "Lifestyle", value: "Urban/Mobile", insight: "65% of orders placed via mobile app." },
      { category: "Preference", value: "Customized", insight: "Average order has 3+ customizations." }
    ],
    regions: [
      { name: "North America", sentiment: 88, potential: "$5.8B", trend: "stable" },
      { name: "China", sentiment: 76, potential: "$3.2B", trend: "up" },
      { name: "Europe", sentiment: 82, potential: "$2.5B", trend: "stable" },
      { name: "Asia", sentiment: 85, potential: "$1.8B", trend: "up" }
    ],
    segments: [
      { name: "Daily Commuters", value: 55 },
      { name: "Students/Freelancers", value: 25 },
      { name: "Casual/Weekend", value: 15 },
      { name: "Corporate/Bulk", value: 5 }
    ],
    trends: [
      { 
        trend: "Lifestyle Storytelling", 
        description: "Aesthetic 'Third Place' content that drives higher retention than product-only shots.", 
        suggestion: "👉 Partner with lifestyle creators for Gen Z culture alignment.",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Seasonal Drop Hype", 
        description: "Creating 'Limited Edition' FOMO through seasonal drops (PSL-style) and merch.", 
        suggestion: "👉 Expand digital early-access for Rewards members.",
        image: "https://images.unsplash.com/photo-1570968015849-1455e173501c?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "UGC Café Aesthetics", 
        description: "Leveraging Instagram/TikTok-friendly interior designs for organic reach.", 
        suggestion: "👉 Design 'Social Zones' in urban flagship stores.",
        image: "https://images.unsplash.com/photo-1544787210-2211d64b56ee?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Regional Flavor Localization", 
        description: "Adapting core products to local tastes (e.g., Ube in APAC) while maintaining brand identity.", 
        suggestion: "👉 Scale Nitro cold brew with local botanical infusions.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800"
      },
      { 
        trend: "Mobile-First Ordering", 
        description: "Gamified ordering experiences that reduce perceived wait times and build stars.", 
        suggestion: "👉 Launch personalized weekend 'Star Dash' events.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
      }
    ],
    recommendations: [
      { confidence: 96, region: "China", strategy: "Reserve Store Expansion", impact: "Win high-end segment" },
      { confidence: 92, region: "Global", strategy: "Mobile Pickup Lane Optimization", impact: "Reduce friction by 30%" },
      { confidence: 88, region: "Global", strategy: "AI Drink Suggestions", impact: "Increase order value +15%" },
      { confidence: 82, region: "Europe", strategy: "Suburban Drive-Thru Buildout", impact: "Tap into suburban market" },
      { confidence: 94, region: "Global", strategy: "Bundle Pricing Launch", impact: "Mitigate price resistance" },
      { confidence: 90, region: "Global", strategy: "WiFi Speed Tiering", impact: "Retention +18%" },
      { confidence: 85, region: "Global", strategy: "Corporate Office Hubs", impact: "B2B revenue spike" },
      { confidence: 78, region: "Global", strategy: "Nitro Tap Standardization", impact: "Premium product lift" }
    ],
    competitors: [
      { name: "Dunkin", strength: "Price/Value", weakness: "Brand Image", strategy: "Focus on premium experience" },
      { name: "Costa", strength: "European Presence", weakness: "Digital UX", strategy: "Outpace via mobile app features" },
      { name: "Nespresso", strength: "Convenience", weakness: "Store Experience", strategy: "Highlight 'Third Place' community value" }
    ],
    whatWorks: [
      { item: "Starbucks Rewards Program", impact: "LTV +34%" },
      { item: "Customization options", impact: "Order Value +12%" }
    ],
    whatDoesnt: [
      { item: "Premium pricing", impact: "Negative Sentiment +40%" },
      { item: "Long peak-hour lines", impact: "Churn +15%" }
    ],
    sentimentIntelligence: {
      overall: 85,
      aspects: [
        { name: "Taste", score: 94 },
        { name: "Ambience", score: 91 },
        { name: "Price", score: 54 },
        { name: "Wait", score: 68 }
      ],
      history: [
        { month: 'Jan', score: 85 }, { month: 'Feb', score: 88 }, { month: 'Mar', score: 82 },
        { month: 'Apr', score: 90 }, { month: 'May', score: 92 }, { month: 'Jun', score: 86 }
      ]
    }
  }
};
