function LogoCircles() {
  return (
    <svg width="47" height="56" viewBox="0 0 46.5068 55.2368" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(45deg)' }}>
      <g clipPath="url(#clip0_19_1608_footer)">
        <circle cx="21.5094" cy="41.6439" r="8.18715" fill="white" stroke="white" strokeWidth="5" transform="rotate(-19.0742 21.5094 41.6439)" />
        <circle cx="8.25821" cy="26.7979" r="3.99287" fill="white" stroke="white" strokeWidth="5" transform="rotate(-19.0742 8.25821 26.7979)" />
        <circle cx="38.2892" cy="28.8396" r="3.96088" fill="white" stroke="white" strokeWidth="5" transform="rotate(-19.0742 38.2892 28.8396)" />
        <circle cx="25.3349" cy="14.6024" r="8.98088" fill="white" stroke="white" strokeWidth="5" transform="rotate(-19.0742 25.3349 14.6024)" />
      </g>
      <defs>
        <clipPath id="clip0_19_1608_footer">
          <rect fill="white" height="55.2368" width="46.5068" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function FitnessFooter() {
  return (
    <footer id="footer" className="bg-black">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-12">
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-4">
              <LogoCircles />
              <p className="text-white/60 text-sm">© 2025 Delirio</p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="space-y-2">
                <p className="text-white/40 uppercase tracking-wider text-xs">Product</p>
                <a href="#features" className="block text-white/80 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">
                  How it works
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-white/40 uppercase tracking-wider text-xs">Company</p>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">
                  About us
                </a>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-white/80 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
