import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ParticleVisualCanvas2D } from "./ParticleVisualCanvas2D";
import { defaultParticlePositions } from "./particle-defaults";
import { FitnessWaitlist } from "./FitnessWaitlist";
import IMessage from "../imports/imsg"
import WhatsApp from "../imports/whatsApp"
import Device from "../imports/device"
const typeWrittenTexts = [ 
  { 
    text: '',
    keyword: 'coach'
  }
]
 
const iMessageWhatsApp_icon_list = (
 <div className="flex flex-row items-center gap-8" style = {{justifyContent:"flex-start", paddingLeft: 0, display:"flex", flexDirection:"row", columnGap: 120,}}>
      <IMessage style={{ width: 100, height: 100 }} />
      <WhatsApp style={{ width: 100, height: 100 }} />
    </div>
);
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
    description: "Receive seamless feedback, know your body better, act with insights. Gain a true life long coach",
    color: "#FF6B35",
    isHero: true,
  },
  {
title: "Real time feedback during workouts through camera enabled workout lessons",
    color: "#FF6B35",
   
  },
  {
    title:
      "No schedule conflicts, no postponing. Plan without bottlenecks and access a truly 24/7 available coach",
    color: "#FF6B35",
  },
  {
    title:
      "A truly life long coach that fine tuners itself to you, allowing for long term fitness record keeping and better insigths of your fitness health longterm",
    color: "#FF6B35",
  },

  {
    title:<>
        Why stay limited to in app voice chat? You can access your coach beyond in app limits and add them to your Contacts and WhatsApp

    </>,
    color: "#FF6B35",
    extraComponent: iMessageWhatsApp_icon_list
  },
];

export type SectionVisibility = {
  featuresInView: boolean;
  footerInView: boolean;
  waitlistInView: boolean;
};

export function FitnessHeroWithScroll({
  onSectionVisibilityChange,
}: {
  onSectionVisibilityChange?: (v: SectionVisibility) => void;
}) {
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
    const waitListSection = document.getElementById("waitlist");
    let featuresObserver: IntersectionObserver | null = null;
    let footerObserver: IntersectionObserver | null = null;
    let waitListObserver: IntersectionObserver | null = null;


    // Track visibility of all hiding sections
    let featuresInView = false;
    let footerInView = false;
    let waitlistInView = false;

    const updateParticles = () => {
      setIsInView(!(featuresInView || footerInView || waitlistInView));
      if (onSectionVisibilityChange) {
        onSectionVisibilityChange({ featuresInView, footerInView, waitlistInView });
      }
    };

    if (featuresSection) {
      featuresObserver = new IntersectionObserver(
        (entries) => {
          featuresInView = entries.some(e => e.isIntersecting);
          updateParticles();
        },
        { threshold: 0.2, rootMargin: "0px" }
      );
      featuresObserver.observe(featuresSection);
    }
    if (footerSection) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          footerInView = entries.some(e => e.isIntersecting);
          updateParticles();
        },
        { threshold: 0.0, rootMargin: "0px" }
      );
      footerObserver.observe(footerSection);
    }
    if (waitListSection) {
      waitListObserver = new IntersectionObserver(
        (entries) => {
          waitlistInView = entries.some(e => e.isIntersecting);
          updateParticles();
        },
        { threshold: 0.0, rootMargin: "0px" }
      );
      waitListObserver.observe(waitListSection);
    }

    return () => {
      observers.forEach((observer) => observer?.disconnect());
      featuresObserver?.disconnect();
      footerObserver?.disconnect();
      waitListObserver?.disconnect();
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
              ref={el => { sectionRefs.current[index] = el; }}
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
                      <span className="font-[\'Big_Caslon\',serif]">Joint our waitlist</span>
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
          <ParticleVisualCanvas2D color={sections[activeIndex].color} particleCount={defaultParticlePositions.length} nodeScale={0.7} />

          {/* Decorative gradient */}
          <div
            className="absolute inset-0 rounded-full blur-3xl -z-10 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${sections[activeIndex].color}15 0%, transparent 70%)`,
            }}
          ></div>

          {/* Progress indicator */}
          {/*
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
      */}


        </div>
      </div>
    </section>
  );
}