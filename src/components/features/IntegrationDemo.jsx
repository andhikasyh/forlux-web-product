import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function IntegrationDemo() {
  const [activeSystem, setActiveSystem] = useState('traffic');
  const [demoData, setDemoData] = useState({ nodes: 0, status: 'initializing' });

  const systems = {
    traffic: {
      title: "Traffic Control",
      description: "Real-time traffic light management and flow optimization",
      color: "from-forlux-orange-primary to-forlux-orange-secondary",
      gradient: "bg-gradient-to-r from-forlux-orange-primary to-forlux-orange-secondary",
      metrics: [
        { label: "Response Time", value: "< 50ms" },
        { label: "Accuracy", value: "99.9%" }
      ]
    },
    surveillance: {
      title: "Video Analytics",
      description: "AI-powered vehicle detection and incident monitoring",
      color: "from-forlux-green-primary to-forlux-green-secondary",
      gradient: "bg-gradient-to-r from-forlux-green-primary to-forlux-green-secondary",
      metrics: [
        { label: "Detection Rate", value: "98.5%" },
        { label: "False Positives", value: "< 0.1%" }
      ]
    },
    command: {
      title: "Command Center",
      description: "Centralized monitoring and control dashboard",
      color: "from-forlux-orange-secondary to-forlux-orange-accent",
      gradient: "bg-gradient-to-r from-forlux-orange-secondary to-forlux-orange-accent",
      metrics: [
        { label: "Uptime", value: "99.99%" },
        { label: "Data Points", value: "1M+" }
      ]
    }
  };

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setDemoData({ nodes: 12, status: 'operational' });
    }, 1000);

    const rotationTimer = setInterval(() => {
      setActiveSystem(current => {
        const systemKeys = Object.keys(systems);
        const currentIndex = systemKeys.indexOf(current);
        return systemKeys[(currentIndex + 1) % systemKeys.length];
      });
    }, 5000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(rotationTimer);
    };
  }, []);

  return (
    <section className="relative py-32">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 text-sm font-medium text-forlux-orange-primary bg-forlux-orange-primary/10 rounded-full border border-forlux-orange-primary/20 mb-4">
            System Integration
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-forlux-orange-gradient">
            Seamless Integration
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience how FORLUX components work together in perfect harmony
          </p>
        </motion.div>

        <div className="glass-card p-8">
          {/* System Status Bar */}
          <div className="flex items-center justify-between mb-8 px-4 py-2 bg-slate-900/50 rounded-lg border border-white/5">
            <motion.div 
              className="flex items-center space-x-2"
              animate={{
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${
                demoData.status === 'operational' ? 'bg-forlux-green-primary' : 'bg-forlux-orange-primary'
              }`} />
              <span className="text-sm text-gray-400">
                Status: <span className="text-white font-medium">{demoData.status}</span>
              </span>
            </motion.div>
            <span className="text-sm text-gray-400">
              Connected Nodes: <span className="text-white font-medium">{demoData.nodes}</span>
            </span>
          </div>

          {/* System Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(systems).map(([key, system]) => (
              <motion.button
                key={key}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all relative
                  ${activeSystem === key 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                  }`}
                onClick={() => setActiveSystem(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {system.title}
                {activeSystem === key && (
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${system.color} opacity-10 rounded-lg`}
                    layoutId="activeSystem"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Interactive Demo Area */}
          <div className="relative h-[400px] bg-slate-900/50 rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSystem}
                className="absolute inset-0 p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                {/* Background Effect */}
                <motion.div
                  className={`absolute inset-0 ${systems[activeSystem].gradient} opacity-5`}
                  animate={{ 
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-2 bg-clip-text text-transparent ${systems[activeSystem].gradient}`}>
                      {systems[activeSystem].title}
                    </h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      {systems[activeSystem].description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      {systems[activeSystem].metrics.map((metric, index) => (
                        <motion.div
                          key={metric.label}
                          className="glass-card p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                        >
                          <div className={`text-xl font-bold bg-clip-text text-transparent ${systems[activeSystem].gradient}`}>
                            {metric.value}
                          </div>
                          <div className="text-sm text-gray-400">{metric.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Activity Indicator */}
                  <div className="flex items-center justify-end space-x-2">
                    <motion.div
                      className={`w-1.5 h-1.5 rounded-full ${systems[activeSystem].gradient}`}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-gray-400">Live Data</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}