import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { ParticleVisual } from './ParticleVisual';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const sections = [
  {
    badge: "Launching Q1 2026 · Limited Partner Program",
    title: (
      <>
        Transformational
        <br />
        coaching at
        <br />
        <span className="text-[--color-orange]">enterprise</span> scale
      </>
    ),
    description: "AI-powered executive coaching delivering quantifiable performance improvements through behavioral science and machine learning.",
    color: "#22c55e",
    isHero: true,
  },
  {
    badge: "Unique Advantage 1",
    title: "Proprietary Behavioral Intelligence Engine",
    description: "Our AI doesn't just track goals—it predicts behavioral patterns 14 days in advance using longitudinal analysis unavailable in traditional coaching platforms.",
    color: "#22c55e",
  },
  {
    badge: "Unique Advantage 2", 
    title: "Real-Time Neuroplasticity Optimization",
    description: "Adaptive learning algorithms that restructure coaching interventions based on cognitive load theory, ensuring sustainable habit formation at the neurological level.",
    color: "#f97316",
  },
  {
    badge: "Unique Advantage 3",
    title: "Quantified Leadership Transformation",
    description: "The only platform providing ISO-validated performance metrics with auditable behavioral change documentation accepted by institutional review boards.",
    color: "#22c55e",
  },
];

export function HeroWithScrollingAdvantages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: '-10% 0px -10% 0px',
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Scrolling content */}
          <div className="pt-20">
            {sections.map((section, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="min-h-screen flex items-center py-20"
              >
                <div
                  className={`transition-all duration-1000 max-w-2xl ${
                    activeIndex === index
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-20 translate-x-8'
                  }`}
                >
                  {/* Badge */}
                  <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
                    section.isHero 
                      ? 'bg-gradient-to-r from-black/5 to-black/[0.02]' 
                      : 'bg-black/5'
                  } border border-black/10 mb-12 shadow-sm`}>
                    {section.isHero && <Sparkles className="w-4 h-4 text-[--color-orange]" />}
                    <span className="text-sm tracking-wide">{section.badge}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tight mb-10 leading-[1.05]">
                    {section.title}
                  </h1>

                  {/* Description */}
                  <p className="text-2xl md:text-3xl text-foreground/70 mb-16 leading-relaxed max-w-xl">
                    {section.description}
                  </p>

                  {/* Hero-specific content */}
                  {section.isHero && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Sticky particle orb */}
          <div className="relative hidden lg:block h-[400vh]">
            <div className="sticky top-32 pt-20">
              <div className="w-full h-[600px] max-w-xl mx-auto relative">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                    }}
                  >
                    <ParticleVisual color={section.color} />
                  </div>
                ))}
                
                {/* Decorative gradient that changes with active section */}
                <div 
                  className="absolute inset-0 rounded-full blur-3xl -z-10 transition-all duration-1000"
                  style={{
                    background: `radial-gradient(circle, ${sections[activeIndex].color}15 0%, transparent 70%)`,
                  }}
                ></div>

                {/* Progress indicator */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-3">
                  {sections.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        activeIndex === index ? 'w-12 bg-black' : 'w-8 bg-black/20'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}