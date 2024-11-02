import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Card = ({ className, children, ...props }) => {
  return (
    <motion.div
      className={twMerge(
        "glass-card p-6 transition-all duration-300 hover:shadow-glow",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={twMerge("space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3 
      className={twMerge(
        "text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ className, children, ...props }) => {
  return (
    <p className={twMerge("text-gray-400", className)} {...props}>
      {children}
    </p>
  );
};

const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={twMerge("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ className, children, ...props }) => {
  return (
    <div className={twMerge("flex items-center p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };