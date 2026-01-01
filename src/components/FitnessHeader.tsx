import React, { useState, useEffect } from 'react';
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

// Animated number component for counter
function AnimatedNumber({ value, colorClass }: { value: number, colorClass?: string }) {
  const [display, setDisplay] = React.useState(value);
  const [fade, setFade] = React.useState(false);
  React.useEffect(() => {
    if (value !== display) {
      setFade(true);
      const timeout = setTimeout(() => {
        setDisplay(value);
        setFade(false);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [value, display]);
  return (
    <span
      className={`${colorClass} transition-all duration-300 font-extrabold text-black leading-none ${fade ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'} text-3xl md:text-5xl lg:text-6xl`}
      style={{ fontWeight: 450 }}
    >
      {display}
    </span>
  );
}

export function FitnessHeader({ whiteMode = false, initialCount }: FitnessHeaderProps & { initialCount?: number }) {
  // Use whiteMode to determine color classes
  const navText = whiteMode ? 'text-white/80 hover:text-white' : 'text-black/75 hover:text-black';
  const headerBg = whiteMode ? 'bg-black/80 border-white/10' : 'bg-white/50 border-black/5';
  const buttonClass = whiteMode
    ? 'bg-white text-black hover:bg-white/90'
    : 'bg-black text-white hover:bg-black/90';
  const isMobile = useIsMobile();
  const [foundingUsers, setFoundingUsers] = useState(initialCount ?? 100);

  // Fetch waitlist count from SheetDB (refresh after mount, but use initialCount for first render)
  useEffect(() => {
    async function fetchWaitlistCount() {
      try {
        const res = await fetch('https://sheetdb.io/api/v1/5czb7k07maksm');
        const data = await res.json();
        if (Array.isArray(data)) {
          setFoundingUsers(data.length);
        }
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchWaitlistCount();
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${headerBg} border-b`} style={{height: 90}}>
      <div className="max-w-7xl mx-auto px-6 relative" style={{height: 90}}>
     
        <div className="flex items-center justify-between h-auto" style = {{paddingBlock: 4, height: 90}}>
          
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
          
              {/* Centered counter translate(-52%, -50%) RIGHT IN BETWEEN / INSIDE THE GAP!*/}
        <div className="" style={{position: "relative", transform: '', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', columnGap: 10, backgroundColor: "transparent", width: "100%", alignSelf:"center", alignContent:"center", textAlign:"center"}}>
          <span style={{fontSize: 24, marginBottom: 0, fontWeight:300, alignSelf: ""}} className={`text-xl font-normal underline underline-offset-4 ${whiteMode ? "text-white" : "text-black"}`}>waitlisted</span>
          <AnimatedNumber value={foundingUsers}  colorClass={whiteMode ? "text-white" : "text-black"}/>
          <span className="flex flex-col text-left">
            <span style={{fontSize: 24, marginBottom: 0, fontWeight:300}} className={`text-xl font-normal underline underline-offset-4 ${whiteMode ? "text-white" : "text-black"}`}>and counting</span>
          </span>
          {
            /*         
             <Button onClick={() => setFoundingUsers(foundingUsers + 1)} className="ml-4 bg-green-600 text-white hover:bg-green-700">Test: Add User</Button>
              */
          }
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
