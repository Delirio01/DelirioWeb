import { Shield, Lock, Award, Zap } from 'lucide-react';

export function TrustBadges() {
  const companies = [
    'MICROSOFT',
    'GOLDMAN SACHS',
    'DELOITTE',
    'STANFORD GSB',
    'SEQUOIA',
    'MCKINSEY'
  ];

  return (
    <section className="px-6 py-20 bg-white border-y border-border/30">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs text-foreground/40 mb-8 uppercase tracking-widest">
          Trusted by leaders at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6 mb-20">
          {companies.map((company, index) => (
            <div key={index} className="text-sm tracking-widest text-foreground/30 hover:text-foreground/50 transition-colors">
              {company}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 pt-16 border-t border-border/20">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-black/5 to-black/[0.02] border border-black/5 flex items-center justify-center shadow-sm">
              <Shield className="w-7 h-7 text-foreground/70" />
            </div>
            <div>
              <div className="text-base mb-1.5">SOC 2 Type II</div>
              <div className="text-xs text-foreground/50 leading-relaxed">Independently audited security<br/>and compliance framework</div>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-black/5 to-black/[0.02] border border-black/5 flex items-center justify-center shadow-sm">
              <Lock className="w-7 h-7 text-foreground/70" />
            </div>
            <div>
              <div className="text-base mb-1.5">Zero-Knowledge Encryption</div>
              <div className="text-xs text-foreground/50 leading-relaxed">End-to-end encryption with<br/>AES-256 & RSA-4096</div>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-black/5 to-black/[0.02] border border-black/5 flex items-center justify-center shadow-sm">
              <Award className="w-7 h-7 text-foreground/70" />
            </div>
            <div>
              <div className="text-base mb-1.5">ICF Accredited</div>
              <div className="text-xs text-foreground/50 leading-relaxed">Methodology validated by<br/>International Coach Federation</div>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-black/5 to-black/[0.02] border border-black/5 flex items-center justify-center shadow-sm">
              <Zap className="w-7 h-7 text-foreground/70" />
            </div>
            <div>
              <div className="text-base mb-1.5">24/7 Availability</div>
              <div className="text-xs text-foreground/50 leading-relaxed">Global infrastructure with<br/>multi-region redundancy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}