import { useState } from 'react';
import { FitnessHeader } from './components/FitnessHeader';
import { FitnessHeroWithScroll, SectionVisibility } from './components/FitnessHeroWithScroll';
import { FitnessFeatures } from './components/FitnessFeatures';
import { FitnessWaitlist } from './components/FitnessWaitlist';
import { FitnessFooter } from './components/FitnessFooter';

export default function App() {
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    featuresInView: false,
    footerInView: false,
    waitlistInView: false,
  });

  // Header should be white when either waitlist or footer is in view
  const headerWhite = sectionVisibility.footerInView;

  return (
    <div className="min-h-screen bg-white">
      <FitnessHeader whiteMode={headerWhite} />
      <FitnessHeroWithScroll onSectionVisibilityChange={setSectionVisibility} />
      <FitnessFeatures />
      <FitnessWaitlist />
      <FitnessFooter />
    </div>
  );
}