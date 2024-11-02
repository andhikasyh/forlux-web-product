import { motion } from 'framer-motion';

export function ProcessorAnimation({ isHovered }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Processor Grid */}
      <div className="grid grid-cols-4 gap-1 w-32 h-32">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-forlux-orange-primary/20 rounded-sm"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.2, 1, 0.2] : 0.2
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Circuit Paths */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`path-${i}`}
          className="absolute bg-forlux-orange-primary/30 h-0.5"
          style={{
            top: `${(i + 1) * 12}%`,
            left: '20%',
            width: '60%',
            transformOrigin: 'left'
          }}
          animate={{
            scaleX: isHovered ? [0, 1, 0] : 0,
            opacity: isHovered ? [0, 1, 0] : 0
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}

      {/* Data Pulses */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-forlux-orange-primary"
        animate={{
          scale: isHovered ? [0, 1, 0] : 0,
          opacity: isHovered ? [0, 1, 0] : 0,
          x: isHovered ? [-50, 0, 50] : 0
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
      />
    </div>
  );
}