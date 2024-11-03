import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { currentLanguage } from '../stores/languageStore'; // Ensure this path is correct
import { translations } from '../utils/translations';

const metrics = [
  {
    id: "traffic",
    value: "32%",
    trend: "+5%",
    color: "from-forlux-orange-primary to-forlux-orange-secondary"
  },
  {
    id: "response",
    value: "< 50ms",
    trend: "-15ms",
    color: "from-forlux-green-primary to-forlux-green-secondary"
  },
  {
    id: "detection",
    value: "98.5%",
    trend: "+2.3%",
    color: "from-forlux-orange-secondary to-forlux-orange-accent"
  },
  {
    id: "energy",
    value: "45%",
    trend: "+12%",
    color: "from-forlux-green-secondary to-forlux-green-accent"
  }
];

export default function Analytics() {
  const [lang, setLang] = useState(currentLanguage.get());
  
  useEffect(() => {
    const unsubscribe = currentLanguage.subscribe(newLang => {
      setLang(newLang);
    });

    return () => unsubscribe();
  }, []);
  
  const t = translations[lang].analytics;

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-forlux-orange-primary/10 to-transparent opacity-30 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 text-sm font-medium text-forlux-orange-primary bg-forlux-orange-primary/10 rounded-full border border-forlux-orange-primary/20 mb-4">
            {t.label}
          </span>
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-forlux-orange-gradient">
            {t.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Main Metrics */}
        <div className="glass-card p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`glass-card p-6 relative group`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-5 transition-all duration-300 rounded-lg`} />
                  
                  <div className="relative z-10">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                      {t.metrics[metric.id].title}
                    </h3>
                    <div className="flex items-baseline space-x-2 mb-1">
                      <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${metric.color}`}>
                        {metric.value}
                      </span>
                      <span className={`text-sm ${
                        metric.trend.startsWith('+') ? 'text-forlux-green-primary' : 'text-forlux-orange-primary'
                      }`}>
                        {metric.trend}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {t.metrics[metric.id].description}
                    </p>

                    <motion.div
                      className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${metric.color}`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated Graph */}
          <div className="mt-8">
            <AnimatedGraph />
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedGraph() {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);
  const vehiclesRef = useRef([]);
  const timelineRef = useRef(null);

  class Vehicle {
    constructor(road, isHorizontal, ctx) {
      this.isHorizontal = isHorizontal;
      this.size = isMobile ? 4 : 6;
      this.isEmergency = Math.random() < 0.05;
      this.speed = this.isEmergency ? 1.5 : 1; // Base speed multiplier
      this.color = this.isEmergency ? '#ef4444' : '#34D399';
      this.detected = false;
      this.waiting = false;
      this.currentRoad = road;
      this.nextIntersection = null;
      this.turningProbability = 0.3; // 30% chance to turn at intersections
      
      // Enhanced initial position logic
      if (isHorizontal) {
        this.x = Math.random() < 0.5 ? -this.size * 2 : road.x + road.width + this.size * 2;
        this.y = road.y + road.height / 2 + (Math.random() * 4 - 2);
        this.direction = this.x < 0 ? 1 : -1;
        this.endX = this.x < 0 ? road.x + road.width + this.size * 2 : -this.size * 2;
      } else {
        this.x = road.x + road.width / 2 + (Math.random() * 4 - 2);
        this.y = Math.random() < 0.5 ? -this.size * 2 : road.y + road.height + this.size * 2;
        this.direction = this.y < 0 ? 1 : -1;
        this.endY = this.y < 0 ? road.y + road.height + this.size * 2 : -this.size * 2;
      }

      // Initialize GSAP timeline with improved movement
      this.initializeTimeline();
    }

    initializeTimeline() {
      this.timeline = gsap.timeline({
        paused: true,
        onComplete: () => this.remove()
      });

      const baseDuration = this.isEmergency ? 8 : 12;
      const duration = baseDuration / this.speed;

      if (this.isHorizontal) {
        this.timeline.to(this, {
          x: this.endX,
          duration,
          ease: "none",
          onUpdate: () => this.checkIntersections(),
        });
      } else {
        this.timeline.to(this, {
          y: this.endY,
          duration,
          ease: "none",
          onUpdate: () => this.checkIntersections(),
        });
      }
    }

    // New method to check for nearby vehicles
    checkNearbyVehicles() {
      const minDistance = this.size * 3; // Minimum safe distance
      let shouldSlow = false;

      vehiclesRef.current.forEach(otherVehicle => {
        if (otherVehicle !== this) {
          const distance = Math.hypot(this.x - otherVehicle.x, this.y - otherVehicle.y);
          
          if (distance < minDistance) {
            // Check if vehicles are on the same road and moving in the same direction
            if ((this.isHorizontal === otherVehicle.isHorizontal) && 
                (this.direction === otherVehicle.direction)) {
              if ((this.isHorizontal && this.direction * (otherVehicle.x - this.x) > 0) ||
                  (!this.isHorizontal && this.direction * (otherVehicle.y - this.y) > 0)) {
                shouldSlow = true;
              }
            }
          }
        }
      });

      // Adjust speed based on proximity
      if (shouldSlow && !this.waiting) {
        this.timeline.timeScale(0.5);
      } else if (!this.waiting) {
        this.timeline.timeScale(1);
      }
    }

    // Enhanced intersection checking
    checkIntersections() {
      const intersections = this.findNearbyIntersections();
      
      if (intersections.length > 0) {
        intersections.forEach(intersection => {
          // Check if we should turn at this intersection
          if (!this.nextIntersection && Math.random() < this.turningProbability) {
            this.nextIntersection = intersection;
            this.prepareTurn(intersection);
          }
        });
      }

      this.checkNearbyVehicles();
    }

    findNearbyIntersections() {
      const intersections = [];
      roads.forEach(road => {
        if (road !== this.currentRoad) {
          // Check if roads intersect
          if (this.isHorizontal) {
            if (Math.abs(this.y - (road.y + road.height/2)) < road.height &&
                this.x >= road.x && this.x <= road.x + road.width) {
              intersections.push({
                x: road.x + road.width/2,
                y: this.y,
                road: road
              });
            }
          } else {
            if (Math.abs(this.x - (road.x + road.width/2)) < road.width &&
                this.y >= road.y && this.y <= road.y + road.height) {
              intersections.push({
                x: this.x,
                y: road.y + road.height/2,
                road: road
              });
            }
          }
        }
      });
      return intersections;
    }

    prepareTurn(intersection) {
      // Create a new timeline for turning
      const turnTimeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          this.isHorizontal = !this.isHorizontal;
          this.currentRoad = intersection.road;
          this.nextIntersection = null;
          this.initializeTimeline();
          this.timeline.play();
        }
      });

      // Calculate turning arc
      const radius = 15;
      const startAngle = this.isHorizontal ? 
        (this.direction > 0 ? 0 : Math.PI) : 
        (this.direction > 0 ? Math.PI/2 : -Math.PI/2);
      const endAngle = startAngle + (Math.random() < 0.5 ? Math.PI/2 : -Math.PI/2);

      // Animate along the arc
      turnTimeline.to(this, {
        duration: 1,
        ease: "none",
        onUpdate: () => {
          const progress = turnTimeline.progress();
          const angle = startAngle + (endAngle - startAngle) * progress;
          this.x = intersection.x + Math.cos(angle) * radius;
          this.y = intersection.y + Math.sin(angle) * radius;
        }
      });

      this.timeline = turnTimeline;
    }

    update(signals, cameras) {
      // Enhanced signal detection with realistic behavior
      let shouldStop = false;
      signals.forEach(signal => {
        const distance = Math.hypot(this.x - signal.x, this.y - signal.y);
        
        // Increased detection range for smoother stopping
        if (distance < 40) {
          if (signal.state === 'red' && !this.isEmergency) {
            const approachingSignal = 
              (this.isHorizontal && this.direction * (signal.x - this.x) > 0) ||
              (!this.isHorizontal && this.direction * (signal.y - this.y) > 0);

            if (approachingSignal) {
              shouldStop = true;
            }
          }
        }
      });

      // Gradual speed adjustment for realistic stopping
      if (shouldStop && !this.waiting) {
        gsap.to(this.timeline, {
          timeScale: 0,
          duration: 0.5,
          onComplete: () => {
            this.waiting = true;
            this.timeline.pause();
          }
        });
      } else if (!shouldStop && this.waiting) {
        this.waiting = false;
        gsap.to(this.timeline, {
          timeScale: 1,
          duration: 0.3,
          onStart: () => this.timeline.resume()
        });
      }

      // Enhanced emergency vehicle detection
      if (this.isEmergency) {
        cameras.forEach(camera => {
          const distance = Math.hypot(this.x - camera.x, this.y - camera.y);
          if (distance < camera.range && !this.detected) {
            this.detected = true;
            // Notify nearby vehicles to give way
            this.notifyNearbyVehicles();
          }
        });
      }
    }

    notifyNearbyVehicles() {
      const emergencyRadius = 50;
      vehiclesRef.current.forEach(vehicle => {
        if (vehicle !== this && !vehicle.isEmergency) {
          const distance = Math.hypot(this.x - vehicle.x, this.y - vehicle.y);
          if (distance < emergencyRadius) {
            // Move regular vehicles to the side
            const offset = this.isHorizontal ? { y: vehicle.y + 5 } : { x: vehicle.x + 5 };
            gsap.to(vehicle, {
              ...offset,
              duration: 0.5,
              ease: "power2.inOut"
            });
          }
        }
      });
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      
      // Rotate based on direction and road orientation
      if (this.isHorizontal) {
        ctx.rotate(this.direction > 0 ? 0 : Math.PI);
      } else {
        ctx.rotate(this.direction > 0 ? Math.PI/2 : -Math.PI/2);
      }

      // Emergency vehicle effects
      if (this.isEmergency) {
        // Flashing effect
        const flash = Math.sin(Date.now() / 100) > 0;
        ctx.shadowColor = flash ? '#ef4444' : '#0000';
        ctx.shadowBlur = 15;

        if (this.detected) {
          // Detection indicator
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Vehicle body with direction indicator
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.roundRect(-this.size, -this.size/2, this.size * 2, this.size, 2);
      ctx.fill();

      // Add direction indicator
      ctx.fillStyle = '#ffffff55';
      ctx.beginPath();
      ctx.moveTo(this.size/2, 0);
      ctx.lineTo(this.size, -this.size/3);
      ctx.lineTo(this.size, this.size/3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let signals = [];
    let cameras = [];
    let roads = [];
    let networkLines = [];

    // Setup canvas and roads
    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      setIsMobile(window.innerWidth < 768);
      initializeElements();
    };

    const initializeElements = () => {
      // Define roads based on canvas size
      roads = [
        { x: 50, y: 80, width: canvas.clientWidth - 100, height: 30 }, // Main horizontal
        { x: canvas.clientWidth / 3, y: 30, width: 30, height: 140 }, // Left vertical
        { x: (canvas.clientWidth * 2) / 3, y: 30, width: 30, height: 140 } // Right vertical
      ];

      // Initialize signals
      signals = [
        { 
          x: roads[0].x + roads[0].width / 2, 
          y: roads[0].y + roads[0].height / 2, 
          state: 'red', 
          timer: 0 
        },
        { 
          x: roads[0].x + roads[0].width / 2, 
          y: roads[0].y + roads[0].height / 2, 
          state: 'green', 
          timer: 0 
        }
      ];

      // Initialize cameras
      cameras = [
        { x: roads[0].x + roads[0].width / 4, y: 50, angle: 0, range: 60 },
        { x: roads[0].x + (roads[0].width / 2), y: roads[0].y + roads[0].height + 20, angle: Math.PI, range: 60 },
        { x: roads[0].x + (roads[0].width * 3) / 4, y: 50, angle: 0, range: 60 }
      ];

      // Initialize network lines
      networkLines = roads.map(road => ({
        points: [
          { x: road.x + road.width / 2, y: road.y + road.height / 2 },
          { x: road.x + road.width / 2 + 30, y: road.y + road.height / 2 - 30 }
        ],
        progress: 0
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    function drawRoads() {
      ctx.fillStyle = '#1a1f2d';
      roads.forEach(road => {
        ctx.fillRect(road.x, road.y, road.width, road.height);

        // Lane markings
        ctx.setLineDash([10, 10]);
        ctx.strokeStyle = '#ffffff33';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (road.width > road.height) {
          // Double lines for horizontal roads
          const y1 = road.y + road.height / 3;
          const y2 = road.y + (road.height * 2) / 3;
          ctx.moveTo(road.x, y1);
          ctx.lineTo(road.x + road.width, y1);
          ctx.moveTo(road.x, y2);
          ctx.lineTo(road.x + road.width, y2);
        } else {
          // Single line for vertical roads
          const x = road.x + road.width / 2;
          ctx.moveTo(x, road.y);
          ctx.lineTo(x, road.y + road.height);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }

    function drawSignals() {
      signals.forEach(signal => {
        ctx.beginPath();
        ctx.arc(signal.x, signal.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = signal.state === 'red' ? '#ef4444' : '#34D399';
        ctx.fill();
      });
    }

    function drawIncidentDetection() {
      cameras.forEach(camera => {
        // Camera vision cone
        const gradient = ctx.createRadialGradient(
          camera.x, camera.y, 0,
          camera.x, camera.y, camera.range
        );
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.1)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(camera.x, camera.y);
        ctx.arc(camera.x, camera.y, camera.range, camera.angle - Math.PI / 3, camera.angle + Math.PI / 3);
        ctx.closePath();
        ctx.fill();

        // Draw camera body
        ctx.fillStyle = '#ffffffaa';
        ctx.beginPath();
        ctx.arc(camera.x, camera.y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Draw camera lens
        ctx.fillStyle = '#000000bb';
        ctx.beginPath();
        ctx.arc(camera.x, camera.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Optionally, add a camera icon or more details
      });
    }

    function drawNetworkLines() {
      networkLines.forEach(line => {
        // Animate line progress
        line.progress += 0.005;
        if (line.progress > 1) line.progress = 0;

        ctx.strokeStyle = `rgba(52, 211, 153, ${line.progress})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        const startX = line.points[0].x;
        const startY = line.points[0].y;
        const endX = line.points[1].x;
        const endY = line.points[1].y;

        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Add moving dots
        ctx.fillStyle = `rgba(52, 211, 153, ${line.progress})`;
        ctx.beginPath();
        ctx.arc(
          startX + (endX - startX) * line.progress,
          startY + (endY - startY) * line.progress,
          3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
    }

    // Main animation timeline
    timelineRef.current = gsap.timeline({
      repeat: -1,
      onUpdate: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRoads();
        drawSignals();
        drawIncidentDetection();
        drawNetworkLines();
        vehiclesRef.current.forEach(vehicle => vehicle.draw(ctx));
      }
    });

    // Spawn vehicles
    gsap.to({}, {
      duration: isMobile ? 2 : 1,
      repeat: -1,
      onRepeat: () => {
        if (vehiclesRef.current.length < 15) {
          const road = roads[Math.floor(Math.random() * roads.length)];
          const vehicle = new Vehicle(road, road.width > road.height, ctx);
          vehiclesRef.current.push(vehicle);
          vehicle.start();
        }
      }
    });

    // Traffic signal control
    gsap.to(signals, {
      duration: 3,
      repeat: -1,
      onRepeat: () => {
        signals.forEach(signal => {
          signal.state = signal.state === 'red' ? 'green' : 'red';
        });
      }
    });

    // Camera rotation
    cameras.forEach(camera => {
      gsap.to(camera, {
        angle: Math.PI * 2,
        duration: 4,
        repeat: -1,
        ease: "none"
      });
    });

    return () => {
      window.removeEventListener('resize', resize);
      if (timelineRef.current) timelineRef.current.kill();
      gsap.killTweensOf(signals);
      gsap.killTweensOf(cameras);
      vehiclesRef.current.forEach(vehicle => vehicle.timeline.kill());
    };
  }, [isMobile]);

  // Handle Updates for Traffic Flow Optimization, Response Time, Incident Detection, Energy Efficiency
  useEffect(() => {
    const interval = setInterval(() => {
      vehiclesRef.current.forEach(vehicle => {
        vehicle.update(signals, cameras);
      });
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[200px] flex items-center justify-center overflow-hidden bg-transparent">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}