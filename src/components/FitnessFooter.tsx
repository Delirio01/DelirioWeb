import { Logo } from './logo';
import InstaIcon from '../imports/InstaIcon';
import TikTokIcon from '../imports/TikTokIcon';
import XIcon from '../imports/XIcon';


import { useState } from 'react';
import { Link } from 'react-router-dom';

export function FitnessFooter({ onNavigate }: { onNavigate?: (page: 'main' | 'terms' | 'privacy') => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Delirio.0fficial0@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <footer id="footer" className="bg-black">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-12">
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo & Copyright */}
            <div className="flex flex-col items-center gap-2">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <Logo color="white" width="40" height="40" />
                <div className='flex items-center gap-2'>
                  <a href="https://www.instagram.com/delirio__official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstaIcon color="white" />
                  </a>
                  <a href="https://www.tiktok.com/@delirio__official" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <TikTokIcon color="white" />
                  </a>
                  <a href="https://x.com/Delirio1_" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                    <XIcon color="white" />
                  </a>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-1">© 2026 Delirio</p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">

                    <div className="space-y-2">
                <p className="text-white/40 uppercase tracking-wider text-xs">Contacts</p>
                <a
                href="mailto:Delirio.0fficial0@gmail.com"
                //  type="button"
                 // onClick={handleCopyEmail}
                  className="block text-white/80 hover:text-white transition-colors underline cursor-pointer focus:outline-none"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  Email
                </a>


                {copied && (
                  <span className="ml-2 text-green-400 text-xs">Copied!</span>
                )}
                <a href="https://calendly.com/amiralsad/rush-advice" className="block text-white/80 hover:text-white transition-colors">
                  Calendly <br/> Appointment
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-white/40 uppercase tracking-wider text-xs">Product</p>
                <a href="#fitness-features" className="block text-white/80 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="block text-white/80 hover:text-white transition-colors">
                  How it works
                </a>
              </div>


              <div className="space-y-2">
                <p className="text-white/40 uppercase tracking-wider text-xs">Company</p>
                <a href="/" className="block text-white/80 hover:text-white transition-colors">
                  About us
                </a>
                <Link
                  to="/privacy"
                  className="block text-white/80 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="block text-white/80 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
