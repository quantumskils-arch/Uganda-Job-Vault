import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import type { Page } from '../../App';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const routerNav = useNavigate();

  const navigate = (p: Page) => {
    routerNav('/');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Nav page="blog" navigate={navigate} />
      <main>{children}</main>
      <Footer navigate={navigate} />
    </>
  );
}
