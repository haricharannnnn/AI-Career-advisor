import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Star, TrendingUp, DollarSign, MapPin, Filter, Search, ChevronDown, ExternalLink } from 'lucide-react';
import { AnimatedButton } from '../ui/AnimatedButton';
import { GlassCard } from '../ui/GlassCard';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

const careerPaths = [
  {
    id: 1,
    title: 'Full Stack Developer',
    match: 94,
    salary: '$85k - $130k',
    growth: '+22%',
    location: 'Remote',
    description: 'Build end-to-end web applications using modern technologies.',
    skills: ['JavaScript', 'React', 'Node.js', 'SQL'],
    demand: 'High',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    title: 'Data Scientist',
    match: 89,
    salary: '$95k - $150k',
    growth: '+35%',
    location: 'Hybrid',
    description: 'Extract insights from data to drive business decisions.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
    demand: 'Very High',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 3,
    title: 'Product Manager',
    match: 78,
    salary: '$90k - $140k',
    growth: '+19%',
    location: 'On-site',
    description: 'Lead product strategy and coordinate cross-functional teams.',
    skills: ['Project Management', 'Leadership', 'Communication', 'Agile'],
    demand: 'High',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 4,
    title: 'UX Designer',
    match: 72,
    salary: '$70k - $110k',
    growth: '+24%',
    location: 'Remote',
    description: 'Design intuitive user experiences for digital products.',
    skills: ['UI/UX Design', 'Problem Solving', 'Communication'],
    demand: 'Medium',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    match: 68,
    salary: '$80k - $125k',
    growth: '+27%',
    location: 'Hybrid',
    description: 'Streamline development and deployment processes.',
    skills: ['Cloud Computing', 'Python', 'Project Management'],
    demand: 'High',
    color: 'from-blue-500 to-green-500'
  },
  {
    id: 6,
    title: 'Marketing Manager',
    match: 65,
    salary: '$65k - $95k',
    growth: '+18%',
    location: 'On-site',
    description: 'Develop and execute marketing strategies to drive growth.',
    skills: ['Marketing', 'Communication', 'Leadership', 'Data Analysis'],
    demand: 'Medium',
    color: 'from-red-500 to-yellow-500'
  }
];

const filters = [
  { name: 'All', value: 'all' },
  { name: 'High Match (80%+)', value: 'high-match' },
  { name: 'Remote', value: 'remote' },
  { name: 'High Growth', value: 'high-growth' },
  { name: 'High Demand', value: 'high-demand' }
];

interface CareerRecommendationsProps {
  onNavigate: (page: string) => void;
}

export function CareerRecommendations({ onNavigate }: CareerRecommendationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const filteredCareers = careerPaths.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    switch (selectedFilter) {
      case 'high-match':
        return matchesSearch && career.match >= 80;
      case 'remote':
        return matchesSearch && career.location === 'Remote';
      case 'high-growth':
        return matchesSearch && parseInt(career.growth.replace('%', '').replace('+', '')) > 20;
      case 'high-demand':
        return matchesSearch && (career.demand === 'High' || career.demand === 'Very High');
      default:
        return matchesSearch;
    }
  });

  const toggleExpanded = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            Career Recommendations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Based on your skills and preferences, here are the best career paths for you
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search careers or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-2xl border-blue-400/30 bg-black/20 backdrop-blur-sm text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 rounded-2xl bg-black/20 border border-blue-400/30 backdrop-blur-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {filters.map(filter => (
                    <option key={filter.value} value={filter.value}>
                      {filter.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Career Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredCareers.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <GlassCard 
                  className={`p-6 cursor-pointer transition-all duration-300 ${
                    expandedCard === career.id ? 'ring-2 ring-blue-400/50' : ''
                  }`}
                  hover
                  onClick={() => toggleExpanded(career.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl text-white">{career.title}</h3>
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${career.color} text-white text-sm flex items-center space-x-1`}>
                          <Star className="w-3 h-3 fill-current" />
                          <span>{career.match}% match</span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{career.description}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCard === career.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{career.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">{career.growth}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600">{career.location}</span>
                    </div>
                    <div>
                      <Badge 
                        variant={career.demand === 'Very High' ? 'default' : career.demand === 'High' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {career.demand} Demand
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {career.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className={`
                          px-3 py-1 rounded-xl text-sm bg-gradient-to-r text-white
                          ${skillIndex % 4 === 0 ? 'from-blue-500 to-blue-600' : ''}
                          ${skillIndex % 4 === 1 ? 'from-green-500 to-green-600' : ''}
                          ${skillIndex % 4 === 2 ? 'from-red-500 to-red-600' : ''}
                          ${skillIndex % 4 === 3 ? 'from-yellow-500 to-yellow-600' : ''}
                        `}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  <AnimatePresence>
                    {expandedCard === career.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/20 pt-4"
                      >
                        <h4 className="text-lg mb-3 text-gray-800">Career Details</h4>
                        <div className="space-y-3 mb-4">
                          <div>
                            <h5 className="text-sm text-gray-600 mb-1">Typical Responsibilities:</h5>
                            <p className="text-sm text-gray-700">
                              Design and develop scalable applications, collaborate with cross-functional teams, 
                              implement best practices, and mentor junior developers.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-sm text-gray-600 mb-1">Career Path:</h5>
                            <p className="text-sm text-gray-700">
                              Junior Developer → Senior Developer → Tech Lead → Engineering Manager
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <AnimatedButton 
                            variant="blue" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('preparation');
                            }}
                          >
                            View Preparation
                          </AnimatedButton>
                          <AnimatedButton 
                            variant="green" 
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Learn More
                          </AnimatedButton>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCareers.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl mb-4 text-gray-800">No careers found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters to see more results.</p>
              <AnimatedButton 
                variant="blue"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                }}
              >
                Clear Filters
              </AnimatedButton>
            </GlassCard>
          </motion.div>
        )}

        {/* Action Section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl mb-4 text-gray-800">Ready to start your journey?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore preparation resources, courses, and tools to help you transition into your dream career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                variant="green"
                onClick={() => onNavigate('preparation')}
              >
                View Preparation Tools
              </AnimatedButton>
              <AnimatedButton 
                variant="blue"
                onClick={() => onNavigate('skills')}
              >
                Refine My Skills
              </AnimatedButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}