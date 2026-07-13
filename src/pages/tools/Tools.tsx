import { Helmet } from 'react-helmet-async';
import { TOOLS } from '../../lib/affiliateLinks';
import ToolsCard from '../../components/ToolsCard';
import { Wrench } from 'lucide-react';

export default function Tools() {
  return (
    <>
      <Helmet>
        <title>Free Tools & Resources for Ugandan Job Seekers | UgandaJobVault</title>
        <meta
          name="description"
          content="Curated free and discounted tools for Ugandan job seekers — web hosting, AI writing assistants, CV design tools, freelance platforms, and productivity apps."
        />
      </Helmet>

      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">
        <div className="relative mb-14">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#F5C518]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 bg-[#F5C518]/10 rounded-2xl flex items-center justify-center shrink-0 mt-1">
              <Wrench size={24} className="text-[#F5C518]" />
            </div>
            <div>
              <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
                Tools & <span className="text-[#F5C518]">Resources</span>
              </h1>
              <p className="text-white/50 max-w-xl text-sm md:text-base leading-relaxed">
                Hand-picked free and discounted tools to supercharge your job search, boost your
                productivity, and help you earn online from Uganda.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <ToolsCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-white/20 text-xs leading-relaxed max-w-lg mx-auto text-center">
            Some links on this page are affiliate links. If you sign up or make a purchase through
            them, we may earn a small commission at no extra cost to you. This helps us keep the
            platform free for Ugandan job seekers. We only recommend tools we genuinely find useful.
          </p>
        </div>
      </div>
    </>
  );
}
