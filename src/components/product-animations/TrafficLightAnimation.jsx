import { motion } from 'framer-motion';

export function TrafficLightAnimation({ isHovered }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-24 h-40 bg-slate-800/50 rounded-lg p-2 flex flex-col justify-around">
        {/* Traffic Light Colors */}
        {['#EF4444', '#FCD34D', '#10B981'].map((color, index) => (
          <motion.div
            key={index}
            className="w-16 h-16 rounded-full mx-auto"
            style={{ backgroundColor: color }}
            animate={{
              opacity: isHovered ? [0.2, 1, 0.2] : 0.2,
              scale: isHovered ? [0.8, 1, 0.8] : 0.8
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.6,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Light Rays */}
        {isHovered && (
          <motion.div
            className="absolute left-full top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute h-1 bg-forlux-green-primary/30"
                style={{
                  width: `${(i + 1) * 20}px`,
                  top: `${i * 10}px`,
                  left: '10px',
                  transformOrigin: 'left'
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}