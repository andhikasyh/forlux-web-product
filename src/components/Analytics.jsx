import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { currentLanguage } from '../stores/languageStore';
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

function AnimatedGraph() {
  const [points, setPoints] = useState([]);
  const height = 200;
  const width = 600;
  const totalPoints = 50;

  useEffect(() => {
    const generatePoints = () => {
      const newPoints = [];
      for (let i = 0; i < totalPoints; i++) {
        const y = Math.sin(i * 0.2) * 30 + Math.random() * 20 + height / 2;
        newPoints.push({ x: (width / totalPoints) * i, y });
      }
      return newPoints;
    };

    const interval = setInterval(() => {
      setPoints(generatePoints());
    }, 2000);

    setPoints(generatePoints());
    return () => clearInterval(interval);
  }, []);

  const pathData = points.length > 0
    ? `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

  return (
    <div className="w-full h-[300px] flex items-center justify-center overflow-hidden">
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid Lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.line
            key={`grid-${i}`}
            x1="0"
            y1={height * (i + 1) / 5}
            x2={width}
            y2={height * (i + 1) / 5}
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="4,4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}

        {/* Animated Path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F2C734" />
            <stop offset="100%" stopColor="#EF6D21" />
          </linearGradient>
        </defs>

        {/* Data Points */}
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            fill="#F2C734"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.01 }}
          />
        ))}
      </svg>
    </div>
  );
}

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
                <div className="glass-card p-6 relative group">
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