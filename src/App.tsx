import { useState } from 'react';
import Landing from './pages/Landing';
import Papers from './pages/Papers';
import CVGenerator from './pages/CVGenerator';
import CVTemplates from './pages/CVTemplates';
import Nav from './components/Nav';
import Footer from './components/Footer';

export type Page = 'home' | 'papers' | 'cv-generator' | 'cv-templates';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-body">
      <Nav page={page} navigate={navigate} />
      {page === 'home' && <Landing navigate={navigate} />}
      {page === 'papers' && <Papers />}
      {page === 'cv-generator' && <CVGenerator />}
      {page === 'cv-templates' && <CVTemplates />}
      <Footer navigate={navigate} />
    </div>
  );
}
