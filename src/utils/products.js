const translations = {
  en: {
    features: "Features",
    keyFeatures: "Key Features",
    discoverCapabilities: (productName) => `Discover the powerful capabilities that make ${productName} a leading solution in traffic management`,
    specifications: "Specifications",
    technicalDetails: "Technical Details",
    ctaTitle: "Ready to Transform Your Traffic System?",
    ctaDescription: (productName) => `Contact our team to schedule a demo and learn how ${productName} can revolutionize your city's infrastructure.`,
    scheduleDemo: "Schedule Demo",
    learnMore: "Learn More",
  },
  id: {
    features: "Fitur",
    keyFeatures: "Fitur Utama",
    discoverCapabilities: (productName) => `Temukan kemampuan canggih yang menjadikan ${productName} solusi terdepan dalam manajemen lalu lintas`,
    specifications: "Spesifikasi",
    technicalDetails: "Detail Teknis",
    ctaTitle: "Siap Mengubah Sistem Lalu Lintas Anda?",
    ctaDescription: (productName) => `Hubungi tim kami untuk menjadwalkan demo dan pelajari bagaimana ${productName} dapat merevolusi infrastruktur kota Anda.`,
    scheduleDemo: "Jadwalkan Demo",
    learnMore: "Pelajari Lebih Lanjut",
  }
};

export const getProduct = async (id) => {
  const products = {
    en: {
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
        name: 'FORLUX LuminoX',
        tagline: 'High-Tech Traffic Control Solution',
        description: 'The first Indonesian-made traffic light with aluminum body and slim design, featuring advanced Fresnel Lens technology for optimal visibility.',
        badge: 'Made in Indonesia 🇮🇩',
        gradient: 'from-forlux-green-primary to-forlux-green-secondary',
        features: [
          {
            icon: '💡',
            title: 'LED Technology',
            desc: 'SMD LED with 50,000 hour lifespan'
          },
          {
            icon: '🛡️',
            title: 'Durability',
            desc: 'IP55 outdoor rating with aluminum extrusion'
          },
          {
            icon: '🔆',
            title: 'Brightness',
            desc: 'High luminance up to 835.6 cd'
          },
          {
            icon: '⚡',
            title: 'Power Efficient',
            desc: '24 VDC with 10W (±10%) per aspect'
          }
        ],
        specs: [
          'Model: FTL-S300-24-R/Y/G',
          '3 Aspect 30 cm Round Display',
          'Dimensions: 125 × 38 × 34 cm',
          'Aluminium Extrusion with ABS',
          'Powder Coating Finish',
          'Diameter: Ø 30 cm',
          'Polycarbonate Lens Material',
          'SMD LED Technology',
          '24 VDC Power Supply',
          'Power Consumption: 10W (±10%) per aspect',
          'Luminance: 835.6 cd (Red)',
          'Luminance: 562.6 cd (Yellow)',
          'Luminance: 756.3 cd (Green)',
          'Lifespan: 50,000 Hours',
          'Varistor Protection',
          'IP55 Outdoor Rating',
          '5 Years Warranty',
          'Made in INDONESIA 🇮🇩'
        ],
        animationType: 'traffic-light'
      },
      SmartView: {
        id: 'SmartView',
        name: 'FORLUX SmartView',
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
    },
    id: {
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
        name: 'FORLUX LuminoX',
        tagline: 'High-Tech Traffic Control Solution',
        description: 'The first Indonesian-made traffic light with aluminum body and slim design, featuring advanced Fresnel Lens technology for optimal visibility.',
        badge: 'Made in Indonesia 🇮🇩',
        gradient: 'from-forlux-green-primary to-forlux-green-secondary',
        features: [
          {
            icon: '💡',
            title: 'LED Technology',
            desc: 'SMD LED with 50,000 hour lifespan'
          },
          {
            icon: '🛡️',
            title: 'Durability',
            desc: 'IP55 outdoor rating with aluminum extrusion'
          },
          {
            icon: '🔆',
            title: 'Brightness',
            desc: 'High luminance up to 835.6 cd'
          },
          {
            icon: '⚡',
            title: 'Power Efficient',
            desc: '24 VDC with 10W (±10%) per aspect'
          }
        ],
        specs: [
          'Model: FTL-S300-24-R/Y/G',
          '3 Aspect 30 cm Round Display',
          'Dimensions: 125 × 38 × 34 cm',
          'Aluminium Extrusion with ABS',
          'Powder Coating Finish',
          'Diameter: Ø 30 cm',
          'Polycarbonate Lens Material',
          'SMD LED Technology',
          '24 VDC Power Supply',
          'Power Consumption: 10W (±10%) per aspect',
          'Luminance: 835.6 cd (Red)',
          'Luminance: 562.6 cd (Yellow)',
          'Luminance: 756.3 cd (Green)',
          'Lifespan: 50,000 Hours',
          'Varistor Protection',
          'IP55 Outdoor Rating',
          '5 Years Warranty',
          'Made in INDONESIA 🇮🇩'
        ],
        animationType: 'traffic-light'
      },
      SmartView: {
        id: 'SmartView',
        name: 'FORLUX SmartView',
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
    }
  };
  
  return {
    translations,
    products
  };
};