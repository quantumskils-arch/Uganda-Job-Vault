import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ToolsCard from './ToolsCard';
import { TOOLS } from '../lib/affiliateLinks';

export default function BlogContent({ body }: { body: string }) {
  const parts = body.split(/(::tools-card\{id="[^"]+"\})/g);

  return (
    <div className="prose-custom">
      {parts.map((part, i) => {
        const match = part.match(/^::tools-card\{id="([^"]+)"\}$/);
        if (match) {
          const tool = TOOLS.find((t) => t.id === match[1]);
          if (tool) {
            return (
              <div key={i} className="my-6">
                <ToolsCard tool={tool} />
              </div>
            );
          }
          return null;
        }

        if (!part.trim()) return null;

        return (
          <ReactMarkdown
            key={i}
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children, ...props }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="text-[#F5C518] hover:text-yellow-400 underline underline-offset-2 transition-colors"
                  {...props}
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt ?? ''}
                  className="rounded-xl w-full my-6"
                />
              ),
              h2: ({ children, ...props }) => (
                <h2 className="font-display font-bold text-2xl text-white mt-10 mb-4" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 className="font-display font-bold text-xl text-white mt-8 mb-3" {...props}>
                  {children}
                </h3>
              ),
              p: ({ children, ...props }) => (
                <p className="text-white/65 text-sm leading-relaxed mb-4 last:mb-0" {...props}>
                  {children}
                </p>
              ),
              ul: ({ children, ...props }) => (
                <ul className="flex flex-col gap-2 my-4" {...props}>
                  {children}
                </ul>
              ),
              li: ({ children, ...props }) => (
                <li className="flex items-start gap-2 text-sm text-white/65 leading-relaxed" {...props}>
                  <span className="text-[#F5C518] mt-[6px] shrink-0">•</span>
                  {children}
                </li>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote className="border-l-2 border-[#F5C518]/30 pl-4 my-6 text-white/50 italic text-sm" {...props}>
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="border-white/5 my-8" />,
              strong: ({ children, ...props }) => (
                <strong className="text-white font-semibold" {...props}>
                  {children}
                </strong>
              ),
              code: ({ children, ...props }: any) => {
                if (props.inline) {
                  return (
                    <code className="bg-white/5 text-white/80 text-xs px-1.5 py-0.5 rounded border border-white/10 font-mono" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-black/40 border border-white/10 rounded-xl p-4 my-6 overflow-x-auto">
                    <code className="text-xs text-white/70 font-mono leading-relaxed" {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
            }}
          >
            {part}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
