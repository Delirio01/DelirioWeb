import { Card } from './ui/card';
import { Shield, Clock, Brain, BarChart3, Lightbulb, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Enterprise Reliability',
    description: 'Mission-critical infrastructure with 99.99% uptime guarantee, multi-region failover, and real-time system health monitoring. Deployed across globally distributed data centers with automatic scaling.',
  },
  {
    icon: Clock,
    title: 'Intelligent Responsiveness',
    description: 'Sub-second response times powered by edge computing and advanced caching architectures. Natural language processing enables context-aware interactions with human-level comprehension.',
  },
  {
    icon: Brain,
    title: 'Predictive Insight Generation',
    description: 'Proprietary machine learning models trained on 10M+ coaching interactions. Delivers actionable recommendations through pattern recognition, sentiment analysis, and longitudinal trend identification.',
  },
  {
    icon: BarChart3,
    title: 'Systematic Structure',
    description: 'Hierarchical goal decomposition frameworks based on OKR methodology and SMART criteria. Automated progress tracking with variance analysis and proactive intervention triggering.',
  },
  {
    icon: Lightbulb,
    title: 'Radical Clarity',
    description: 'Multi-modal communication optimized for executive decision-making. Complex insights distilled into executive summaries, data visualizations, and scenario modeling with probabilistic outcomes.',
  },
  {
    icon: Sparkles,
    title: 'Validated Confidence Building',
    description: 'Behavioral reinforcement protocols grounded in cognitive psychology and neuroscience. Tracks self-efficacy metrics and delivers evidence-based interventions to accelerate leadership presence.',
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-40 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 border border-black/10 mb-10">
            <span className="text-sm tracking-wide">Platform Capabilities</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.1]">
            Enterprise architecture
            <br />
            meets human psychology
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed">
            Every capability is engineered to deliver measurable performance improvements 
            through the convergence of behavioral science and distributed systems design.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-12 border-2 border-border/40 hover:border-border/80 hover:shadow-2xl transition-all duration-500 bg-white group relative overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-black via-gray-800 to-gray-900 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-5 tracking-tight">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-base">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Technical specifications */}
        <div className="mt-24 pt-20 border-t border-border/30">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl mb-4 tracking-tight">Built on proven technology</h3>
            <p className="text-foreground/60 text-lg">Infrastructure specifications and performance benchmarks</p>
          </div>
          <div className="grid md:grid-cols-4 gap-10">
            <div className="text-center">
              <div className="text-3xl mb-3 tracking-tight">&lt; 100ms</div>
              <div className="text-sm text-foreground/60">P95 response latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3 tracking-tight">256-bit</div>
              <div className="text-sm text-foreground/60">AES encryption at rest</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3 tracking-tight">ISO 27001</div>
              <div className="text-sm text-foreground/60">Certified ISMS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3 tracking-tight">Multi-AZ</div>
              <div className="text-sm text-foreground/60">Geographic redundancy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}