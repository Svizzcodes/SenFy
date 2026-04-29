import { DashboardLayout } from '@/components/DashboardLayout';
import { useData } from '@/contexts/DataContext';
import { TrendingUp, Sparkles, Activity, ThumbsUp, ThumbsDown, Target, MapPin, Users, Rocket, Globe, Zap, Heart, CheckCircle2, XCircle, ArrowUpRight, BarChart3, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MarketingIntelligence() {
  const { marketingIntelligence, liveSignals } = useData();

  if (!marketingIntelligence) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64 text-muted-foreground animate-pulse font-display">
          Initializing Intelligence Engine...
        </div>
      </DashboardLayout>
    );
  }

  const trends = marketingIntelligence?.trends || [];
  const recs = marketingIntelligence?.recommendations || [];
  const comps = marketingIntelligence?.competitors || [];
  const segments = marketingIntelligence?.segments || [];
  const demographics = marketingIntelligence?.demographics || [];
  const whatWorks = marketingIntelligence?.whatWorks || [];
  const whatDoesnt = marketingIntelligence?.whatDoesnt || [];

  return (
    <DashboardLayout>
      <div className="select-none pb-32 space-y-24 relative overflow-hidden">
        
        {/* --- DYNAMIC BACKGROUND ELEMENTS --- */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />

        {/* --- 1. HERO SECTION (BOLD & ASYMMETRIC) --- */}
        <div className="relative pt-12 flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Live Intelligence Layer</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
              MARKET <br />
              <span className="text-gradient-primary italic">SIGNALS</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl font-medium leading-relaxed">
              Decoding global consumption patterns for <span className="text-white underline decoration-primary/50 underline-offset-4">{marketingIntelligence?.companyName || 'the enterprise'}</span>. Our AI neural net has mapped 12,000+ sentiment vectors.
            </p>

            <div className="flex gap-8 pt-4">
               <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Global Coverage</p>
                  <p className="text-3xl font-black text-white">184 <span className="text-sm font-bold text-muted-foreground">NODES</span></p>
               </div>
               <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Signal Strength</p>
                  <p className="text-3xl font-black text-white">92.4 <span className="text-sm font-bold text-muted-foreground">%</span></p>
               </div>
            </div>
          </div>

          {/* Demographics Card (Glassmorphism Floating) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-96 glass-card p-8 border-white/10 shadow-2xl relative"
          >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full" />
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-8 border-b border-white/5 pb-4">Target Bio-Matrix</h3>
            <div className="space-y-6">
              {demographics.map((d: any, i: number) => (
                <div key={i} className="group cursor-default">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black text-muted-foreground uppercase group-hover:text-primary transition-colors">{d.category}</span>
                    <span className="text-sm font-black text-white">{d.value}</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5 group-hover:bg-primary/30 transition-all duration-500" />
                  <p className="mt-2 text-[10px] text-muted-foreground leading-tight italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">{d.insight}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- 2. TREND HORIZON (STAGGERED IMAGES) --- */}
        <div className="space-y-12">
          <div className="flex items-end justify-between px-2">
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Strategic <span className="text-primary">Horizon</span>
            </h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Visual Growth Vectors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {trends.map((trend: any, i: number) => {
              const gridConfig = [
                'md:col-span-8 md:row-span-2 h-[500px]', // Trend 1: Mega
                'md:col-span-4 h-64',                   // Trend 2: Slim
                'md:col-span-4 h-64',                   // Trend 3: Slim
                'md:col-span-6 h-80',                   // Trend 4: Medium
                'md:col-span-6 h-80',                   // Trend 5: Medium
              ];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`${gridConfig[i % gridConfig.length]} group relative rounded-[2rem] overflow-hidden border border-white/10 shadow-xl`}
                >
                  <img 
                    src={trend.image} 
                    alt={trend.trend} 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-xl flex items-center justify-center border border-primary/40 text-primary">
                          <Zap className="w-5 h-5" />
                       </div>
                       <div>
                         <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Trend Sector</p>
                         <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{trend.trend}</h3>
                       </div>
                    </div>
                    
                    <p className="text-sm text-white/70 font-medium leading-relaxed max-w-lg mb-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                      {trend.description}
                    </p>
                    
                    <div className="flex items-center gap-4 py-4 border-t border-white/10 translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100">
                       <Sparkles className="w-4 h-4 text-primary shrink-0" />
                       <span className="text-xs font-black text-white uppercase tracking-tight">{trend.suggestion}</span>
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <ArrowUpRight className="w-6 h-6 text-white" />
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- 3. MARKET PULSE (CIRCULAR & DYNAMIC) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Signal Intel */}
          <div className="glass-card p-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5">
                <Globe2 className="w-64 h-64 text-white" />
             </div>
             
             <div className="flex items-center gap-4 mb-12">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Signal Feed</h3>
             </div>

             <div className="space-y-12">
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-success uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
                    <ThumbsUp className="w-4 h-4" /> Catalysts
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {liveSignals?.positive?.slice(0, 4).map((s: any, i: number) => (
                      <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-success/5 border border-success/10 hover:bg-success/10 transition-all group">
                        <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 group-hover:scale-150 transition-transform" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-black text-success uppercase">{s.aspect}</span>
                            <span className="text-[10px] font-bold text-success/80">{s.agreement}%</span>
                          </div>
                          <p className="text-xs font-bold text-white/90 italic leading-snug">"{s.text}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-destructive uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
                    <ThumbsDown className="w-4 h-4" /> Friction
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {liveSignals?.negative?.slice(0, 4).map((s: any, i: number) => (
                      <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-destructive/5 border border-destructive/10 hover:bg-destructive/10 transition-all group">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 group-hover:scale-150 transition-transform" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-black text-destructive uppercase">{s.aspect}</span>
                            <span className="text-[10px] font-bold text-destructive/80">{s.agreement}%</span>
                          </div>
                          <p className="text-xs font-bold text-white/90 italic leading-snug">"{s.text}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </div>

          {/* Winning/Failing Strategy (REIMAGINED AS OVERLAPPING PANELS) */}
          <div className="space-y-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-success/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative glass-card p-10 border-success/20 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-success/10 rotate-12 rounded-[3rem]" />
                <div className="flex items-center gap-3 mb-8">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                  <h4 className="text-xl font-black uppercase tracking-tight">Growth Multipliers</h4>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {whatWorks.map((item: any, i: number) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-success/30 transition-all"
                    >
                      <p className="text-sm font-black text-white mb-1 uppercase tracking-tight">{item.item}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-success w-[80%]" />
                        </div>
                        <span className="text-[10px] font-black text-success uppercase">{item.impact}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-destructive/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative glass-card p-10 border-destructive/20 overflow-hidden">
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-destructive/10 -rotate-12 rounded-[3rem]" />
                <div className="flex items-center gap-3 mb-8">
                  <XCircle className="w-6 h-6 text-destructive" />
                  <h4 className="text-xl font-black uppercase tracking-tight">System Leakages</h4>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {whatDoesnt.map((item: any, i: number) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-destructive/30 transition-all"
                    >
                      <p className="text-sm font-black text-white mb-1 uppercase tracking-tight">{item.item}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-destructive w-[60%]" />
                        </div>
                        <span className="text-[10px] font-black text-destructive uppercase">{item.impact}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. COMPETITIVE RADAR & SEGMENTS (THE TERMINAL LOOK) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-12">
            <div className="flex items-center gap-4 px-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Competitor Intelligence</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comps.map((comp: any, i: number) => (
                <div key={comp.name} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
                  <div className="relative glass-card p-8 bg-black/40 backdrop-blur-3xl overflow-hidden">
                    <div className="flex justify-between items-start mb-8">
                       <h4 className="text-2xl font-black text-white tracking-tighter uppercase">{comp.name}</h4>
                       <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black tracking-widest border border-primary/20">
                          {comp.strategy?.split(' ')[0] || 'Active'}
                       </div>
                    </div>
                    
                    <div className="space-y-6">
                       <div className="relative pl-6 border-l-2 border-success/30">
                          <p className="text-[9px] font-black text-success uppercase tracking-widest mb-1">Differentiator</p>
                          <p className="text-sm font-bold text-white/90">{comp.strength}</p>
                       </div>
                       <div className="relative pl-6 border-l-2 border-destructive/30">
                          <p className="text-[9px] font-black text-destructive uppercase tracking-widest mb-1">Vulnerability</p>
                          <p className="text-sm font-bold text-white/90">{comp.weakness}</p>
                       </div>
                       <div className="pt-4 border-t border-white/5">
                          <p className="text-[10px] font-black text-muted-foreground uppercase mb-2">Counter-Strategy</p>
                          <p className="text-xs font-medium text-white/60 italic leading-relaxed">{comp.strategy}</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
             <div className="flex items-center gap-4 px-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Market Nodes</h3>
            </div>
            
            <div className="glass-card p-10 space-y-10">
               {segments.map((seg: any, i: number) => (
                 <div key={seg.name} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-black text-white uppercase tracking-tighter">{seg.name}</span>
                      <span className="text-2xl font-black text-primary">{seg.value}<span className="text-xs text-muted-foreground ml-1">%</span></span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: `${seg.value}%` }}
                         transition={{ duration: 1.5, ease: "circOut", delay: i * 0.1 }}
                         className="h-full bg-gradient-to-r from-primary/40 to-primary shadow-[0_0_20px_rgba(185,72,42,0.5)]" 
                       />
                    </div>
                 </div>
               ))}
            </div>

            {/* Micro-Recommendations */}
            <div className="space-y-4">
              {recs.slice(0, 3).map((rec: any, i: number) => (
                <div key={i} className="p-5 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/50 transition-all group">
                   <div className="flex items-center justify-between mb-2">
                      <Rocket className="w-4 h-4 text-primary group-hover:animate-bounce" />
                      <span className="text-[9px] font-black text-primary/70 uppercase tracking-widest">{rec.region}</span>
                   </div>
                   <p className="text-xs font-black text-white uppercase mb-1">{rec.strategy}</p>
                   <p className="text-[10px] text-muted-foreground leading-tight">{rec.impact}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
