import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProcessorAnimation } from './product-animations/ProcessorAnimation';
import { TrafficLightAnimation } from './product-animations/TrafficLightAnimation';
import { CameraAnimation } from './product-animations/CameraAnimation';
import { DashboardAnimation } from './product-animations/DashboardAnimation';

const animations = {
  processor: ProcessorAnimation,
  trafficLight: TrafficLightAnimation,
  camera: CameraAnimation,
  dashboard: DashboardAnimation
};

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('features');
  const AnimationComponent = animations[product.animationType];

  return (
    <motion.div
      className="group relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${product.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur`}></div>
      <div className="relative glass-card p-6 h-full hover:bg-[#1a1f2d]/80 transition-colors duration-300">
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-4 right-4 px-2 py-1 text-xs font-medium bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent rounded-full border border-current`}>
            {product.badge}
          </span>
        )}
        
        {/* Header */}
        <div className="mb-6">
          <h3 className={`text-2xl font-bold bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
            {product.name}
          </h3>
          <p className="text-sm text-forlux-orange-primary/80 mt-1">{product.tagline}</p>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* Animation */}
        <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-slate-900/50">
          <AnimationComponent isHovered={isHovered} />
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 mb-4 border-b border-white/5">
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'features' 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('features')}
          >
            Features
            {activeTab === 'features' && (
              <motion.div 
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${product.gradient}`}
                layoutId={`tab-bottom-${product.id}`}
              />
            )}
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'specs' 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('specs')}
          >
            Specifications
            {activeTab === 'specs' && (
              <motion.div 
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${product.gradient}`}
                layoutId={`tab-bottom-${product.id}`}
              />
            )}
          </button>
        </div>
        
        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'features' ? (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              {product.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-3 rounded-lg bg-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-xl mb-2 block">{feature.icon}</span>
                  <h4 className="text-sm font-medium text-white mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 mb-6"
            >
              {product.specs.map((spec, index) => (
                <motion.div
                  key={index}
                  className="flex items-center text-sm text-gray-400"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.span 
                    className={`w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0 bg-gradient-to-r ${product.gradient}`}
                    animate={{
                      scale: isHovered ? [1, 1.5, 1] : 1
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: index * 0.2
                    }}
                  />
                  <span>{spec}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Action Button */}
        <a href={`/products/${product.id}`}>
          <motion.button
            className={`w-full py-3 px-4 rounded-lg text-sm font-medium text-white bg-gradient-to-r ${product.gradient} bg-opacity-10 border border-current hover:bg-opacity-20 transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More →
          </motion.button>
        </a>
      </div>
    </motion.div>
  );
}