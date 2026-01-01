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
      <h3 className="font-semibold text-lg mb-2 text-left">{feature.title}</h3>
      <p className="text-base text-black/60 leading-snug text-left">{feature.description}</p>
    </div>
  );
}
import {
  ShieldCheck,
  Zap,
  Gauge,
  Award,
  Lightbulb,
} from "lucide-react";

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

export function FitnessFeatures() {
  return (
    <section
      id="features"
      className="bg-white py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
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