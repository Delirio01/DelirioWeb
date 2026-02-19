import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FitnessHeader } from './components/FitnessHeader';
import { FitnessHeroWithScroll, SectionVisibility } from './components/FitnessHeroWithScroll';
import FitnessFeatures from './components/FitnessFeatures';
import { FitnessWaitlist } from './components/FitnessWaitlist';
import { FitnessFooter } from './components/FitnessFooter';
import TermsServices from './components/TermsServices';
import PrivacyPolicy from './components/PrivacyPolicy';
import MessagingOptIn from './components/MessagingOptIn';
import { fetchWaitlistCount } from './utils/fetchWaitlistCount';

import DefaultState from "./imports/default"
import Landing from './pages/Landing';
//import {ReactComponent as taregtState} from "./imports/deafault.svg"

export default function App() {
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    featuresInView: false,
    footerInView: false,
    waitlistInView: false,
  });
  const headerWhite = sectionVisibility.waitlistInView || sectionVisibility.footerInView;

  // Waitlist count state and loading
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    fetchWaitlistCount().then(setWaitlistCount);
  }, []);

  if (waitlistCount === null) {
    // Optionally, show a loading spinner or skeleton
    return <div className="min-h-screen flex items-center justify-center bg-white text-xl">Loading...</div>;
  }

  return (
    <BrowserRouter>
                <div className="min-h-screen bg-white" style = {{overflow: "hidden"}}>

      <Routes>
        <Route
          path="/"
          element={
            <Landing/>
          }
        />
        <Route path="/terms" element={<TermsServices/>} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/sms-signup" element={<MessagingOptIn />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}
