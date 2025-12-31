import { FitnessHeader } from './components/FitnessHeader';
import { FitnessHeroWithScroll } from './components/FitnessHeroWithScroll';
import { FitnessFeatures } from './components/FitnessFeatures';
import { FitnessWaitlist } from './components/FitnessWaitlist';
import { FitnessFooter } from './components/FitnessFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <FitnessHeader />
      <FitnessHeroWithScroll />
      <FitnessFeatures />
      <FitnessWaitlist />
      <FitnessFooter />
    </div>
  );
}