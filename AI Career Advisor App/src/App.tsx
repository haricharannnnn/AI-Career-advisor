import { useState } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './components/pages/LandingPage';
import { SkillsMapping } from './components/pages/SkillsMapping';
import { CareerRecommendations } from './components/pages/CareerRecommendations';
import { PreparationTools } from './components/pages/PreparationTools';
import { Profile } from './components/pages/Profile';

type Page = 'landing' | 'skills' | 'careers' | 'preparation' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'skills':
        return <SkillsMapping onNavigate={handleNavigate} />;
      case 'careers':
        return <CareerRecommendations onNavigate={handleNavigate} />;
      case 'preparation':
        return <PreparationTools onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}