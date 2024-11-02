import { motion } from 'framer-motion';

export function CameraAnimation({ isHovered }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Camera Body */}
      <motion.div
        className="relative w-32 h-20 bg-slate-800 rounded-lg"
        animate={{
          rotateY: isHovered ? [0, 10, 0] : 0
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Lens */}
        <motion.div
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-700"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          <motion.div
            className="absolute inset-2 rounded-full bg-slate-600"
            animate={{
              scale: isHovered ? [0.8, 1, 0.8] : 0.8
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />
        </motion.div>

        {/* AI Detection Visualization */}
        {isHovered && (
          <>
            {/* Detection Grid */}
            <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-20 h-20">
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                  key={`grid-${i}`}
                  className="absolute w-1 h-1 bg-forlux-orange-primary/50"
                  style={{
                    left: `${(i % 4) * 8}px`,
                    top: `${Math.floor(i / 4) * 8}px`
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>

            {/* Scanning Effect */}
            <motion.div
              className="absolute inset-0 border-2 border-forlux-orange-primary/30 rounded-lg"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}