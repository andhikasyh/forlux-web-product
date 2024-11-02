import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CommandAnimation() {
  const [positions, setPositions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [status, setStatus] = useState('optimal');

  useEffect(() => {
    const fixedPositions = [
      { x: 25, y: 25, type: 'traffic' },
      { x: 75, y: 25, type: 'camera' },
      { x: 25, y: 75, type: 'sensor' },
      { x: 75, y: 75, type: 'traffic' },
      { x: 50, y: 50, type: 'camera' }
    ];
    setPositions(fixedPositions);

    const alertInterval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'warning' : 'info',
        message: Math.random() > 0.5 
          ? 'High traffic detected at Junction A-7' 
          : 'Vehicle incident reported on Main Street',
        timestamp: new Date().toLocaleTimeString()
      };
      setAlerts(prev => [...prev.slice(-2), newAlert]);
      setStatus(Math.random() > 0.8 ? 'warning' : 'optimal');
    }, 5000);

    return () => clearInterval(alertInterval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-900/50 rounded-lg overflow-hidden p-4">
      {/* Simplified Status Bar */}
      <div className="glass-card p-2 mb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              className={`w-1.5 h-1.5 rounded-full ${
                status === 'optimal' ? 'bg-forlux-green-primary' : 'bg-forlux-orange-primary'
              }`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`text-xs ${
              status === 'optimal' ? 'text-forlux-green-primary' : 'text-forlux-orange-primary'
            }`}>
              System Status: {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          <span className="text-xs text-gray-400">Nodes: {positions.length}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-grow min-h-0">
        {/* Connection Lines */}
        <svg className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#25E0A1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#61D828" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {positions.map((pos, i) => 
            positions.slice(i + 1).map((nextPos, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={`${pos.x}%`}
                y1={`${pos.y}%`}
                x2={`${nextPos.x}%`}
                y2={`${nextPos.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: (i + j) * 0.2
                }}
              />
            ))
          )}
        </svg>

        {/* Monitoring Points */}
        {positions.map((pos, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                pos.type === 'traffic' 
                  ? 'from-forlux-orange-primary to-forlux-orange-secondary'
                  : pos.type === 'camera'
                  ? 'from-forlux-green-primary to-forlux-green-secondary'
                  : 'from-forlux-orange-secondary to-forlux-orange-accent'
              }`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
            
            <motion.div 
              className="absolute -inset-2 rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, ${
                  pos.type === 'traffic' 
                    ? '#F2C734' 
                    : pos.type === 'camera'
                    ? '#25E0A1'
                    : '#EF6D21'
                } 0%, transparent 70%)`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
            
            <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] text-gray-400">
                {pos.type.charAt(0).toUpperCase() + pos.type.slice(1)} {index + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alert Feed */}
      <div className="glass-card mt-4 flex-shrink-0">
        <div className="p-2 space-y-2">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              className="flex items-center justify-between p-2 rounded bg-slate-900/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  alert.type === 'warning' 
                    ? 'bg-forlux-orange-primary' 
                    : 'bg-forlux-green-primary'
                }`} />
                <span className="text-xs text-gray-400">{alert.message}</span>
              </div>
              <span className="text-[10px] text-gray-500">{alert.timestamp}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}