
import React, { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import {
  ShieldCheck,
  Zap,
  Gauge,
  Award,
  Lightbulb,
} from "lucide-react";
import DemoVoiceSession from './DemoVoiceSession';

// FeatureCard component for rendering each feature
type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
    return (
      <div
        className="rounded-2xl border border-black/10 bg-white px-8 py-8 shadow-sm flex flex-col items-start transition-transform transition-shadow duration-200 ease-in-out hover:shadow-lg hover:-translate-y-2 hover:scale-105"
        style={{ width: 240, paddingInline: 20, paddingBlock: 32 }}
      >
      <div className="w-10 h-10 mb-4 flex items-center justify-start">
        <Icon className="w-7 h-7 text-black" />
      </div>
      <h3 style={{fontWeight: "700"}} className="text-lg mb-2 text-left">{feature.title}</h3>
      <p className="text-base text-black/60 leading-snug text-left">{feature.description}</p>
    </div>
  );
}
const features = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "Consistent, dependable coaching infrastructure built for continuous support and unwavering accountability.",
  },
  {
    icon: Zap,
    title: "Responsiveness",
    description:
      "Immediate guidance available around the clock, ensuring you never face challenges alone.",
  },
  {
    icon: Gauge,
    title: "Continuous Optimization",
    description:
      "Maintain momentum through daily insights, progress tracking, and adaptive coaching that evolves based on your performance and feedback.",
  },
  {
    icon: Award,
    title: "Confidence",
    description:
      "Build lasting self-assurance through validated progress and evidence-based growth strategies",
  },
  {
    icon: Lightbulb,
    title: "Clarity",
    description:
      "Crystal-clear communication and transparent processes that eliminate ambiguity and drive focused action.",
  },
];


function FitnessFeatures() {
  // Grid settings
  const gridSize = 40;
  const width = 800;
  const [height, setHeight] = useState(2000);
  const cols = Math.floor(width / gridSize) + 1;
  const rows = Math.floor(height / gridSize) + 1;

  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Dynamically track section height so the grid covers the full section
  useEffect(() => {
    if (!sectionRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const sectionHeight = entry.contentRect.height;
        // Scale viewBox height proportionally to the aspect ratio
        const scaled = Math.round((sectionHeight / entry.contentRect.width) * width);
        setHeight(Math.max(scaled*1.25, 2000));
      }
    });
    ro.observe(sectionRef.current);
    return () => ro.disconnect();
  }, []);

  // Mouse move handler for interactive grid
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * width;
    const y = ((e.clientY - rect.top) / rect.height) * height;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => setMouse(null);

  // Hill effect function (Gaussian bump)
  function getZ(x: number, y: number) {
    if (!mouse) return 0;
    const dx = x - mouse.x;
    const dy = y - mouse.y;
    const distSq = dx * dx + dy * dy;
    const sigma = 120; // controls width of hill
    const amplitude = 32; // max height in px
    return amplitude * Math.exp(-distSq / (2 * sigma * sigma));
  }

  // Generate grid lines with hill effect and fading opacity from center
  const gridLines: ReactElement[] = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

  // Vertical lines
  for (let c = 0; c < cols; c++) {
    const x = c * gridSize;
    let path = '';
    for (let r = 0; r < rows; r++) {
      const y = r * gridSize;
      const z = getZ(x, y);
      if (r === 0) {
        path = `M ${x} ${y - z}`;
      } else {
        path += ` L ${x} ${y - z}`;
      }
    }
    // Fade opacity based on distance from center (vertical line: use x)
    const dist = Math.abs(x - centerX);
  const opacity = 1 - 0.9 * (dist / centerX); // 1 at center, 0.1 at edge
    gridLines.push(
      <path key={`v-${c}`} d={path} stroke="#e5e7eb" strokeWidth="1" fill="none" style={{ opacity }} />
    );
  }
  // Horizontal lines
  for (let r = 0; r < rows; r++) {
    const y = r * gridSize;
    let path = '';
    for (let c = 0; c < cols; c++) {
      const x = c * gridSize;
      const z = getZ(x, y);
      if (c === 0) {
        path = `M ${x} ${y - z}`;
      } else {
        path += ` L ${x} ${y - z}`;
      }
    }
    // Fade opacity based on distance from center (horizontal line: use y)
    const dist = Math.abs(y - centerY);
  const opacity = 1 - 0.9 * (dist / centerY); // 1 at center, 0.1 at edge
    gridLines.push(
      <path key={`h-${r}`} d={path} stroke="#e5e7eb" strokeWidth="1" fill="none" style={{ opacity }} />
    );
  }

  return (
    <section
  id="fitness-features"
      className="bg-white py-32 relative overflow-hidden"

      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 1}}
    >
      {/* Interactive 3D Hill Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      >
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {gridLines}
        </svg>
      </div>


      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
        {/* Heading */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-20 leading-[1.1] text-center max-w-4xl mx-auto">
          Feedback has never been more accesible
        </h2>
        {/* Features Grid - 3 on top, 2 on bottom */}
        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          {/* Top Row - 3 cards */}
          <div className="flex flex-wrap justify-center gap-12">
            {features.slice(0, 3).map((feature, idx) => (
              <FeatureCard key={idx} feature={feature}/>
            ))}
          </div>

          

          {/* Bottom Row - 2 cards centered */}
          <div className="flex flex-wrap justify-center gap-12">
            {features.slice(3, 5).map((feature, idx) => (
              <FeatureCard key={idx + 3} feature={feature} />
            ))}
          </div>

          
        </div>

      </div>




    </section>
  );
}

export default FitnessFeatures;