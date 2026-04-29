import { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface CaptchaProps {
  onVerify: (isValid: boolean, hash: string, code: string) => void;
}

export default function Captcha({ onVerify }: CaptchaProps) {
  const [code, setCode] = useState('');
  const [hash, setHash] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCaptcha = useCallback((text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background - Deep Black/Grey
    ctx.fillStyle = '#0a0a0a'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Noise Dots - Grayscale
    for (let i = 0; i < 60; i++) {
      const shade = Math.floor(Math.random() * 255);
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${Math.random() * 0.2})`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Interference Lines - Grayscale
    for (let i = 0; i < 8; i++) {
      const shade = Math.floor(Math.random() * 150 + 100); // Lighter grey
      ctx.strokeStyle = `rgba(${shade}, ${shade}, ${shade}, ${Math.random() * 0.3})`;
      ctx.lineWidth = Math.random() * 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Text - Pure White with Distortion
    const chars = text.split('');
    ctx.font = '900 36px "Space Grotesk", sans-serif';
    ctx.textBaseline = 'middle';
    
    chars.forEach((char, i) => {
      const x = 25 + i * 38;
      const y = canvas.height / 2 + (Math.random() * 14 - 7);
      const angle = (Math.random() * 40 - 20) * Math.PI / 180;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      // Layered text for thickness and "halo" effect
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowBlur = 12;
      
      const textShade = Math.floor(Math.random() * 55 + 200); // 200-255 (Bright)
      ctx.fillStyle = `rgba(${textShade}, ${textShade}, ${textShade}, ${0.8 + Math.random() * 0.2})`;
      ctx.fillText(char, 0, 0);
      
      // Thin black outline to separate from noise
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = 0.5;
      ctx.strokeText(char, 0, 0);
      
      ctx.restore();
    });

    // Final distortion lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height / 2 + Math.sin(x * 0.08) * 8;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }, []);

  const generateCode = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/captcha');
      if (!response.ok) throw new Error('API down');
      const data = await response.json();
      setCode(data.code);
      setHash(data.hash);
      setInput('');
      onVerify(false, '', '');
      drawCaptcha(data.code);
    } catch (err) {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let localCode = '';
      for (let i = 0; i < 6; i++) {
        localCode += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setCode(localCode);
      setHash('local-fallback-hash');
      setInput('');
      onVerify(false, '', '');
      drawCaptcha(localCode);
    }
  }, [drawCaptcha, onVerify]);

  // Initial load only
  useEffect(() => {
    generateCode();
  }, []); // Run once on mount

  // Redraw if code exists (handled by generateCode usually, but good for font loading)
  useEffect(() => {
    if (code) {
      const timeout = setTimeout(() => drawCaptcha(code), 100);
      return () => clearTimeout(timeout);
    }
  }, [code, drawCaptcha]);

  const handleChange = (val: string) => {
    const upperVal = val.toUpperCase();
    setInput(upperVal);
    if (upperVal === code) {
      onVerify(true, hash, upperVal);
      setError(false);
    } else {
      onVerify(false, '', '');
      if (upperVal.length >= 6) setError(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] block">Security Integrity Check</label>
        <p className="text-[11px] text-muted-foreground/60 italic">Verify identity to unlock access</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group rounded-xl overflow-hidden border border-white/5 shadow-2xl bg-black">
          <canvas 
            ref={canvasRef} 
            width={260} 
            height={85} 
            className="block cursor-not-allowed filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        </div>
        
        <button 
          type="button" 
          onClick={generateCode}
          className="p-3 bg-secondary/40 hover:bg-white/10 hover:text-white rounded-xl transition-all border border-white/5 hover:border-white/20 shadow-lg group"
          title="Regenerate Challenge"
        >
          <RefreshCw className="w-5 h-5 text-muted-foreground group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Enter characters"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full h-12 px-4 rounded-xl bg-secondary/20 border-2 text-base font-display font-bold placeholder:font-normal placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-white/5 transition-all ${
            error ? 'border-destructive/40 text-destructive' : 'border-white/5 focus:border-white/20'
          }`}
        />
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors ${input === code ? 'bg-white' : 'bg-white/10'}`} />
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-destructive font-bold uppercase tracking-wider"
        >
          Signature Verification Failed
        </motion.p>
      )}
    </div>
  );
}
