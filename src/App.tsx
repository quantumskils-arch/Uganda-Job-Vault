import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing';
import CVGenerator from './pages/CVGenerator';
import CVTemplates from './pages/CVTemplates';
import Papers from './pages/Papers';
import Footer from './components/Footer';
import Nav from './components/Nav';
import UgandaPayeCalculator from './pages/tools/uganda-paye-calculator';
import Tools from './pages/tools/Tools';
import Refund from './pages/Refund';
import Privacy from './pages/Privacy';
import ProductDetail from './pages/ProductDetail';
import BlogLayout from './pages/blog/BlogLayout';
import BlogList from './pages/blog/BlogList';
import BlogPostPage from './pages/blog/BlogPost';

export type Page = 'home' | 'cv-generator' | 'cv-templates' | 'papers' | 'uganda-paye-calculator' | 'tools' | 'blog';

function App() {
  const [page, setPage] = useState<Page>('home');
  const routerNav = useNavigate();

  const navigate = (p: Page) => {
    if (p === 'blog') {
      routerNav('/blog');
    } else {
      setPage(p);
    }
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
            {page === 'tools' && <Tools />}
          </main>
          <Footer navigate={navigate} />
        </>
      } />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/blog" element={<BlogLayout><BlogList /></BlogLayout>} />
      <Route path="/blog/:slug" element={<BlogLayout><BlogPostPage /></BlogLayout>} />
    </Routes>
  );
}

export default App;
