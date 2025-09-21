import { motion } from 'motion/react';
import { useState } from 'react';
import { BookOpen, Award, FileText, Mic, Search, Star, Clock, Users, ExternalLink } from 'lucide-react';
import { AnimatedButton } from '../ui/AnimatedButton';
import { GlassCard } from '../ui/GlassCard';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

const resources = [
  {
    id: 1,
    category: 'courses',
    title: 'Full Stack Web Development Bootcamp',
    provider: 'Tech Academy',
    rating: 4.8,
    students: '12,500',
    duration: '16 weeks',
    price: '$299',
    description: 'Comprehensive course covering React, Node.js, databases, and deployment.',
    skills: ['JavaScript', 'React', 'Node.js', 'SQL'],
    level: 'Beginner to Advanced',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    category: 'certifications',
    title: 'AWS Cloud Practitioner',
    provider: 'Amazon Web Services',
    rating: 4.7,
    students: '45,000',
    duration: '6 weeks',
    price: '$100',
    description: 'Foundation certification for cloud computing with AWS.',
    skills: ['Cloud Computing', 'AWS'],
    level: 'Beginner',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 3,
    category: 'courses',
    title: 'Data Science with Python',
    provider: 'DataLearn',
    rating: 4.9,
    students: '8,200',
    duration: '12 weeks',
    price: '$399',
    description: 'Master data analysis, machine learning, and visualization with Python.',
    skills: ['Python', 'Data Analysis', 'Machine Learning'],
    level: 'Intermediate',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 4,
    category: 'tools',
    title: 'AI Resume Builder',
    provider: 'CareerCraft',
    rating: 4.6,
    students: '25,000',
    duration: '1 hour',
    price: 'Free',
    description: 'Create professional resumes tailored to your target role.',
    skills: ['Resume Writing'],
    level: 'All Levels',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 5,
    category: 'interviews',
    title: 'Technical Interview Prep',
    provider: 'InterviewAce',
    rating: 4.8,
    students: '15,600',
    duration: '8 weeks',
    price: '$149',
    description: 'Practice coding interviews with real-time feedback and solutions.',
    skills: ['Problem Solving', 'Algorithms'],
    level: 'Intermediate to Advanced',
    color: 'from-blue-500 to-green-500'
  },
  {
    id: 6,
    category: 'certifications',
    title: 'Google UX Design Certificate',
    provider: 'Google',
    rating: 4.7,
    students: '32,000',
    duration: '24 weeks',
    price: '$49/month',
    description: 'Professional certificate program in user experience design.',
    skills: ['UI/UX Design', 'Design Thinking'],
    level: 'Beginner',
    color: 'from-red-500 to-yellow-500'
  }
];

const categories = [
  { id: 'all', name: 'All Resources', icon: BookOpen, count: resources.length },
  { id: 'courses', name: 'Courses', icon: BookOpen, count: resources.filter(r => r.category === 'courses').length },
  { id: 'certifications', name: 'Certifications', icon: Award, count: resources.filter(r => r.category === 'certifications').length },
  { id: 'tools', name: 'Resume Builder', icon: FileText, count: resources.filter(r => r.category === 'tools').length },
  { id: 'interviews', name: 'Mock Interviews', icon: Mic, count: resources.filter(r => r.category === 'interviews').length }
];

interface PreparationToolsProps {
  onNavigate: (page: string) => void;
}

export function PreparationTools({ onNavigate }: PreparationToolsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Preparation Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access curated resources to build the skills you need for your target career
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <GlassCard className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses, certifications, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-2xl border-white/30 bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:bg-white/15"
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg scale-105' 
                      : 'bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 hover:bg-white/30 hover:scale-105'
                    }
                  `}
                  whileHover={{ scale: isActive ? 1.05 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                  <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">
                    {category.count}
                  </Badge>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GlassCard className="p-6 h-full flex flex-col" hover>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center flex-shrink-0`}>
                    {resource.category === 'courses' && <BookOpen className="w-6 h-6 text-white" />}
                    {resource.category === 'certifications' && <Award className="w-6 h-6 text-white" />}
                    {resource.category === 'tools' && <FileText className="w-6 h-6 text-white" />}
                    {resource.category === 'interviews' && <Mic className="w-6 h-6 text-white" />}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{resource.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">{resource.students} students</div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg mb-2 text-gray-800">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">by {resource.provider}</p>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{resource.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.skills.map((skill, skillIndex) => (
                      <span
                        key={skill}
                        className={`
                          px-2 py-1 rounded-lg text-xs bg-gradient-to-r text-white
                          ${skillIndex % 4 === 0 ? 'from-blue-400 to-blue-500' : ''}
                          ${skillIndex % 4 === 1 ? 'from-green-400 to-green-500' : ''}
                          ${skillIndex % 4 === 2 ? 'from-red-400 to-red-500' : ''}
                          ${skillIndex % 4 === 3 ? 'from-yellow-400 to-yellow-500' : ''}
                        `}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{resource.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{resource.level}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="text-lg text-green-600">{resource.price}</div>
                  <div className="flex space-x-2">
                    <AnimatedButton size="sm" variant="blue">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Start
                    </AnimatedButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl mb-4 text-gray-800">No resources found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or selecting a different category.</p>
              <AnimatedButton 
                variant="blue"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Show All Resources
              </AnimatedButton>
            </GlassCard>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl mb-4 text-gray-800">Need personalized guidance?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Complete your profile to get customized learning recommendations based on your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                variant="green"
                onClick={() => onNavigate('profile')}
              >
                Complete Profile
              </AnimatedButton>
              <AnimatedButton 
                variant="blue"
                onClick={() => onNavigate('careers')}
              >
                View Career Paths
              </AnimatedButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}