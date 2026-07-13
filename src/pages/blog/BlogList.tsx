import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllPosts } from '../../data/blog';
import BlogCard from '../../components/BlogCard';
import { BookOpen } from 'lucide-react';

export default function BlogList() {
  const posts = getAllPosts();
  const nav = useNavigate();

  return (
    <>
      <Helmet>
        <title>Blog — Career Tips & Resources | UgandaJobVault</title>
        <meta
          name="description"
          content="Career advice, job search tips, and resources for Ugandan job seekers. Cover letters, interview prep, aptitude tests, and more."
        />
      </Helmet>

      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">
        <div className="relative mb-10">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#F5C518]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 bg-[#F5C518]/10 rounded-2xl flex items-center justify-center shrink-0 mt-1">
              <BookOpen size={24} className="text-[#F5C518]" />
            </div>
            <div>
              <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
                Blog & <span className="text-[#F5C518]">Advice</span>
              </h1>
              <p className="text-white/50 max-w-xl text-sm md:text-base leading-relaxed">
                Career tips, job search strategies, and resources to help you land your next role in Uganda.
              </p>
            </div>
          </div>
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 text-sm">No posts yet. Check back soon.</p>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              onClick={() => {
                nav(`/blog/${post.slug}`);
                window.scrollTo(0, 0);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
