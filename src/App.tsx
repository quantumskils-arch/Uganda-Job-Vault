import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CVGenerator from './pages/CVGenerator';
import CVTemplates from './pages/CVTemplates';
import Papers from './pages/Papers';
import Footer from './components/Footer';
import Nav from './components/Nav';
import UgandaPayeCalculator from './pages/tools/uganda-paye-calculator';
import ProductDetail from './pages/ProductDetail';
import Refund from './pages/Refund';
import Privacy from './pages/Privacy';

export type Page = 'home' | 'cv-generator' | 'cv-templates' | 'papers' | 'uganda-paye-calculator';

function App() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Nav page={page} navigate={navigate} />
          <main>
            {page === 'home' && <Landing navigate={navigate} />}
            {page === 'cv-generator' && <CVGenerator />}
            {page === 'cv-templates' && <CVTemplates />}
            {page === 'papers' && <Papers />}
            {page === 'uganda-paye-calculator' && <UgandaPayeCalculator />}
          </main>
          <Footer navigate={navigate} />
        </>
      } />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
}

export default App;
