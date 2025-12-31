import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react';

export function Waitlist() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setSubmitted(true);
    setIsLoading(false);
    setName('');
    setEmail('');
    setCompany('');
    setTitle('');
    
    // Reset after 7 seconds
    setTimeout(() => setSubmitted(false), 7000);
  };

  return (
    <section id="waitlist" className="px-6 py-40 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.02),transparent_50%)]"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[--color-orange]/10 to-[--color-orange]/5 border border-[--color-orange]/20 mb-10">
            <Shield className="w-4 h-4 text-[--color-orange]" />
            <span className="text-sm tracking-wide">Founding Partner Program · Q1 2026</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight leading-[1.1]">
            Join the founding
            <br />
            partner cohort
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed">
            Limited availability for organizations seeking to pilot enterprise AI coaching 
            infrastructure. Founding partners receive preferential pricing, dedicated implementation 
            support, and direct influence on product roadmap.
          </p>
        </div>
        
        {submitted ? (
          <Card className="p-20 text-center border-2 border-border/40 bg-white shadow-2xl max-w-3xl mx-auto">
            <div className="flex justify-center mb-10">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[--color-green] shadow-2xl animate-in zoom-in duration-500">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-4xl mb-6 tracking-tight">Application submitted successfully</h3>
            <p className="text-foreground/60 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Our partnership team will conduct a preliminary review of your application and reach out 
              within 48 hours to schedule a comprehensive platform demonstration and needs assessment.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/5 border border-black/10">
              <span className="text-sm text-foreground/60">Application ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
            </div>
          </Card>
        ) : (
          <Card className="p-16 border-2 border-border/40 bg-white shadow-2xl max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label htmlFor="name" className="text-base">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Dr. Sarah Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-14 border-2 focus:border-black transition-colors text-base"
                  />
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="email" className="text-base">Corporate Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="sarah.chen@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 border-2 focus:border-black transition-colors text-base"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label htmlFor="company" className="text-base">Organization *</Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Acme Corporation"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="h-14 border-2 focus:border-black transition-colors text-base"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="title" className="text-base">Job Title / Role *</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Chief Executive Officer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="h-14 border-2 focus:border-black transition-colors text-base"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-black text-white hover:bg-black/90 rounded-full h-16 text-lg shadow-xl hover:shadow-2xl transition-all group" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? 'Processing Application...' : 'Submit Partnership Application'}
                {!isLoading && <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </Button>
              
              <div className="grid md:grid-cols-3 gap-8 pt-10 border-t border-border/30">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[--color-green] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base mb-1.5">Dedicated CSM</p>
                    <p className="text-sm text-foreground/50 leading-relaxed">Assigned customer success manager</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[--color-green] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base mb-1.5">Priority Support</p>
                    <p className="text-sm text-foreground/50 leading-relaxed">24/7 white-glove assistance</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[--color-green] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base mb-1.5">Founding Pricing</p>
                    <p className="text-sm text-foreground/50 leading-relaxed">Locked-in preferential rates</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/[0.02] border border-black/10 rounded-2xl p-8 mt-8">
                <p className="text-sm text-foreground/60 leading-relaxed text-center">
                  By submitting this application, you acknowledge that you have read and agree to our{' '}
                  <a href="#" className="underline hover:text-foreground">Terms of Service</a>,{' '}
                  <a href="#" className="underline hover:text-foreground">Privacy Policy</a>, and{' '}
                  <a href="#" className="underline hover:text-foreground">Data Processing Agreement</a>.
                  All information is encrypted in transit and at rest using AES-256 encryption.
                </p>
              </div>
            </form>
          </Card>
        )}
      </div>
    </section>
  );
}