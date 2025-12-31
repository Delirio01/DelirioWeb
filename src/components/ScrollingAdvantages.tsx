import { useEffect, useRef, useState } from 'react';
import { ParticleVisual } from './ParticleVisual';

const advantages = [
  {
    title: "Proprietary Behavioral Intelligence Engine",
    description: "Our AI doesn't just track goals—it predicts behavioral patterns 14 days in advance using longitudinal analysis unavailable in traditional coaching platforms.",
    color: "#22c55e", // green
  },
  {
    title: "Real-Time Neuroplasticity Optimization",
    description: "Adaptive learning algorithms that restructure coaching interventions based on cognitive load theory, ensuring sustainable habit formation at the neurological level.",
    color: "#f97316", // orange
  },
  {
    title: "Quantified Leadership Transformation",
    description: "The only platform providing ISO-validated performance metrics with auditable behavioral change documentation accepted by institutional review boards.",
    color: "#22c55e", // green
  },
];

export function ScrollingAdvantages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

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
          threshold: 0.6,
          rootMargin: '-20% 0px -20% 0px',
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
    <section ref={containerRef} className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left side - Scrolling text */}
          <div className="py-32 space-y-[100vh]">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="min-h-screen flex items-center"
              >
                <div
                  className={`transition-all duration-1000 ${
                    activeIndex === index
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-20 translate-x-8'
                  }`}
                >
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/5 border border-black/10 mb-8">
                    <span className="text-sm tracking-wide">Unique Advantage {index + 1}</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-10 leading-[1.1]">
                    {advantage.title}
                  </h2>
                  <p className="text-2xl md:text-3xl text-foreground/60 leading-relaxed max-w-xl">
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Sticky particle orb */}
          <div className="relative hidden lg:block">
            <div className="sticky top-1/2 -translate-y-1/2 py-32">
              <div className="w-full aspect-square max-w-xl mx-auto relative">
                <div
                  className="absolute inset-0 transition-all duration-1000"
                  style={{
                    opacity: activeIndex === 0 ? 1 : 0,
                  }}
                >
                  <ParticleVisual color={advantages[0].color} />
                </div>
                <div
                  className="absolute inset-0 transition-all duration-1000"
                  style={{
                    opacity: activeIndex === 1 ? 1 : 0,
                  }}
                >
                  <ParticleVisual color={advantages[1].color} />
                </div>
                <div
                  className="absolute inset-0 transition-all duration-1000"
                  style={{
                    opacity: activeIndex === 2 ? 1 : 0,
                  }}
                >
                  <ParticleVisual color={advantages[2].color} />
                </div>
              </div>
              
              {/* Decorative gradient that changes with active section */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl -z-10 transition-all duration-1000"
                style={{
                  background: `radial-gradient(circle, ${advantages[activeIndex].color}15 0%, transparent 70%)`,
                }}
              ></div>

              {/* Progress indicator */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3">
                {advantages.map((_, index) => (
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
    </section>
  );
}
