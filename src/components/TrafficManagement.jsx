import { useRef, useEffect } from 'react';

const COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#60A5FA',
  danger: '#EF4444',
  success: '#10B981'
};

class Particle {
  constructor(canvas, lane, type = 'default') {
    this.canvas = canvas;
    this.x = -20;
    this.y = lane;
    this.type = type;
    this.speed = 0.5 + Math.random() * 1;
    this.targetSpeed = this.speed;
    this.size = 2 + Math.random() * 3;
    this.alpha = 0.1 + Math.random() * 0.4;
    this.color = COLORS.primary;
    this.trail = [];
    this.maxTrailLength = 10;
    this.waiting = false;
    this.acceleration = 0;
    this.maxSpeed = 2;
  }

  update(signals, particles) {
    // Trail effect
    this.trail.unshift({ x: this.x, y: this.y, alpha: this.alpha });
    if (this.trail.length > this.maxTrailLength) {
      this.trail.pop();
    }

    // Smooth acceleration/deceleration
    if (!this.waiting) {
      this.speed += (this.targetSpeed - this.speed) * 0.1;
    } else {
      this.speed *= 0.95;
    }

    // Update position with smooth movement
    this.x += this.speed;

    // Check for traffic signals and other particles
    this.waiting = false;
    signals.forEach(signal => {
      const distance = Math.hypot(this.x - signal.x, this.y - signal.y);
      if (distance < 30 && signal.state === 'red') {
        this.waiting = true;
      }
    });

    // Particle interaction
    particles.forEach(particle => {
      if (particle !== this) {
        const distance = Math.hypot(this.x - particle.x, this.y - particle.y);
        if (distance < 30 && this.x < particle.x) {
          this.speed = Math.min(particle.speed, this.speed);
          this.waiting = true;
        }
      }
    });

    return this.x < this.canvas.width + 20;
  }

  draw(ctx) {
    // Draw trail
    this.trail.forEach((point, index) => {
      const trailAlpha = (point.alpha * (this.trail.length - index)) / this.trail.length;
      ctx.beginPath();
      ctx.arc(point.x, point.y, this.size * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${trailAlpha * 0.3})`;
      ctx.fill();
    });

    // Draw particle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(59, 130, 246, ${this.alpha})`;
    ctx.fill();

    // Draw glow effect
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size * 3
    );
    gradient.addColorStop(0, `rgba(59, 130, 246, ${this.alpha * 0.5})`);
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

class TrafficSignal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = 'red';
    this.timer = Math.random() * 100;
    this.pulseSize = 5;
    this.maxPulseSize = 8;
  }

  update() {
    this.timer += 1;
    if (this.timer > 200) {
      this.timer = 0;
      this.state = this.state === 'red' ? 'green' : 'red';
    }

    // Pulse animation
    this.pulseSize = 5 + Math.sin(this.timer * 0.05) * 3;
  }

  draw(ctx) {
    // Draw glow
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.pulseSize * 2
    );
    gradient.addColorStop(0, `${this.state === 'red' ? '#ef444480' : '#10b98180'}`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.pulseSize * 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw signal
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = this.state === 'red' ? COLORS.danger : COLORS.success;
    ctx.fill();
  }
}

export default function TrafficManagement() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let signals = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize signals
    const gridSize = 150;
    for (let x = gridSize; x < canvas.width; x += gridSize) {
      for (let y = gridSize; y < canvas.height; y += gridSize) {
        signals.push(new TrafficSignal(x, y));
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw signals
      signals.forEach(signal => {
        signal.update();
        signal.draw(ctx);
      });

      // Update and draw particles
      particles = particles.filter(particle => particle.update(signals, particles));
      particles.forEach(particle => particle.draw(ctx));

      // Spawn new particles
      if (Math.random() < 0.05) {
        const lane = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        particles.push(new Particle(canvas, lane));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}