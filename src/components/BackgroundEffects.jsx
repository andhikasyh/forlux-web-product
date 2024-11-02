import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      key="particles-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
}

function GradientOrbs() {
  return (
    <div key="gradient-orbs" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        key="blue-orb"
        className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"
        style={{
          animationDelay: '0s'
        }}
      />
      <div
        key="purple-orb"
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"
        style={{
          animationDelay: '2s'
        }}
      />
    </div>
  );
}

function GridPattern() {
  return (
    <div key="grid-pattern" className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </div>
  );
}

export default function BackgroundEffects() {
  return (
    <AnimatePresence mode="wait">
      <div key="background-container" className="background-effects">
        <Particles />
        <GradientOrbs />
        <GridPattern />
        <div 
          key="gradient-overlay"
          className="fixed inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none z-0" 
        />
      </div>
    </AnimatePresence>
  );
}