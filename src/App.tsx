import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FitnessHeader } from './components/FitnessHeader';
import { FitnessHeroWithScroll, SectionVisibility } from './components/FitnessHeroWithScroll';
import { FitnessFeatures } from './components/FitnessFeatures';
import { FitnessWaitlist } from './components/FitnessWaitlist';
import { FitnessFooter } from './components/FitnessFooter';
import TermsServices from './components/TermsServices';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    featuresInView: false,
    footerInView: false,
    waitlistInView: false,
  });
  const headerWhite = sectionVisibility.footerInView;

  return (
       
    <BrowserRouter>
      <Routes>
   
        <Route
          path="/"
          element={
                <div className="min-h-screen bg-white">
              <FitnessHeader whiteMode={headerWhite} />
              <FitnessHeroWithScroll onSectionVisibilityChange={setSectionVisibility} />
              <FitnessFeatures />
              <FitnessWaitlist />
              <FitnessFooter />
            </div>
          }
        />
           

        <Route path="/terms" element={<TermsServices />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
          
      </Routes>
 
    </BrowserRouter>
    
  );
}