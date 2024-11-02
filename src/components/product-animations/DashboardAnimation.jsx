import { motion } from 'framer-motion';

export function DashboardAnimation({ isHovered }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-900/50 rounded-lg p-4">
      {/* Dashboard Grid */}
      <div className="grid grid-cols-2 gap-2 w-full h-full">
        {/* Charts and Widgets */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-slate-800/50 rounded-lg p-2"
            animate={{
              opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
              scale: isHovered ? [0.95, 1, 0.95] : 0.95
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          >
            {/* Chart Lines */}
            <div className="relative h-full">
              {Array.from({ length: 3 }).map((_, j) => (
                <motion.div
                  key={`line-${j}`}
                  className="absolute h-0.5 bg-forlux-green-primary/30"
                  style={{
                    width: '80%',
                    top: `${30 + j * 20}%`,
                    left: '10%'
                  }}
                  animate={{
                    scaleX: isHovered ? [0, 1, 0] : 0,
                    opacity: isHovered ? [0, 1, 0] : 0
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: j * 0.3
                  }}
                />
              ))}

              {/* Data Points */}
              {isHovered && Array.from({ length: 5 }).map((_, k) => (
                <motion.div
                  key={`point-${k}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-forlux-green-primary"
                  style={{
                    left: `${20 + k * 15}%`,
                    top: '50%'
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: k * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Data Indicators */}
      {isHovered && (
        <div className="absolute top-2 right-2 flex space-x-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`indicator-${i}`}
              className="w-1.5 h-1.5 rounded-full bg-forlux-green-primary"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}