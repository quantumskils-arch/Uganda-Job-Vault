import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug } from '../../data/blog';
import BlogContent from '../../components/BlogContent';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const nav = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-display font-black text-4xl mb-4">Post Not Found</h1>
        <p className="text-white/50 text-sm mb-6">This blog post doesn't exist or has been removed.</p>
        <button
          onClick={() => nav('/blog')}
          className="bg-[#F5C518] text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors"
        >
          ← Back to Blog
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | UgandaJobVault Blog</title>
        <meta name="description" content={post.description} />
      </Helmet>

      <article className="pt-24 pb-20 max-w-3xl mx-auto px-4">
        <button
          onClick={() => nav('/blog')}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </button>

        {post.cover && (
          <img
            src={post.cover}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-2xl mb-8"
          />
        )}

        <header className="mb-10">
          <h1 className="font-display font-black text-3xl md:text-4xl leading-[1.05] mb-4">
            {post.title}
          </h1>
          {post.date && (
            <div className="flex items-center gap-1.5 text-xs text-white/30">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          )}
        </header>

        <BlogContent body={post.body} />
      </article>
    </>
  );
}
