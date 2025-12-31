import { FitnessHeader } from './components/FitnessHeader';
import { FitnessHeroWithScroll } from './components/FitnessHeroWithScroll';
import { FitnessFeatures } from './components/FitnessFeatures';
import { FitnessWaitlist } from './components/FitnessWaitlist';

export default function FitnessApp() {
  return (
    <div className="min-h-screen bg-white">
      <FitnessHeader />
      <FitnessHeroWithScroll />
      <FitnessFeatures />
      <FitnessWaitlist />
    </div>
  );
}
