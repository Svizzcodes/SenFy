import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const geminiModel = genAI ? genAI.getGenerativeModel({ model: "gemini-pro" }) : null;

// Initialize OpenAI
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export const analyzeWithAI = async (prompt: string, fallbackToOpenAI = true) => {
  if (!geminiModel && !openai) {
    throw new Error("No AI API keys configured");
  }

  try {
    if (geminiModel) {
      console.log("🤖 Using Gemini API...");
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    if (!fallbackToOpenAI || !openai) throw error;
  }

  if (openai) {
    try {
      console.log("🤖 Using OpenAI API...");
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4",
      });
      return completion.choices[0].message.content;
    } catch (error) {
      console.error("❌ OpenAI API Error:", error);
      throw error;
    }
  }

  throw new Error("AI analysis failed");
};

export const getCorrelationInsights = async (financialData: any, sentimentData: any) => {
  const prompt = `
    As a Senior Business Intelligence Expert, analyze the following data for Senfy AI.
    
    FINANCIAL DATA (Last 6 Months):
    ${JSON.stringify(financialData, null, 2)}
    
    SENTIMENT DATA (Last 6 Months):
    ${JSON.stringify(sentimentData, null, 2)}
    
    Identify correlations between financial performance (revenue/expenses) and customer sentiment.
    Provide a "What Happened" summary, a "Why It Happened" root cause analysis, and a Confidence Score (%).
    
    Format the response as a JSON object:
    {
      "summary": "...",
      "rootCause": "...",
      "correlations": [
        { "observation": "...", "impact": "...", "confidence": 85 }
      ],
      "recommendations": ["..."]
    }
  `;

  const result = await analyzeWithAI(prompt);
  try {
    return JSON.parse(result || '{}');
  } catch (e) {
    return { summary: result, raw: true };
  }
};

export const getMarketingInsights = async (businessInfo: any, marketTrends: any) => {
  const prompt = `
    As a Marketing Strategy Consultant for Senfy AI, analyze this business and current trends.
    
    BUSINESS INFO:
    ${JSON.stringify(businessInfo, null, 2)}
    
    REAL-WORLD MARKET TRENDS (from SerpAPI):
    ${JSON.stringify(marketTrends, null, 2)}
    
    Provide a comprehensive analysis including:
    1. Industry/Domain detection.
    2. 3-5 specific Marketing Strategies with confidence scores.
    3. Demographic breakdown:
       - Age groups (e.g., Gen Z, Millennials)
       - Gender distribution
       - Key geographic locations
       - Consumer behavior patterns
    4. Competitor Strategy Analysis:
       - 3 top competitors
       - Their strengths and weaknesses
       - Identified Market Gaps
    5. Visual Trends: Describe current campaign styles and visual preferences.
    6. 5 specific AI Growth Opportunities.
    
    Format the response strictly as a JSON object:
    {
      "industry": "...",
      "strategies": [{ "name": "...", "description": "...", "confidence": 95 }],
      "demographics": [{ "category": "Age", "value": "Gen Z (45%)", "insight": "..." }],
      "competitors": [{ "name": "...", "strengths": "...", "weaknesses": "...", "gap": "..." }],
      "opportunities": ["...", "..."],
      "visualTrendDesc": "..."
    }
  `;

  const result = await analyzeWithAI(prompt);
  try {
    return JSON.parse(result || '{}');
  } catch (e) {
    return { summary: result, raw: true };
  }
};
