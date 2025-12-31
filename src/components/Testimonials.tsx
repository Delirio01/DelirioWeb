import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Star, Quote, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Rebecca Winters',
    role: 'Chief Executive Officer',
    company: 'Axiom Therapeutics',
    content: 'The quantitative rigor is unprecedented. Within 90 days, we observed a 47% reduction in decision latency across C-suite executives and a 3.2x improvement in strategic alignment scores. The platform\'s behavioral analytics have fundamentally transformed our leadership development infrastructure.',
    initials: 'RW',
    rating: 5,
    metric: '47% faster decision velocity',
  },
  {
    name: 'James Chen, CFA',
    role: 'Managing Director & Head of Investments',
    company: 'Vanguard Capital Partners',
    content: 'As a fiduciary, ROI validation is paramount. Cohere delivered a documented 8.7x return on our coaching investment through improved portfolio management decisions and enhanced team performance metrics. The integration with our existing analytics stack was seamless.',
    initials: 'JC',
    rating: 5,
    metric: '8.7x documented ROI',
  },
  {
    name: 'Dr. Aisha Patel',
    role: 'SVP of Product & Engineering',
    company: 'Horizon AI Systems',
    content: 'The technical architecture mirrors our own standards for production ML systems. What distinguishes Cohere is the synthesis of rigorous computer science with validated psychological frameworks. Our engineering leadership NPS increased 42 points in six months.',
    initials: 'AP',
    rating: 5,
    metric: '+42 NPS improvement',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-40 bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 border border-black/10 mb-10">
            <span className="text-sm tracking-wide">Executive Testimonials</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.1]">
            Validated by industry
            <br />
            pioneers and innovators
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed">
            Leaders at Fortune 500 companies, top-tier investment firms, and high-growth 
            technology organizations rely on Cohere for mission-critical development outcomes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-12 border-2 border-border/40 bg-white hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden">
              {/* Decorative quote */}
              <Quote className="absolute top-8 right-8 w-16 h-16 text-black/5" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-8 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[--color-orange] text-[--color-orange]" />
                ))}
              </div>
              
              {/* Metric badge */}
              <div className="inline-flex self-start items-center gap-2 px-4 py-2 rounded-full bg-[--color-green]/10 border border-[--color-green]/20 mb-8">
                <span className="text-sm text-[--color-green]">{testimonial.metric}</span>
              </div>
              
              {/* Content */}
              <p className="text-foreground/70 leading-relaxed text-base mb-10 flex-grow relative z-10">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-start gap-5 pt-8 border-t border-border/30 relative z-10">
                <Avatar className="w-14 h-14 rounded-2xl ring-2 ring-black/5">
                  <AvatarFallback className="bg-gradient-to-br from-black via-gray-800 to-gray-900 text-white rounded-2xl text-base">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="mb-1 truncate text-base">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60 leading-snug">{testimonial.role}</p>
                  <p className="text-sm text-foreground/40 mt-1">{testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Case study CTA */}
        <div className="mt-20 text-center">
          <p className="text-foreground/60 mb-6 text-lg">
            Read detailed case studies and implementation reports
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-lg hover:gap-3 transition-all">
            <span>View All Success Stories</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}