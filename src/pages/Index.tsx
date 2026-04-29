import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Shield, Globe, Zap, Heart, Sparkles, TrendingUp, Activity, Users } from 'lucide-react';

const LandingPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020308] text-white selection:bg-cyan-500/30 font-sans">
      {/* Enhanced Interactive Cosmic Background */}
      <CosmicBackground />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 lg:px-12 backdrop-blur-md border-b border-white/5 bg-black/20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all group-hover:rotate-12 group-hover:scale-110">
            <BarChart3 className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">SENFY AI</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-500/80 uppercase">Intelligence Evolved</span>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-8">
          <Link to="/login">
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 font-semibold">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-white text-black hover:bg-cyan-400 transition-colors font-bold px-8 shadow-[0_0_20px_rgba(255,255,255,0.2)]">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-32 text-center lg:pt-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative mb-8"
        >
          <div className="absolute -inset-8 bg-cyan-500/10 blur-[80px] rounded-full animate-pulse" />
          <div className="relative inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-6 py-2 text-xs font-bold text-cyan-400 backdrop-blur-3xl uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Live Production Upgrade Active
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl text-7xl font-[900] tracking-tight md:text-9xl lg:text-[11rem] leading-[0.85]"
        >
          MAKING DATA <br />
          <span className="relative">
            <span className="bg-gradient-to-b from-white via-cyan-300 to-blue-600 bg-clip-text text-transparent">FEEL ALIVE</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 max-w-2xl text-lg text-gray-400 md:text-2xl font-medium leading-relaxed"
        >
          Senfy AI doesn't just show graphs. It decodes the <span className="text-white underline decoration-cyan-500/50 underline-offset-8 font-bold">DNA of your business</span> by merging deep financials with human sentiment.
        </motion.p>

        {/* Dynamic Entry Stats - "Making themselves" */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
           <AnimatedStat label="Success Rate" value="99.4" suffix="%" delay={0.7} icon={<Zap className="w-4 h-4" />} />
           <AnimatedStat label="Data Points" value="1.2" suffix="M+" delay={0.9} icon={<Activity className="w-4 h-4" />} />
           <AnimatedStat label="User Growth" value="450" suffix="%" delay={1.1} icon={<TrendingUp className="w-4 h-4" />} />
           <AnimatedStat label="Global Reach" value="120" suffix="+" delay={1.3} icon={<Globe className="w-4 h-4" />} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20"
        >
          <Link to="/signup">
            <Button size="lg" className="group relative h-20 px-12 text-2xl font-black bg-white text-black hover:bg-cyan-400 transition-all hover:scale-105 rounded-2xl overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                LAUNCH THE ENGINE <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
            </Button>
          </Link>
        </motion.div>
      </main>

      <footer className="relative z-10 py-16 text-center">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8" />
        <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">© 2024 Senfy AI • Intelligence Division • Secure Production Environment</p>
      </footer>
    </div>
  );
};

const AnimatedStat = ({ label, value, suffix, delay, icon }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="p-6 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl group hover:border-cyan-500/30 transition-colors"
  >
    <div className="flex items-center gap-2 text-cyan-500 mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-3xl font-black tabular-nums">
      {value}{suffix}
    </div>
  </motion.div>
);

const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let comets: any[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.2;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          this.x -= dx / 100;
          this.y -= dy / 100;
        }
      }
      draw() {
        ctx!.fillStyle = 'rgba(100, 210, 255, 0.4)';
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    class Comet {
      x: number; y: number; length: number; speed: number; angle: number;
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.length = Math.random() * 100 + 50;
        this.speed = Math.random() * 10 + 5;
        this.angle = Math.PI / 4;
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.y > canvas.height || this.x > canvas.width) this.reset();
      }
      draw() {
        ctx!.beginPath();
        const grad = ctx!.createLinearGradient(this.x, this.y, this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.5;
        ctx!.moveTo(this.x, this.y);
        ctx!.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
        ctx!.stroke();
      }
    }

    const init = () => {
      particles = [];
      comets = [];
      for (let i = 0; i < 200; i++) particles.push(new Particle());
      for (let i = 0; i < 3; i++) comets.push(new Comet());
    };
    init();

    const animate = () => {
      ctx!.fillStyle = 'rgba(2, 3, 8, 0.15)'; // Trail effect
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      
      // Connections
      ctx!.strokeStyle = 'rgba(34, 211, 238, 0.05)';
      ctx!.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      particles.forEach(p => { p.update(); p.draw(); });
      comets.forEach(c => { c.update(); c.draw(); });
      
      requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0"
    />
  );
};

export default LandingPage;
