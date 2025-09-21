import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Home, Brain, Target, BookOpen, User } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';
import { Footer } from './Footer';
import exampleImage from 'figma:asset/70881a43a063ac45e062f0877d7213634398afee.png';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const pages = [
  { id: 'landing', name: 'Home', icon: Home },
  { id: 'skills', name: 'Skills', icon: Brain },
  { id: 'careers', name: 'Career Paths', icon: Target },
  { id: 'preparation', name: 'Preparation', icon: BookOpen },
  { id: 'profile', name: 'Profile', icon: User },
];

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const currentIndex = pages.findIndex(page => page.id === currentPage);
  
  const goToPrevPage = () => {
    if (currentIndex > 0) {
      onNavigate(pages[currentIndex - 1].id);
    }
  };
  
  const goToNextPage = () => {
    if (currentIndex < pages.length - 1) {
      onNavigate(pages[currentIndex + 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Blue Floral Element - Top Left */}
        <motion.div
          className="absolute -top-32 -left-32 w-80 h-80 opacity-30"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div 
            className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-20"
            style={{
              background: 'radial-gradient(circle at center, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
              clipPath: 'polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)',
              filter: 'blur(2px)'
            }}
          />
        </motion.div>

        {/* Medium Blue Floral Element - Top Right */}
        <motion.div
          className="absolute -top-24 -right-24 w-64 h-64 opacity-40"
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 0.8, 1.2]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at center, #60a5fa 0%, #3b82f6 40%, #1e40af 80%)',
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              filter: 'blur(1px)'
            }}
          />
        </motion.div>

        {/* Small Blue Floral Element - Bottom Left */}
        <motion.div
          className="absolute -bottom-16 -left-16 w-48 h-48 opacity-25"
          animate={{ 
            rotate: [0, -360],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: 'conic-gradient(from 0deg, #3b82f6, #60a5fa, #93c5fd, #3b82f6)',
              clipPath: 'polygon(50% 0%, 75% 25%, 100% 50%, 75% 75%, 50% 100%, 25% 75%, 0% 50%, 25% 25%)',
              filter: 'blur(3px)'
            }}
          />
        </motion.div>

        {/* Large Bottom Right Floral */}
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 opacity-20"
          animate={{ 
            rotate: [180, 540],
            scale: [1, 0.7, 1]
          }}
          transition={{ 
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #60a5fa 0%, #3b82f6 30%, #1e40af 60%, #1e3a8a 100%)',
              clipPath: 'polygon(50% 0%, 70% 15%, 85% 35%, 95% 55%, 85% 75%, 70% 90%, 50% 100%, 30% 90%, 15% 75%, 5% 55%, 15% 35%, 30% 15%)',
              filter: 'blur(2px)'
            }}
          />
        </motion.div>

        {/* Additional floating petals */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-24 h-24 opacity-15"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 rounded-full"
            style={{ filter: 'blur(4px)' }}
          />
        </motion.div>

        <motion.div
          className="absolute top-2/3 right-1/3 w-32 h-32 opacity-20"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -10, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-full h-full bg-gradient-to-tr from-blue-400 to-blue-600"
            style={{
              clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              filter: 'blur(3px)'
            }}
          />
        </motion.div>
      </div>

      {/* Navigation Header */}
      <motion.nav 
        className="relative z-10 backdrop-blur-xl bg-black/30 border-b border-blue-500/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl text-white font-medium">AI Career Advisor</h1>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {pages.map((page) => {
                const Icon = page.icon;
                return (
                  <motion.button
                    key={page.id}
                    onClick={() => onNavigate(page.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300
                      ${currentPage === page.id 
                        ? 'bg-blue-500/20 text-blue-300 backdrop-blur-sm border border-blue-400/30' 
                        : 'text-gray-300 hover:text-blue-300 hover:bg-blue-500/10'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{page.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Navigation Buttons */}
      <div className="fixed bottom-8 right-8 flex space-x-4 z-20">
        {currentIndex > 0 && (
          <motion.button
            onClick={goToPrevPage}
            className="w-14 h-14 bg-black/40 backdrop-blur-xl border border-blue-400/30 rounded-full flex items-center justify-center text-gray-300 hover:bg-black/60 hover:text-blue-300 transition-all duration-300 shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
        )}
        
        {currentIndex < pages.length - 1 && (
          <motion.button
            onClick={goToNextPage}
            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 backdrop-blur-xl border border-blue-400/30 rounded-full flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        )}
      </div>
    </div>
  );
}