import { Button } from './ui/button';
import { Logo } from './logo';

export function FitnessHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/50 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <a href="#product" className="text-black/75 hover:text-black transition-colors">
              Product
            </a>
            <a href="#contact" className="text-black/75 hover:text-black transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <Button 
            className="bg-black text-white hover:bg-black/90 rounded-lg px-8 h-11"
            onClick={() => {
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Join our waitlist
          </Button>
        </div>
      </div>
    </header>
  );
}