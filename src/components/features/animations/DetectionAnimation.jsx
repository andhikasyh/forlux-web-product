import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DetectionAnimation() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDetecting(prev => !prev);
      if (!isDetecting) {
        // Generate random license plate
        const plates = ['B 1234 XYZ', 'D 5678 ABC', 'L 9012 DEF'];
        setLicensePlate(plates[Math.floor(Math.random() * plates.length)]);
        setConfidence(85 + Math.random() * 10);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isDetecting]);

  return (
    <div className="relative w-full h-full bg-slate-900/50 rounded-lg overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-0.5 opacity-20">
          {Array.from({ length: 96 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-forlux-green-primary/10"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.02
              }}
            />
          ))}
        </div>
      </div>

      {/* Scanning Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-forlux-green-primary/5 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Vehicle Detection Area - Moved higher up */}
      <motion.div
        className="absolute top-1/3 -translate-y-1/2"
        animate={{
          x: ['-20%', '120%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="relative">
          {/* Vehicle Shape */}
          <motion.div
            className={`w-20 h-12 rounded-lg ${
              isDetecting ? 'bg-forlux-orange-primary/30' : 'bg-forlux-green-primary/20'
            }`}
            animate={{
              scale: isDetecting ? [1, 1.05, 1] : 1
            }}
            transition={{ duration: 0.5 }}
          >
            {/* License Plate Area */}
            <motion.div
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/20 rounded"
              animate={{
                opacity: isDetecting ? [0.2, 1, 0.2] : 0.2
              }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          {/* Detection Box */}
          <AnimatePresence>
            {isDetecting && (
              <motion.div
                className="absolute -inset-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {/* Corner Brackets */}
                {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((position, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${position} w-3 h-3 border-2 border-forlux-orange-primary`}
                    style={{
                      borderRadius: '2px',
                      borderWidth: '2px 0 0 2px',
                      transform: `rotate(${index * 90}deg)`
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* License Plate Recognition - Adjusted position */}
          <AnimatePresence>
            {isDetecting && (
              <motion.div
                className="absolute -top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm rounded-lg border border-forlux-orange-primary/30 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="px-4 py-2 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-forlux-orange-primary">
                      License Plate Detected
                    </span>
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-forlux-orange-primary"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                  <div className="text-sm font-mono text-white">{licensePlate}</div>
                  <div className="flex items-center space-x-1">
                    <div className="h-1 flex-1 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-forlux-orange-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{confidence.toFixed(1)}%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Status Bar */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="glass-card p-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-2"
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-forlux-green-primary" />
              <span className="text-xs text-forlux-green-primary">ANPR ACTIVE</span>
            </motion.div>

            {isDetecting && (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="w-2 h-2 rounded-full bg-forlux-orange-primary animate-pulse" />
                <span className="text-xs text-forlux-orange-primary">PROCESSING</span>
              </motion.div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">System Status:</span>
            <span className="text-xs text-forlux-green-primary">Optimal</span>
          </div>
        </div>
      </div>
    </div>
  );
}