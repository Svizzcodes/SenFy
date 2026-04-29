import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useAuth } from './AuthContext';
import {
  MONTHLY_DATA, EXPENSE_CATEGORIES, SENTIMENT_OVERVIEW,
  ASPECT_SENTIMENT, TOP_COMPLAINTS, SENTIMENT_BY_REGION,
  REVENUE_BY_REGION, REVENUE_BY_PRODUCT, CUSTOMER_SEGMENTS,
} from '@/data/mockData';

import { AMAZON_DATA, TESLA_DATA, STARBUCKS_DATA } from '@/data/companyData';

export interface MonthlyRow {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  sentiment: number;
  cashFlow: number;
}

interface DataContextType {
  monthlyData: MonthlyRow[];
  expenseCategories: typeof EXPENSE_CATEGORIES;
  sentimentOverview: typeof SENTIMENT_OVERVIEW;
  aspectSentiment: any[];
  topComplaints: typeof TOP_COMPLAINTS;
  sentimentByRegion: typeof SENTIMENT_BY_REGION;
  revenueByRegion: typeof REVENUE_BY_REGION;
  revenueByProduct: any[];
  customerSegments: typeof CUSTOMER_SEGMENTS;
  marketingIntelligence?: any;
  insights: any[];
  liveSignals?: { positive: any[], negative: any[] };
  regionalInsights?: any[];
  isUploaded: boolean;
  uploadFileName: string | null;
  uploadFinancialData: (file: File) => Promise<{ success: boolean; error?: string }>;
  uploadSentimentData: (file: File) => Promise<{ success: boolean; error?: string }>;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

function parseFile(file: File): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'csv' || ext === 'txt') {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (res) => resolve(res.data as Record<string, any>[]),
        error: (err: any) => reject(err),
      });
    } else if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = XLSX.read(e.target?.result, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        resolve(data as Record<string, any>[]);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('Unsupported file format. Use CSV, TXT, XLS, or XLSX.'));
    }
  });
}

export function DataProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const [monthlyData, setMonthlyData] = useState<MonthlyRow[]>(MONTHLY_DATA);
  const [expenseCategories, setExpenseCategories] = useState(EXPENSE_CATEGORIES);
  const [sentimentOverview, setSentimentOverview] = useState(SENTIMENT_OVERVIEW);
  const [aspectSentiment, setAspectSentiment] = useState<any[]>(ASPECT_SENTIMENT);
  const [topComplaints, setTopComplaints] = useState(TOP_COMPLAINTS);
  const [sentimentByRegion, setSentimentByRegion] = useState(SENTIMENT_BY_REGION);
  const [revenueByRegion, setRevenueByRegion] = useState(REVENUE_BY_REGION);
  const [revenueByProduct, setRevenueByProduct] = useState<any[]>(REVENUE_BY_PRODUCT);
  const [customerSegments, setCustomerSegments] = useState(CUSTOMER_SEGMENTS);
  const [marketingIntelligence, setMarketingIntelligence] = useState<any>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [liveSignals, setLiveSignals] = useState<any>(null);
  const [regionalInsights, setRegionalInsights] = useState<any[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);

  const getDemoData = useCallback((email: string) => {
    if (email === 'amazon@senfy.ai') return AMAZON_DATA;
    if (email === 'tesla@senfy.ai') return TESLA_DATA;
    if (email === 'starbucks@senfy.ai') return STARBUCKS_DATA;
    return null;
  }, []);

  const normalizeData = useCallback((demo: any) => {
    if (!demo) return;
    
    setMonthlyData(demo.monthly || MONTHLY_DATA);
    setSentimentOverview(demo.overview || SENTIMENT_OVERVIEW);
    setAspectSentiment((demo.aspects || ASPECT_SENTIMENT).map((a: any) => ({
      name: a.name || a.aspect || 'Other',
      score: a.score || a.positive || 0
    })));
    setMarketingIntelligence(demo.marketing || null);
    setInsights(demo.insights || []);
    setLiveSignals(demo.liveSignals || null);
    setRegionalInsights(demo.regionalInsights || []);
    
    if (demo.expenses) setExpenseCategories(demo.expenses);
    if (demo.complaints) setTopComplaints(demo.complaints);
    
    if (demo.marketing?.segments) {
      setCustomerSegments(demo.marketing.segments.map((s: any) => ({
        segment: s.name,
        count: Math.round(s.value * 10),
        revenue: Math.round(s.value * 100000),
        satisfaction: 70 + Math.random() * 20
      })));
    }
    
    if (demo.marketing?.regions) {
      setSentimentByRegion(demo.marketing.regions.map((r: any) => ({
        region: r.name,
        positive: r.sentiment - 10,
        neutral: 10,
        negative: 100 - r.sentiment
      })));
      
      setRevenueByRegion(demo.marketing.regions.map((r: any) => ({
        region: r.name,
        revenue: typeof r.potential === 'string' ? parseFloat(r.potential.replace(/[^0-9.]/g, '')) * (r.potential.includes('B') ? 1e9 : 1e6) : r.potential,
        growth: r.trend === 'up' ? 15 : 5,
        sentiment: r.sentiment
      })));
    }

    if (demo.revenueByProduct) {
      setRevenueByProduct(demo.revenueByProduct.map((p: any) => ({
        product: p.name,
        revenue: p.value,
        growth: 12
      })));
    }
    
    setIsUploaded(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/api/data', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const dataList = response.data;
          
          if (dataList && dataList.length > 0) {
            dataList.forEach((item: any) => {
              if (item.type === 'financial') {
                setMonthlyData(item.data);
                setIsUploaded(true);
              } else if (item.type === 'sentiment') {
                setSentimentOverview(item.data.overview || item.data);
                setIsUploaded(true);
              }
            });
          } else {
            const demo = getDemoData(user.email);
            if (demo) normalizeData(demo);
          }
        } catch (error) {
          const demo = getDemoData(user.email);
          if (demo) normalizeData(demo);
        }
      }
    };
    fetchData();
  }, [isAuthenticated, user, getDemoData, normalizeData]);

  const uploadFinancialData = useCallback(async (file: File) => {
    try {
      const rows = await parseFile(file);
      if (rows.length === 0) return { success: false, error: 'File is empty' };

      const mapped: MonthlyRow[] = rows.map((row: any) => ({
        month: String(row.month || row.Month || 'Unknown'),
        revenue: Number(row.revenue || row.Revenue || 0),
        expenses: Number(row.expenses || row.Expenses || 0),
        profit: Number(row.profit || row.Profit || 0),
        sentiment: Number(row.sentiment || row.Sentiment || 70),
        cashFlow: Number(row.cashFlow || row.CashFlow || 0),
      }));

      setMonthlyData(mapped);
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('http://localhost:5000/api/data/upload', {
          type: 'financial',
          data: mapped,
          fileName: file.name
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsUploaded(true);
      setUploadFileName(file.name);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to parse file' };
    }
  }, [isAuthenticated]);

  const uploadSentimentData = useCallback(async (file: File) => {
    try {
      const rows = await parseFile(file);
      if (rows.length === 0) return { success: false, error: 'File is empty' };

      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('http://localhost:5000/api/data/upload', {
          type: 'sentiment',
          data: rows,
          fileName: file.name
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsUploaded(true);
      setUploadFileName(file.name);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to parse file' };
    }
  }, [isAuthenticated]);

  const resetToDefaults = useCallback(() => {
    setMonthlyData(MONTHLY_DATA);
    setIsUploaded(false);
    setUploadFileName(null);
  }, []);

  return (
    <DataContext.Provider value={{
      monthlyData, expenseCategories, sentimentOverview, aspectSentiment,
      topComplaints, sentimentByRegion, revenueByRegion, revenueByProduct,
      customerSegments, marketingIntelligence, insights, 
      liveSignals, regionalInsights, isUploaded, uploadFileName,
      uploadFinancialData, uploadSentimentData, resetToDefaults,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be inside DataProvider');
  return ctx;
}
