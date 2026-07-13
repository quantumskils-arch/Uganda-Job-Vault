import type { BlogPost } from '../types/blog';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export default function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col rounded-2xl border border-white/10 bg-[#111] overflow-hidden text-left
                 hover:border-[#F5C518]/50 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(245,197,24,0.08)]
                 transition-all duration-200 cursor-pointer"
    >
      {post.cover && (
        <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        {post.date && (
          <div className="flex items-center gap-1.5 text-[11px] text-white/30">
            <Calendar size={11} />
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div>
        )}

        <h3 className="font-bold text-sm leading-snug text-white/90 group-hover:text-[#F5C518] transition-colors duration-150 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-xs text-white/45 leading-relaxed line-clamp-2 flex-1">
          {post.description}
        </p>

        <div className="flex items-center gap-1.5 text-[#F5C518] text-xs font-semibold pt-2 mt-auto border-t border-white/[0.06]">
          Read More
          <ArrowRight size={12} />
        </div>
      </div>
    </button>
  );
}
