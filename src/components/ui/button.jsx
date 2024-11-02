import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children,
  asChild = false,
  ...props 
}, ref) => {
  const Comp = asChild ? motion.div : motion.button;
  
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-electric-blue text-white hover:bg-neon-blue",
    outline: "border border-electric-blue/20 bg-transparent hover:border-electric-blue/40 hover:bg-electric-blue/10",
    ghost: "bg-transparent hover:bg-electric-blue/10",
    glow: "bg-electric-blue/10 border border-electric-blue/20 hover:bg-electric-blue/20 hover:border-electric-blue/40 shadow-glow hover:shadow-glow-lg transition-all duration-300"
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10"
  };

  return (
    <Comp
      ref={ref}
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button };