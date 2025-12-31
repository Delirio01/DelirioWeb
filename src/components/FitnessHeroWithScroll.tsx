import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ParticleVisual } from "./ParticleVisual";

const sections = [
  {
    title: (
      <>
        DON'T JUST BRING THE
        <br />
        GYM WITH YOU, BRING
        <br />
        THE <span className="text-[#FF6B35]">COACH</span> TOO
      </>
    ),
    description:
      "An AI-powered coach that analyzes your form, tracks your progress, and adapts to your goals. Bring the expertise of a personal trainer wherever you go.",
    color: "#FF6B35",
    isHero: true,
  },
  {
    title:
      "Delirio AI coach is capable to see all views of a specific excercise and let you know if you are doing it correctly or not. Adapt your form in real time without injuries.",
    color: "#FF6B35",
  },
  {
    title:
      "A Delirio Power is designed to be simple and easy to use, making it accessible for everyone, regardless of their fitness level or technical expertise.",
    color: "#FF6B35",
  },
  {
    title:
      "Delirio Power AI doesn't track you or save your workout, just analyzes in real-time and adapts to you in real time.",
    color: "#FF6B35",
  },
];

export function FitnessHeroWithScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(true);

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
          rootMargin: "-10% 0px -10% 0px",
        },
      );

      observer.observe(ref);
      return observer;
    });

    // Observer for FitnessFeatures section to hide particle system when it comes into view
    const featuresSection = document.getElementById("features");
    const footerSection = document.getElementById("footer");
    let featuresObserver: IntersectionObserver | null = null;
    let footerObserver: IntersectionObserver | null = null;

    if (featuresSection) {
      featuresObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When features section comes into view, hide particles
            // When features section leaves view (scrolling back up), show particles
            setIsInView(!entry.isIntersecting);
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px 0px 0px",
        },
      );

      featuresObserver.observe(featuresSection);
    }

    if (footerSection) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When footer comes into view, hide particles
            if (entry.isIntersecting) {
              setIsInView(false);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px 0px 0px",
        },
      );

      footerObserver.observe(footerSection);
    }

    return () => {
      observers.forEach((observer) => observer?.disconnect());
      featuresObserver?.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-white pt-8 md:pt-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="pt-8 md:pt-12 lg:pt-16">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="min-h-screen flex items-center py-12 md:py-16 lg:py-20"
            >
              <div
                className={`transition-all duration-1000 w-full max-w-3xl ${
                  activeIndex === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-20 translate-x-8"
                }`}
              >
                {section.isHero ? (
                  <>
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-10 leading-[1.1]">
                      {section.title}
                    </h1>

                    {/* Description */}
                    {section.description && (
                      <p className="text-xl md:text-2xl text-foreground/60 mb-12 leading-relaxed max-w-2xl">
                        {section.description}
                      </p>
                    )}

                    {/* CTA Button */}
                    <Button
                      size="lg"
                      className="bg-black text-white hover:bg-black/90 rounded-lg px-12 h-14 text-lg"
                      onClick={() => {
                        document
                          .getElementById("features")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                    >
                      GET STARTED
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-10 leading-[1.1]">
                      {section.title}
                    </h1>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single fixed particle system on the right side at midpoint */}
      <div
        className="fixed right-12 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none z-10 transition-opacity duration-500"
        style={{ opacity: isInView ? 1 : 0 }}
      >
        <div className="w-[450px] h-[450px] relative">
          <ParticleVisual color={sections[activeIndex].color} />

          {/* Decorative gradient */}
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
                  activeIndex === index
                    ? "w-12 bg-black"
                    : "w-8 bg-black/20"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}