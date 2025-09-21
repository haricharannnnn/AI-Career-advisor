import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', hover = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`
        backdrop-blur-xl bg-black/20 border border-blue-400/20 
        rounded-2xl shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20
        transition-all duration-300
        ${hover ? 'hover:bg-black/30 hover:scale-105 cursor-pointer hover:border-blue-400/30' : ''}
        ${className}
      `}
      onClick={onClick}
      whileHover={hover ? { scale: 1.05, y: -5 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}