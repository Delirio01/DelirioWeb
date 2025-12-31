import { Button } from './ui/button';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50/30 to-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-black/5 to-black/[0.02] border border-black/10 mb-12 shadow-sm">
            <Sparkles className="w-4 h-4 text-[--color-orange]" />
            <span className="text-sm tracking-wide">Launching Q1 2026 · Limited Partner Program</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tight mb-10 leading-[1.05]">
            Transformational
            <br />
            coaching at
            <br />
            <span className="text-[--color-orange] inline-flex items-baseline gap-4">
              enterprise
            </span>{' '}
            scale
          </h1>

          {/* Subheadline */}
          <p className="text-2xl md:text-3xl text-foreground/70 mb-16 leading-relaxed max-w-xl">
            AI-powered executive coaching delivering quantifiable performance improvements 
            through behavioral science and machine learning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mb-16">
            <Button 
              size="lg"
              className="bg-black text-white hover:bg-black/90 rounded-full px-12 h-16 text-lg group shadow-xl hover:shadow-2xl transition-all"
              onClick={() => {
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Schedule Consultation
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-12 h-16 text-lg border-2 border-black/20 hover:bg-black/5 hover:border-black/30"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Platform Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-8 text-sm text-foreground/60 mb-16 pb-16 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[--color-green]" />
              <span>SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[--color-green]" />
              <span>HIPAA Compliant Infrastructure</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[--color-green]" />
              <span>99.99% Uptime SLA</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-10">
            <div>
              <div className="text-5xl mb-3 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">$2.4M</div>
              <div className="text-sm text-foreground/60 leading-snug">Average annual value<br/>created per client</div>
            </div>
            <div>
              <div className="text-5xl mb-3 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">89%</div>
              <div className="text-sm text-foreground/60 leading-snug">Goal achievement<br/>rate (vs 23% industry)</div>
            </div>
            <div>
              <div className="text-5xl mb-3 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">6.2x</div>
              <div className="text-sm text-foreground/60 leading-snug">Return on coaching<br/>investment (ROCI)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}