import { motion } from 'motion/react';
import { useState } from 'react';
import { User, Mail, MapPin, Calendar, Edit3, Save, Camera, Star, TrendingUp, Target, Award } from 'lucide-react';
import { AnimatedButton } from '../ui/AnimatedButton';
import { GlassCard } from '../ui/GlassCard';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';

const skillsData = [
  { name: 'JavaScript', level: 85, category: 'Technical' },
  { name: 'React', level: 80, category: 'Technical' },
  { name: 'Python', level: 70, category: 'Technical' },
  { name: 'Communication', level: 90, category: 'Soft Skills' },
  { name: 'Leadership', level: 75, category: 'Soft Skills' },
  { name: 'Problem Solving', level: 88, category: 'Soft Skills' }
];

const achievements = [
  { title: 'Skill Explorer', description: 'Added 10+ skills to your profile', date: '2024-01-15', color: 'from-blue-500 to-blue-600' },
  { title: 'Career Focused', description: 'Completed career assessment', date: '2024-01-20', color: 'from-green-500 to-green-600' },
  { title: 'Learning Path', description: 'Started 3 recommended courses', date: '2024-02-01', color: 'from-red-500 to-red-600' }
];

const progressTimeline = [
  { date: '2024-01-01', event: 'Profile Created', type: 'milestone' },
  { date: '2024-01-15', event: 'Skills Assessment Completed', type: 'activity' },
  { date: '2024-01-20', event: 'Career Paths Explored', type: 'activity' },
  { date: '2024-02-01', event: 'Started Learning JavaScript', type: 'course' },
  { date: '2024-02-15', event: 'Completed React Fundamentals', type: 'achievement' }
];

interface ProfileProps {
  onNavigate: (page: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    location: 'San Francisco, CA',
    bio: 'Aspiring full-stack developer with a passion for creating innovative web applications. Currently transitioning from marketing to tech.',
    experience: 'Mid Level',
    interests: 'Web Development, AI, Startups'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
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
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Track your progress and manage your career development journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <Avatar className="w-24 h-24 mx-auto border-4 border-white/30">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-green-500 text-white">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white hover:from-blue-600 hover:to-green-600 transition-all shadow-lg">
                      <Camera className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-center rounded-2xl bg-white/10 border-white/30"
                    />
                    <Input
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="text-center rounded-2xl bg-white/10 border-white/30"
                    />
                    <Input
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="text-center rounded-2xl bg-white/10 border-white/30"
                    />
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="rounded-2xl bg-white/10 border-white/30 resize-none"
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <AnimatedButton variant="green" size="sm" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </AnimatedButton>
                      <AnimatedButton 
                        variant="primary" 
                        size="sm" 
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 hover:bg-gray-600"
                      >
                        Cancel
                      </AnimatedButton>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl mb-2 text-white">{profileData.name}</h2>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-center space-x-2 text-white/70">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{profileData.email}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-white/70">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{profileData.location}</span>
                      </div>
                    </div>

                    <p className="text-white/70 text-sm mb-4 leading-relaxed">{profileData.bio}</p>

                    <AnimatedButton variant="blue" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit Profile
                    </AnimatedButton>
                  </div>
                )}
              </GlassCard>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-lg mb-4 text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Skills Added</span>
                    <span className="text-blue-400">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Courses Started</span>
                    <span className="text-green-400">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Profile Completion</span>
                    <span className="text-red-400">85%</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column - Skills & Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Overview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl text-white flex items-center">
                    <Target className="w-6 h-6 mr-2 text-blue-400" />
                    Skills Portfolio
                  </h3>
                  <AnimatedButton variant="blue" size="sm" onClick={() => onNavigate('skills')}>
                    Add Skills
                  </AnimatedButton>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {skillsData.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white">{skill.name}</span>
                        <span className="text-sm text-white/60">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                      />
                      <span className="text-xs text-white/60">{skill.category}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-2xl mb-6 text-white flex items-center">
                  <Award className="w-6 h-6 mr-2 text-yellow-400" />
                  Achievements
                </h3>
                
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      className="flex items-center space-x-4 p-4 rounded-2xl bg-white/10 border border-white/20"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white">{achievement.title}</h4>
                        <p className="text-white/70 text-sm">{achievement.description}</p>
                        <p className="text-white/50 text-xs mt-1">{new Date(achievement.date).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Progress Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-2xl mb-6 text-white flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-green-400" />
                  Learning Journey
                </h3>
                
                <div className="space-y-4">
                  {progressTimeline.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className={`
                        w-4 h-4 rounded-full flex-shrink-0
                        ${item.type === 'milestone' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : ''}
                        ${item.type === 'activity' ? 'bg-gradient-to-r from-green-500 to-green-600' : ''}
                        ${item.type === 'course' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : ''}
                        ${item.type === 'achievement' ? 'bg-gradient-to-r from-red-500 to-red-600' : ''}
                      `} />
                      <div className={`h-px flex-1 ${index < progressTimeline.length - 1 ? 'bg-gradient-to-r from-white/30 to-transparent' : ''}`} />
                      <div className="text-right">
                        <p className="text-white text-sm">{item.event}</p>
                        <p className="text-white/60 text-xs">{new Date(item.date).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Bottom Actions */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl mb-4 text-white">Continue Your Journey</h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Ready to take the next step? Explore more career paths or continue building your skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                variant="blue"
                onClick={() => onNavigate('careers')}
              >
                Explore Career Paths
              </AnimatedButton>
              <AnimatedButton 
                variant="green"
                onClick={() => onNavigate('preparation')}
              >
                Find Learning Resources
              </AnimatedButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}