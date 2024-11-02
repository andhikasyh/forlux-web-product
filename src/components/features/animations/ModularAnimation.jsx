import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ModularAnimation() {
  const [activeModule, setActiveModule] = useState(null);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomModule = Math.floor(Math.random() * 9);
      setActiveModule(randomModule);
      setSwapping(true);
      
      setTimeout(() => {
        setSwapping(false);
      }, 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-900/50">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-0.5 opacity-10">
        {Array.from({ length: 96 }).map((_, i) => (
          <div
            key={i}
            className="border border-forlux-orange-primary/20"
          />
        ))}
      </div>

      {/* Module Grid */}
      <div className="relative grid grid-cols-3 gap-2 w-48 h-48">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className={`relative rounded-lg overflow-hidden ${
              i === activeModule ? 'z-10' : 'z-0'
            }`}
            animate={{
              scale: i === activeModule ? [1, 0.9, 1] : 1,
              opacity: i === activeModule ? 1 : 0.7
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Module Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-forlux-orange-primary/20 to-forlux-orange-secondary/20"
              animate={{
                opacity: i === activeModule ? [0.2, 0.4, 0.2] : 0.2
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Circuit Pattern */}
            <div className="absolute inset-0">
              {Array.from({ length: 3 }).map((_, j) => (
                <motion.div
                  key={`circuit-${j}`}
                  className="absolute h-0.5 bg-forlux-orange-primary/30"
                  style={{
                    width: '60%',
                    top: `${30 + j * 20}%`,
                    left: '20%'
                  }}
                  animate={{
                    scaleX: i === activeModule ? [0, 1, 0] : 0,
                    opacity: i === activeModule ? [0, 1, 0] : 0
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: j * 0.2
                  }}
                />
              ))}
            </div>

            {/* Module Frame */}
            <motion.div
              className="absolute inset-0 border border-forlux-orange-primary/30 rounded-lg"
              animate={{
                borderWidth: i === activeModule ? '2px' : '1px',
                borderColor: i === activeModule 
                  ? ['rgba(242, 199, 52, 0.3)', 'rgba(242, 199, 52, 0.6)', 'rgba(242, 199, 52, 0.3)']
                  : 'rgba(242, 199, 52, 0.3)'
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </div>

      {/* Hot-swap Animation */}
      {swapping && (
        <motion.div
          className="absolute w-14 h-14"
          initial={{ x: -100, opacity: 0, scale: 0.8 }}
          animate={{
            x: [100, 0, -100],
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-lg bg-gradient-to-r from-forlux-orange-primary to-forlux-orange-secondary opacity-30" />
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-forlux-orange-primary"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      )}

      {/* Status Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <motion.div
          className="flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/50 border border-forlux-orange-primary/30"
          animate={{
            borderColor: swapping 
              ? ['rgba(242, 199, 52, 0.3)', 'rgba(242, 199, 52, 0.6)', 'rgba(242, 199, 52, 0.3)']
              : 'rgba(242, 199, 52, 0.3)'
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-forlux-orange-primary"
            animate={{
              scale: swapping ? [1, 1.2, 1] : 1,
              opacity: swapping ? [0.5, 1, 0.5] : 0.5
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-gray-400">
            {swapping ? 'Module Swapping' : 'System Active'}
          </span>
        </motion.div>
      </div>
    </div>
  );
}