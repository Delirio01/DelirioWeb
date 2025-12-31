import { Separator } from './ui/separator';
import { Linkedin, Twitter, Mail, FileText, Building2 } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="px-6 py-32 bg-gradient-to-b from-gray-900 via-black to-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 mb-24">
          {/* Logo and Tagline */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>
              <div>
                <span className="tracking-tight text-2xl">COHERE</span>
                <div className="text-[10px] text-white/40 tracking-wider -mt-0.5">ENTERPRISE</div>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed mb-10 max-w-md text-base">
              Enterprise-grade AI coaching platform delivering measurable behavioral transformation 
              through the convergence of machine learning and organizational psychology.
            </p>
            
            {/* Contact */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-white/60">
                <Mail className="w-5 h-5" />
                <a href="mailto:partnerships@cohere.ai" className="hover:text-white transition-colors">
                  partnerships@cohere.ai
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Building2 className="w-5 h-5" />
                <span>San Francisco, CA · New York, NY</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-105 shadow-lg">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-105 shadow-lg">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-105 shadow-lg">
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-3 gap-12">
            <div>
              <h4 className="mb-8 text-white text-base">Platform</h4>
              <ul className="space-y-5 text-white/60 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features & Capabilities</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Methodology</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security & Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-8 text-white text-base">Resources</h4>
              <ul className="space-y-5 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Technical Documentation</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-8 text-white text-base">Company</h4>
              <ul className="space-y-5 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Cohere</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Leadership Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press & Media</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Sales</a></li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="mb-12 bg-white/10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-white/50 text-sm">
          <p>
            © {new Date().getFullYear()} Cohere Technologies, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-8 justify-center">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Data Processing Agreement</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="mt-12 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-8 text-white/40 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
              <span className="text-[10px]">✓</span>
            </div>
            <span>SOC 2 Type II</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
              <span className="text-[10px]">✓</span>
            </div>
            <span>ISO 27001</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
              <span className="text-[10px]">✓</span>
            </div>
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
              <span className="text-[10px]">✓</span>
            </div>
            <span>HIPAA Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}