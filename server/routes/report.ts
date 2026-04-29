import express from 'express';
import { authMiddleware } from '../middleware/auth';
import puppeteer from 'puppeteer';

const router = express.Router();

router.post('/generate', authMiddleware, async (req: any, res: any) => {
  console.log("REPORT ROUTE HIT");
  try {
    const { companyName, monthlyData, sentimentOverview, insights, marketingInsights } = req.body;

    if (!companyName) {
       return res.status(400).json({ message: 'Company name is required' });
    }

    // Build Premium HTML Report
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica', sans-serif; color: #1e293b; line-height: 1.5; padding: 40px; }
          .header { border-bottom: 2px solid #14b8a6; padding-bottom: 20px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center; }
          .logo { font-size: 24px; font-weight: bold; color: #14b8a6; text-transform: uppercase; letter-spacing: 2px; }
          .company-name { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
          .section-title { font-size: 20px; font-weight: bold; color: #14b8a6; margin-top: 30px; margin-bottom: 15px; text-transform: uppercase; border-left: 4px solid #14b8a6; padding-left: 10px; }
          .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; }
          .card { background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
          .metric-label { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold; }
          .metric-value { font-size: 24px; font-weight: bold; color: #0f172a; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { text-align: left; background: #f1f5f9; padding: 12px; font-size: 12px; text-transform: uppercase; color: #64748b; }
          td { padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
          .footer { margin-top: 50px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          .badge { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase; }
          .badge-success { background: #dcfce7; color: #166534; }
          .badge-danger { background: #fee2e2; color: #991b1b; }
          .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 80px; color: rgba(20, 184, 166, 0.05); font-weight: bold; z-index: -1; pointer-events: none; }
        </style>
      </head>
      <body>
        <div class="watermark">SENFY AI</div>
        <div class="header">
          <div class="logo">SENFY AI</div>
          <div style="text-align: right">
            <div style="font-size: 12px; color: #64748b">Report ID: ${Math.random().toString(36).substring(7).toUpperCase()}</div>
            <div style="font-size: 12px; color: #64748b">Date: ${new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div class="company-name">${companyName}</div>
        <div style="font-size: 14px; color: #64748b; margin-bottom: 30px">Annual Intelligence & Strategic Analysis Report</div>

        <div class="section-title">Financial Performance Summary</div>
        <div class="grid">
          <div class="card">
            <div class="metric-label">Total Revenue (H1)</div>
            <div class="metric-value">$${monthlyData.reduce((acc: any, curr: any) => acc + curr.revenue, 0).toLocaleString()}</div>
          </div>
          <div class="card">
            <div class="metric-label">Net Profit Margin</div>
            <div class="metric-value">${((monthlyData.reduce((acc: any, curr: any) => acc + (curr.revenue - curr.expenses), 0) / (monthlyData.reduce((acc: any, curr: any) => acc + curr.revenue, 0) || 1)) * 100).toFixed(1)}%</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
              <th>Expenses</th>
              <th>Profit</th>
              <th>Sentiment</th>
            </tr>
          </thead>
          <tbody>
            ${monthlyData.map((row: any) => `
              <tr>
                <td>${row.month}</td>
                <td>$${row.revenue.toLocaleString()}</td>
                <td>$${row.expenses.toLocaleString()}</td>
                <td>$${(row.revenue - row.expenses).toLocaleString()}</td>
                <td>${row.sentiment}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="section-title">Sentiment & Market Perception</div>
        <div class="grid">
           <div class="card">
             <div class="metric-label">Overall Brand Score</div>
             <div class="metric-value">${sentimentOverview.overall}%</div>
           </div>
           <div class="card" style="display: flex; gap: 20px; align-items: center">
             <div><span class="badge badge-success">Pos: ${sentimentOverview.positive}%</span></div>
             <div><span class="badge" style="background: #f1f5f9; color: #475569">Neu: ${sentimentOverview.neutral}%</span></div>
             <div><span class="badge badge-danger">Neg: ${sentimentOverview.negative}%</span></div>
           </div>
        </div>

        ${marketingInsights ? `
          <div class="section-title">Strategic Marketing Intelligence</div>
          <div class="grid">
            <div class="card">
              <div class="metric-label">Target Demographics</div>
              ${Array.isArray(marketingInsights.demographics) ? marketingInsights.demographics.map((d: any) => `
                <div style="margin-top: 10px">
                  <div style="font-size: 12px; font-weight: bold">${d.category}: ${d.value}</div>
                  <div style="font-size: 11px; color: #64748b">${d.insight}</div>
                </div>
              `).join('') : `
                <div style="margin-top: 10px">
                  <div style="font-size: 12px; font-weight: bold">Age: ${marketingInsights.demographics.age}</div>
                  <div style="font-size: 12px; font-weight: bold">Gender: ${marketingInsights.demographics.gender}</div>
                  <div style="font-size: 11px; color: #64748b">Region: ${marketingInsights.demographics.region.join(', ')}</div>
                </div>
              `}
            </div>
            <div class="card">
              <div class="metric-label">Competitor Analysis</div>
              ${Array.isArray(marketingInsights.competitors) ? marketingInsights.competitors.map((c: any) => `
                <div style="margin-top: 10px">
                  <div style="font-size: 12px; font-weight: bold">${c.name}</div>
                  <div style="font-size: 11px; color: #64748b">Gap: ${c.gap}</div>
                </div>
              `).join('') : `
                <div style="margin-top: 10px">
                  <div style="font-size: 12px; font-weight: bold">${marketingInsights.competitors.join(', ')}</div>
                </div>
              `}
            </div>
          </div>
          
          <div style="margin-top: 20px">
            <div class="metric-label">Key Growth Opportunities</div>
            <ul style="font-size: 12px; color: #334155; margin-top: 10px">
              ${(marketingInsights.opportunities || marketingInsights.recommendations || []).map((o: string) => `<li>${o}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="section-title">AI Correlation Insights</div>
        ${insights.map((insight: any) => `
          <div class="card" style="margin-bottom: 15px">
            <div style="font-weight: bold; color: #0f172a">${insight.trigger}</div>
            <div style="font-size: 13px; color: #475569; margin: 5px 0">${insight.sentimentFactor}</div>
            <div style="font-size: 13px; font-weight: bold; color: #14b8a6">Recommendation: ${insight.action}</div>
          </div>
        `).join('')}

        <div class="footer">
          This document is generated by Senfy AI Business Intelligence Platform. 
          Confidential & Proprietary. &copy; ${new Date().getFullYear()} Senfy AI.
        </div>
      </body>
      </html>
    `;

    // Launch browser
    const browser = await puppeteer.launch({ 
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
    });

    await browser.close();

    // VALIDATE PDF
    if (!pdfBuffer || pdfBuffer.length < 1000 || !pdfBuffer.toString('binary').startsWith("%PDF")) {
      console.error("Invalid PDF generated");
      return res.status(500).send("PDF generation failed");
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=senfy-intelligence-report-${companyName.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      'Content-Length': pdfBuffer.length
    });

    return res.send(pdfBuffer);

  } catch (error: any) {
    console.error('BACKEND PDF ERROR:', error);
    res.status(500).json({ message: 'Internal server error during PDF generation', error: error.message });
  }
});

export default router;
