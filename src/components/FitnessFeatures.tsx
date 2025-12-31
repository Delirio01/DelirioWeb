import {
  Dumbbell,
  Zap,
  Shield,
  Users,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Dumbbell,
    title: "Real-Time Form Analysis",
    description:
      "AI-powered computer vision tracks your movements and provides instant feedback on your exercise form to prevent injuries.",
  },
  {
    icon: Zap,
    title: "Adaptive Training Plans",
    description:
      "Personalized workout programs that evolve with your progress, adjusting difficulty and volume based on your performance.",
  },
  {
    icon: Shield,
    title: "Privacy-First Technology",
    description:
      "All analysis happens on-device in real-time. Your workout data is never stored or transmitted to external servers.",
  },
  {
    icon: Users,
    title: "Accessible for All Levels",
    description:
      "Designed for beginners to advanced athletes with intuitive guidance and progressive difficulty scaling.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Comprehensive metrics and visualizations show your strength gains, endurance improvements, and consistency trends.",
  },
];

export function FitnessFeatures() {
  return (
    <section
      id="features"
      className="bg-white py-32"
      style={{

      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-20 leading-[1.1] text-center max-w-4xl mx-auto">
          Getting back in shape has never been more accessible
        </h2>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-start"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-black" />
                </div>

                {/* Title */}
                <h3 className="text-2xl mb-4 tracking-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}