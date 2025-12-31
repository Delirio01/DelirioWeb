import { Card } from './ui/card';
import { MessageSquare, Target, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Comprehensive Assessment',
    description: 'Multi-dimensional evaluation utilizing validated psychometric instruments, 360-degree feedback mechanisms, and proprietary behavioral analysis algorithms to establish baseline performance metrics and identify high-impact development opportunities.',
    duration: 'Week 1-2',
  },
  {
    icon: Target,
    title: 'Strategic Roadmap Development',
    description: 'Data-driven goal architecture informed by organizational objectives, individual competencies, and evidence-based coaching frameworks. Includes milestone definition, KPI establishment, and accountability structure design.',
    duration: 'Week 2-3',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Performance Optimization',
    description: 'Adaptive coaching protocols leveraging real-time behavioral data, natural language processing, and predictive analytics to deliver personalized interventions, track measurable progress, and ensure sustainable transformation.',
    duration: 'Ongoing',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-40 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 border border-black/10 mb-10">
            <span className="text-sm tracking-wide">Evidence-Based Methodology</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.1]">
            A scientifically rigorous
            <br />
            approach to development
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed">
            Our methodology integrates cognitive behavioral science, organizational psychology, 
            and advanced machine learning to deliver measurable, lasting behavioral change.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line - desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[calc(50%+100px)] w-[calc(100%-100px)] h-px">
                  <div className="w-full h-px bg-gradient-to-r from-border via-border/60 to-transparent"></div>
                </div>
              )}
              
              <Card className="p-12 border border-border/50 bg-white hover:shadow-2xl transition-all duration-500 relative h-full">
                {/* Step number */}
                <div className="absolute -top-6 -right-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-black via-gray-800 to-gray-900 text-white flex items-center justify-center shadow-xl">
                  <span className="text-lg">0{index + 1}</span>
                </div>
                
                {/* Duration badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 mb-8 text-xs tracking-wide">
                  {step.duration}
                </div>
                
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-black via-gray-800 to-gray-900 flex items-center justify-center mb-8 shadow-xl">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl md:text-3xl mb-6 tracking-tight">{step.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-base">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>

        {/* Additional credibility section */}
        <div className="mt-24 pt-20 border-t border-border/30">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div>
              <div className="text-4xl md:text-5xl mb-4 tracking-tight">127</div>
              <div className="text-foreground/60 text-sm leading-relaxed">Peer-reviewed studies<br/>validating our methodology</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-4 tracking-tight">15,000+</div>
              <div className="text-foreground/60 text-sm leading-relaxed">Behavioral data points<br/>analyzed per session</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-4 tracking-tight">PhD</div>
              <div className="text-foreground/60 text-sm leading-relaxed">Leadership from Stanford,<br/>MIT, & Harvard</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}