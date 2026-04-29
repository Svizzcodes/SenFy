import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus, Eye, EyeOff, Globe, Tag, Target } from 'lucide-react';
import Captcha from '@/components/Captcha';

const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Logistics', 'Marketing', 'Other'];
const SIZES = ['1-10', '11-50', '51-200', '201-500', '500+'];

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    companyName: '', 
    industry: '', 
    companySize: '', 
    domain: '',
    keywords: '',
    sentimentGoals: '',
    email: '', 
    password: '', 
    confirmPassword: '', 
    consent: false 
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaHash, setCaptchaHash] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  const set = (key: string, value: string | boolean) => setForm(p => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!form.companyName || !form.email || !form.password) {
      setError('Name and email are required'); return;
    }
    if (!form.domain) { setError('Company domain/website is required'); return; }
    if (!form.industry) { setError('Please select an industry'); return; }
    if (!captchaVerified) { setError('Please complete the security check'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (!form.consent) { setError('You must agree to the terms'); return; }

    setLoading(true);
    const result = await signup({ 
      name: form.companyName, 
      email: form.email, 
      password: form.password,
      industry: form.industry,
      companySize: form.companySize,
      domain: form.domain,
      keywords: form.keywords.split(',').map(k => k.trim()).filter(k => k),
      sentimentGoals: form.sentimentGoals,
      captcha: captchaCode,
      captchaHash: captchaHash
    });

    if (result.success) {
      navigate('/verify-otp', { state: { email: form.email } });
    } else {
      setError(result.error || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background/50">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl p-8 shadow-xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-gradient-primary mb-1">Senfy AI</h1>
          <h2 className="font-display text-xl font-semibold mb-1">Create your business account</h2>
          <p className="text-muted-foreground text-sm">Join the next generation of business intelligence</p>
        </div>

        {error && <div className="mb-6 p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary/80 uppercase tracking-wider">Basic Info</h3>
              <div>
                <label className="text-sm font-medium mb-1 block">Company Name</label>
                <input value={form.companyName} onChange={e => set('companyName', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="Acme Corp" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email Address</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="name@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Industry</label>
                  <select value={form.industry} onChange={e => set('industry', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select...</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Size</label>
                  <select value={form.companySize} onChange={e => set('companySize', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select...</option>
                    {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary/80 uppercase tracking-wider">Analysis Setup</h3>
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" /> Company Domain
                </label>
                <input value={form.domain} onChange={e => set('domain', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="https://acme.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5" /> Sentiment Keywords
                </label>
                <input value={form.keywords} onChange={e => set('keywords', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="e.g. customer service, pricing, speed" />
                <p className="text-[10px] text-muted-foreground mt-1">Comma-separated keywords for tracking</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" /> Analysis Goals
                </label>
                <textarea value={form.sentimentGoals} onChange={e => set('sentimentGoals', e.target.value)} className="w-full h-20 px-3 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none" placeholder="What are you hoping to discover through sentiment analysis?" />
              </div>
            </div>
          </div>

          <div className="separator my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary/80 uppercase tracking-wider">Security</h3>
              <div>
                <label className="text-sm font-medium mb-1 block">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} className="w-full h-10 px-3 pr-10 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Confirm Password</label>
                <input type="password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            <div className="pt-8">
              <Captcha onVerify={(v, h, c) => { setCaptchaVerified(v); setCaptchaHash(h); setCaptchaCode(c); }} />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <label className="flex items-start gap-2 text-sm cursor-pointer group">
              <input type="checkbox" checked={form.consent} onChange={e => set('consent', e.target.checked)} className="mt-1 accent-primary h-4 w-4 rounded border-border" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link></span>
            </label>
            
            <button type="submit" disabled={loading} className="w-full h-12 rounded-lg gradient-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50 active:scale-[0.98]">
              {loading ? <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <><UserPlus className="w-5 h-5" /> Create Company Account</>}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-bold">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}
