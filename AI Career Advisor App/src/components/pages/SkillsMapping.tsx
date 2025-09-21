import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Plus, X, Search, ChevronDown } from 'lucide-react';
import { AnimatedButton } from '../ui/AnimatedButton';
import { GlassCard } from '../ui/GlassCard';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';

const suggestedSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Data Analysis', 'Machine Learning',
  'Project Management', 'Leadership', 'Communication', 'Problem Solving',
  'SQL', 'Cloud Computing', 'Agile', 'UI/UX Design', 'Marketing'
];

const skillCategories = [
  { name: 'Technical Skills', color: 'from-blue-500 to-blue-600' },
  { name: 'Soft Skills', color: 'from-green-500 to-green-600' },
  { name: 'Industry Knowledge', color: 'from-red-500 to-red-600' },
  { name: 'Tools & Platforms', color: 'from-yellow-500 to-yellow-600' }
];

interface SkillsMappingProps {
  onNavigate: (page: string) => void;
}

export function SkillsMapping({ onNavigate }: SkillsMappingProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const filteredSuggestions = suggestedSkills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSkills.includes(skill)
  );

  const getSkillColor = (index: number) => {
    const colors = ['blue', 'green', 'red', 'yellow'];
    return colors[index % colors.length] as 'blue' | 'green' | 'red' | 'yellow';
  };

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            Map Your Skills
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us about your skills and experience to get personalized career recommendations
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-300">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-300">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between mt-4 text-sm text-gray-400">
              <span className={currentStep >= 1 ? 'text-blue-400 font-medium' : ''}>Skills Input</span>
              <span className={currentStep >= 2 ? 'text-blue-400 font-medium' : ''}>Experience Level</span>
              <span className={currentStep >= 3 ? 'text-blue-400 font-medium' : ''}>Preferences</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Step 1: Skills Input */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8 mb-8">
              <h2 className="text-2xl mb-6 text-white">What are your key skills?</h2>
              
              {/* Search Input */}
              <div className="relative mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search or add a skill..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="pl-10 pr-4 py-3 rounded-2xl border-blue-400/30 bg-black/20 backdrop-blur-sm text-white placeholder:text-gray-400"
                  />
                  <button 
                    onClick={() => searchTerm && addSkill(searchTerm)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && (searchTerm || filteredSuggestions.length > 0) && (
                    <motion.div
                      className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl rounded-2xl border border-blue-400/30 shadow-xl z-10 max-h-60 overflow-y-auto"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {filteredSuggestions.map((skill, index) => (
                        <motion.button
                          key={skill}
                          onClick={() => addSkill(skill)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-500/20 transition-colors first:rounded-t-2xl last:rounded-b-2xl text-gray-300 hover:text-white"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.1 }}
                        >
                          {skill}
                        </motion.button>
                      ))}
                      {searchTerm && !filteredSuggestions.some(s => s.toLowerCase() === searchTerm.toLowerCase()) && (
                        <motion.button
                          onClick={() => addSkill(searchTerm)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-500/20 transition-colors text-blue-400 font-medium"
                          whileHover={{ x: 5 }}
                        >
                          Add "{searchTerm}"
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selected Skills */}
              <div className="mb-8">
                <h3 className="text-lg mb-4 text-gray-300">Selected Skills ({selectedSkills.length})</h3>
                <div className="flex flex-wrap gap-3">
                  <AnimatePresence>
                    {selectedSkills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className={`
                          px-4 py-2 rounded-xl bg-gradient-to-r
                          ${getSkillColor(index) === 'blue' ? 'from-blue-500 to-blue-600' : ''}
                          ${getSkillColor(index) === 'green' ? 'from-green-500 to-green-600' : ''}
                          ${getSkillColor(index) === 'red' ? 'from-red-500 to-red-600' : ''}
                          ${getSkillColor(index) === 'yellow' ? 'from-yellow-500 to-yellow-600' : ''}
                          text-white text-sm flex items-center space-x-2 shadow-lg
                        `}
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Quick Add Categories */}
              <div className="mb-8">
                <h3 className="text-lg mb-4 text-gray-300">Skill Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {skillCategories.map((category, index) => (
                    <motion.button
                      key={category.name}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white text-center hover:scale-105 transition-transform shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronDown className="w-5 h-5 mx-auto mb-2" />
                      <div className="text-sm">{category.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <AnimatedButton
                  variant="blue"
                  onClick={() => setCurrentStep(2)}
                  className={selectedSkills.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Continue ({selectedSkills.length} skills selected)
                </AnimatedButton>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 2: Experience Level */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8 mb-8">
              <h2 className="text-2xl mb-6 text-gray-800">What's your experience level?</h2>
              
              <div className="grid gap-4 mb-8">
                {[
                  { level: 'Entry Level', description: '0-2 years of experience', color: 'green' },
                  { level: 'Mid Level', description: '2-5 years of experience', color: 'blue' },
                  { level: 'Senior Level', description: '5-10 years of experience', color: 'red' },
                  { level: 'Expert Level', description: '10+ years of experience', color: 'yellow' }
                ].map((item) => (
                  <motion.button
                    key={item.level}
                    className="p-6 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-left"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg text-gray-800">{item.level}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600`} />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between">
                <AnimatedButton
                  variant="primary"
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-500 hover:bg-gray-600"
                >
                  Back
                </AnimatedButton>
                <AnimatedButton
                  variant="blue"
                  onClick={() => setCurrentStep(3)}
                >
                  Continue
                </AnimatedButton>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8 mb-8">
              <h2 className="text-2xl mb-6 text-gray-800">Career Preferences</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg mb-4 text-gray-700">Work Environment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Remote', 'Hybrid', 'On-site'].map((env) => (
                      <motion.button
                        key={env}
                        className="p-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {env}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-4 text-gray-700">Industry Interest</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Design', 'Consulting', 'Startup'].map((industry) => (
                      <motion.button
                        key={industry}
                        className="p-3 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {industry}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <AnimatedButton
                  variant="primary"
                  onClick={() => setCurrentStep(2)}
                  className="bg-gray-500 hover:bg-gray-600"
                >
                  Back
                </AnimatedButton>
                <AnimatedButton
                  variant="green"
                  onClick={() => onNavigate('careers')}
                >
                  Get Career Recommendations
                </AnimatedButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}