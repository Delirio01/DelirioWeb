import { Button } from './ui/button';
import { useIsMobile } from './ui/use-mobile';
import { Logo } from './logo';
import InstaIcon from '../imports/InstaIcon';
import XIcon from '../imports/XIcon';
import TikTokIcon from '../imports/TikTokIcon';
import { Link } from 'react-router-dom';
interface FitnessHeaderProps {
  whiteMode?: boolean;
}

export function FitnessHeader({ whiteMode = false }: FitnessHeaderProps) {
  // Use whiteMode to determine color classes
  const navText = whiteMode ? 'text-white/80 hover:text-white' : 'text-black/75 hover:text-black';
  const headerBg = whiteMode ? 'bg-black/80 border-white/10' : 'bg-white/50 border-black/5';
  const buttonClass = whiteMode
    ? 'bg-white text-black hover:bg-white/90'
    : 'bg-black text-white hover:bg-black/90';
  const isMobile = useIsMobile();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${headerBg} border-b`} >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-auto" style = {{paddingBlock: 4}}>
          <div className="hidden md:flex items-center gap-12">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to = "/">
              <Logo color={whiteMode ? 'white' : undefined} />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-12">
              <a href="#product" className={`${navText} transition-colors`}>
                Product
              </a>
              <a
                href="#footer"
                className={`${navText} transition-colors`}
                onClick={e => {
                  e.preventDefault();
                  try {
                    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                  } catch (err) {
                    // Optionally log or handle error
                    console.error('Scroll to footer failed:', err);
                  }
                }}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* CTA Button (hide on mobile) */}
          {!isMobile && (
            <Button
              className={`${buttonClass} rounded-lg px-8 h-11 font-[\'Big_Caslon\',serif]`}
              onClick={() => {
                try {
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                } catch (err) {
                  // Optionally log or handle error
                  console.error('Scroll to waitlist failed:', err);
                }
              }}
            >
              Join our waitlist
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}