import { motion } from 'motion/react';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'blue' | 'red' | 'yellow' | 'green';

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/40',
  blue: 'bg-gradient-to-r from-[#4285F4] to-[#3367D6] hover:from-[#3367D6] hover:to-[#2563eb] text-white shadow-[#4285F4]/40',
  red: 'bg-gradient-to-r from-[#EA4335] to-[#D93025] hover:from-[#D93025] hover:to-[#b91c1c] text-white shadow-[#EA4335]/40',
  yellow: 'bg-gradient-to-r from-[#FBBC05] to-[#F9AB00] hover:from-[#F9AB00] hover:to-[#eab308] text-gray-900 shadow-[#FBBC05]/40',
  green: 'bg-gradient-to-r from-[#34A853] to-[#137333] hover:from-[#137333] hover:to-[#15803d] text-white shadow-[#34A853]/40',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function AnimatedButton({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  size = 'md'
}: AnimatedButtonProps) {
  return (
    <motion.button
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-2xl shadow-lg hover:shadow-xl
        transition-all duration-300 
        backdrop-blur-sm border border-blue-400/20 hover:border-blue-400/40
        relative overflow-hidden
        ${className}
      `}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-blue-400/20 rounded-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}