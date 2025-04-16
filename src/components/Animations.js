import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Animated counter component
export const AnimatedCounter = ({ value, duration = 2, prefix = '', suffix = '', className = '' }) => {
  const nodeRef = useRef(null);
  const [displayValue, setDisplayValue] = React.useState(0);
  
  useEffect(() => {
    let startValue = 0;
    const endValue = value;
    const totalFrames = Math.round(duration * 60);
    const counter = Math.ceil(endValue / totalFrames);
    
    let currentFrame = 0;
    
    const timer = setInterval(() => {
      currentFrame++;
      startValue += counter;
      
      if (startValue > endValue) {
        startValue = endValue;
        clearInterval(timer);
      }
      
      setDisplayValue(startValue);
      
      if (currentFrame === totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return (
    <span ref={nodeRef} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

// Fade in animation when element comes into view
export const FadeInView = ({ children, delay = 0, duration = 0.5, className = '', once = true }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration,
            delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
export const StaggeredContainer = ({ children, staggerDelay = 0.1, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered child item
export const StaggeredItem = ({ children, className = '' }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Parallax scroll effect
export const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const element = ref.current;
      
      // Apply parallax effect
      element.style.transform = `translateY(${scrollY * speed}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// Animated progress bar
export const AnimatedProgressBar = ({ value, maxValue = 100, color = 'blue', height = 8, className = '' }) => {
  const percentage = (value / maxValue) * 100;
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };
  
  const bgColorClass = colorClasses[color] || 'bg-blue-500';
  
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`} style={{ height: `${height}px` }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${bgColorClass}`}
      />
    </div>
  );
};

// Animated number with percentage
export const AnimatedPercentage = ({ value, duration = 2, className = '' }) => {
  return (
    <div className={`flex items-baseline ${className}`}>
      <AnimatedCounter value={value} duration={duration} suffix="%" className="text-3xl font-bold" />
    </div>
  );
};

// Hover card with scale effect
export const HoverCard = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated icon that rotates on hover
export const AnimatedIcon = ({ icon, className = '' }) => {
  return (
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {icon}
    </motion.div>
  );
};

// Pulse animation for notifications or highlights
export const PulseEffect = ({ children, className = '' }) => {
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{ 
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated tabs with sliding indicator
export const AnimatedTabs = ({ tabs, activeTab, setActiveTab, className = '' }) => {
  return (
    <div className={`relative flex border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          className={`py-4 px-6 font-medium relative ${
            activeTab === tab.id 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
              initial={false}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

// Animated page transitions
export const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scroll-triggered animation
export const ScrollTriggeredAnimation = ({ children, animation = 'fadeIn', className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    }
  };
  
  const selectedAnimation = animations[animation] || animations.fadeIn;
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={selectedAnimation}
      className={className}
    >
      {children}
    </motion.div>
  );
};
