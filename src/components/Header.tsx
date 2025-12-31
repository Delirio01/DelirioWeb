import { Button } from './ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <span className="tracking-tight text-xl">COHERE</span>
              <div className="text-[9px] text-foreground/40 tracking-wider -mt-0.5">ENTERPRISE</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <a href="#how-it-works" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Methodology
            </a>
            <a href="#features" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Platform
            </a>
            <a href="#testimonials" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Case Studies
            </a>
            <a href="#contact" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <Button 
            className="bg-black text-white hover:bg-black/90 rounded-full px-8 h-12 text-sm shadow-lg hover:shadow-xl transition-all"
            onClick={() => {
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Apply for Partnership
          </Button>
        </div>
      </div>
    </header>
  );
}