export async function getProduct(id) {
  const products = {
    integra: {
      id: 'integra',
      name: 'FORLUX Integra',
      tagline: 'Next-Gen Traffic Control',
      description: 'Revolutionary smart traffic control system powered by ARM Cortex M4 technology, delivering unmatched reliability and real-time control.',
      features: [
        {
          icon: '🔧',
          title: 'ARM Cortex M4',
          desc: 'Industrial-grade T7 series processor'
        },
        {
          icon: '🔄',
          title: 'Hot-Swappable Design',
          desc: 'Zero-downtime maintenance'
        },
        {
          icon: '📡',
          title: 'Fiber Network',
          desc: 'High-speed data transmission'
        },
        {
          icon: '⚡',
          title: 'Real-time Control',
          desc: 'Instant traffic optimization'
        }
      ],
      specs: [
        'Advanced thermal management system for 24/7 operation',
        'Redundant power supply with automatic failover',
        'Industrial-grade components rated for extreme conditions',
        'Remote diagnostics and predictive maintenance',
        'Multi-protocol support for legacy system integration',
        'End-to-end encryption for secure communications',
        'Real-time data processing with edge computing',
        'Scalable architecture for future expansion'
      ],
      animationType: 'processor',
      gradient: 'from-forlux-orange-primary to-forlux-orange-secondary',
      badge: 'Coming Soon'
    },
    luminox: {
      id: 'luminox',
      name: 'FORLUX Luminox',
      tagline: 'Intelligent Traffic Lights',
      description: 'Next-generation traffic light control system designed specifically for Indonesia\'s unique traffic patterns.',
      features: [
        {
          icon: '🎯',
          title: 'Adaptive Control',
          desc: 'Real-time traffic response'
        },
        {
          icon: '🚨',
          title: 'Emergency Priority',
          desc: 'Automatic route clearing'
        },
        {
          icon: '☔',
          title: 'Weather Adaptive',
          desc: 'Environmental optimization'
        },
        {
          icon: '💡',
          title: 'Smart LED',
          desc: 'Energy-efficient lighting'
        }
      ],
      specs: [
        'Multi-phase signal control with dynamic timing',
        'Fail-safe operation with backup systems',
        'Real-time energy consumption monitoring',
        'Predictive maintenance scheduling',
        'Weather condition adaptation',
        'Emergency vehicle priority system',
        'LED technology with 10-year lifespan',
        'Remote management capabilities'
      ],
      animationType: 'trafficLight',
      gradient: 'from-forlux-green-primary to-forlux-green-secondary',
      badge: 'Pre-order'
    },
    intellicam: {
      id: 'intellicam',
      name: 'FORLUX IntelliCam',
      tagline: 'AI-Powered Surveillance',
      description: 'Advanced AI-powered traffic cameras that transform raw footage into actionable insights.',
      features: [
        {
          icon: '🚗',
          title: 'Vehicle Detection',
          desc: 'Real-time recognition'
        },
        {
          icon: '🔍',
          title: 'Plate Recognition',
          desc: 'High-accuracy ANPR'
        },
        {
          icon: '📊',
          title: 'Flow Analysis',
          desc: 'Traffic pattern insights'
        },
        {
          icon: '⚠️',
          title: 'Incident Detection',
          desc: 'Automatic alerts'
        }
      ],
      specs: [
        '4K resolution with HDR imaging',
        'Night vision with thermal sensing',
        'Edge AI processing capabilities',
        'IP67 weather-resistant housing',
        'Built-in incident detection',
        'Automatic number plate recognition',
        'Traffic flow analysis',
        'Cloud integration ready'
      ],
      animationType: 'camera',
      gradient: 'from-forlux-orange-secondary to-forlux-orange-accent',
      badge: 'Featured'
    },
    samson: {
      id: 'samson',
      name: 'FORLUX-SAMSON',
      tagline: 'Command & Control',
      description: 'Comprehensive traffic monitoring system that unifies all FORLUX components into a single GIS-based command center.',
      features: [
        {
          icon: '🌍',
          title: 'GIS Integration',
          desc: 'Real-time mapping'
        },
        {
          icon: '📱',
          title: 'Multi-platform',
          desc: 'Access anywhere'
        },
        {
          icon: '🤖',
          title: 'AI Analytics',
          desc: 'Smart predictions'
        },
        {
          icon: '📊',
          title: 'Custom Reports',
          desc: 'Detailed insights'
        }
      ],
      specs: [
        'Cloud-native architecture for scalability',
        'Real-time data synchronization',
        'Multi-tenant support for different agencies',
        'Advanced encryption for data security',
        'Custom reporting and analytics',
        'Mobile app for remote access',
        'AI-powered decision support',
        'Integration with third-party systems'
      ],
      animationType: 'dashboard',
      gradient: 'from-forlux-green-secondary to-forlux-green-accent',
      badge: 'Enterprise'
    }
  };

  return products[id];
}