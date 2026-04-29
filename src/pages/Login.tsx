import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react';
import Captcha from '@/components/Captcha';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaHash, setCaptchaHash] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('All fields are required'); return; }
    if (!captchaVerified) { setError('Please complete the security check'); return; }
    
    setLoading(true);
    const result = await login(email, password, captchaCode, captchaHash);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Premium Brand Side */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary flex-col justify-between p-16 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Senfy AI</h1>
          </div>
          
          <div className="max-w-lg">
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Intelligence that <span className="text-white/70 italic">feels</span> like intuition.
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Experience the convergence of deep financial analytics and global sentiment intelligence in one unified platform.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <h4 className="text-3xl font-bold">99.9%</h4>
            <p className="text-sm text-white/60 uppercase tracking-widest font-semibold">Data Accuracy</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-3xl font-bold">2.4s</h4>
            <p className="text-sm text-white/60 uppercase tracking-widest font-semibold">Insight Velocity</p>
          </div>
        </div>
      </div>

      {/* Right panel - Auth Side */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12 flex items-center gap-2 justify-center">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <h1 className="font-display text-2xl font-bold text-gradient-primary">Senfy AI</h1>
          </div>

          <div className="mb-10">
            <h2 className="font-display text-3xl font-bold mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Please enter your credentials to continue</p>
          </div>

          {error && <div className="mb-6 p-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20 font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Work Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="admin@senfy.ai" 
                className="w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs text-primary hover:underline font-semibold">Forgot password?</Link>
              </div>
              <div className="relative">
                <input 
                  type={showPw ? 'text' : 'password'} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="py-2">
              <Captcha onVerify={(v, h, c) => { setCaptchaVerified(v); setCaptchaHash(h); setCaptchaCode(c); }} />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <><LogIn className="w-5 h-5" /> Sign In</>}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-10">
            New to the platform? <Link to="/signup" className="text-primary hover:underline font-bold">Create an account</Link>
          </p>

          <div className="mt-10 p-5 rounded-2xl bg-secondary/30 border border-border/50">
            <p className="font-bold text-xs uppercase tracking-widest text-primary/70 mb-3">Past Analysis</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { name: 'Amazon', email: 'amazon@senfy.ai' },
                { name: 'Tesla', email: 'tesla@senfy.ai' },
                { name: 'Starbucks', email: 'starbucks@senfy.ai' }
              ].map(comp => (
                <button 
                  key={comp.name}
                  onClick={() => { setEmail(comp.email); setPassword('senfy123'); }} 
                  className="flex items-center justify-between text-[11px] bg-background border border-border py-2 px-4 rounded-xl hover:border-primary transition-all group"
                >
                  <span className="font-bold text-foreground">{comp.name}</span>
                  <span className="text-muted-foreground group-hover:text-primary font-medium italic">Click to fill</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
