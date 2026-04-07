import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Mic,
  MoveRight,
  SendHorizontal,
  Smartphone,
  Volume2,
} from 'lucide-react';
import { Logo } from '../components/logo';
import { LandingSiteFooter } from '../components/LandingSiteFooter';
import { LandingSiteHeader } from '../components/LandingSiteHeader';
import LandingBackgroundLines from '../components/LandingBackgroundLines';
import appStoreBadge from '../images/appleOfficialBadges/Mobile app store badge.svg';
import irisDefault from '../images/emojis/Iris/Iris_default_1.png';
import irisSpeaking from '../images/emojis/Iris/Iris_botSpeaking_1.png';
import irisSpeakingAlt from '../images/emojis/Iris/Iris_botSpeaking_2.png';
import irisConnecting from '../images/emojis/Iris/Iris_connecting_1.png';
import irisListening from '../images/emojis/Iris/Iris_micLive_1.png';
import irisLive from '../images/emojis/Iris/Iris_micLive_6.png';
import reedDefault from '../images/emojis/Reed/Reed_default_1.png';
import reedSpeaking from '../images/emojis/Reed/Reed_botSpeaking_1.png';
import reedSpeakingAlt from '../images/emojis/Reed/Reed_botSpeaking_2.png';
import reedDisconnected from '../images/emojis/Reed/Reed_disconnected_1.png';
import reedLive from '../images/emojis/Reed/Reed_micLive_2.png';
import coachSelectionReed from '../images/iMocksImages/iMockup - iPhone 14.png';
import coachSelectionIris from '../images/iMocksImages/iMockup - iPhone 14-1.png';
import splitRest from '../images/iMocksImages/iMockup - iPhone 14-2.png';
import exerciseLibrary from '../images/iMocksImages/iMockup - iPhone 14-3.png';
import activityList from '../images/iMocksImages/iMockup - iPhone 14-4.png';
import messagingLeft from '../images/iMocksImages/iMockup - iPhone 15.png';
import messagingRight from '../images/iMocksImages/iMockup - iPhone 16.png';
import { useTextChat } from '../hooks/useTextChat';
import { useVoiceSession } from '../hooks/useVoiceSession';
import { generateDiscoveryId } from '../utils/pipecatConfig';
import '../styles/landing-redesign.css';

type ClusterNode = {
  kind?: 'image' | 'text';
  src?: string;
  text?: string;
  top: string;
  left: string;
  size: number;
  rotate?: number;
  opacity?: number;
};

type FaqCategory = 'ACTIVITIES' | 'TRAINERS' | 'WORKOUTS' | 'SUBSCRIPTIONS';

type FaqItem = {
  question: string;
  answer: string;
};

type ComparisonItem = {
  icon: string;
  text: string;
};

type Testimonial = {
  name: string;
  meta: string;
  body: string;
  avatar: string;
};

type CoachId = 'iris' | 'reed';

type InteractionMode = 'voice' | 'text';

type CoachProfile = {
  name: string;
  accent: 'pink' | 'blue';
  avatar: string;
  blurb: string;
  voicePrompt: string;
  textPrompt: string;
};

type WaveSection =
  | 'hero'
  | 'features'
  | 'messaging'
  | 'workouts'
  | 'testimonials'
  | 'comparison'
  | 'personalities'
  | 'subscription'
  | 'faq';

type WaveLineMotion = {
  blueAmp: number;
  pinkAmp: number;
  blueShiftX: number;
  blueShiftY: number;
  pinkShiftX: number;
  pinkShiftY: number;
  blueScaleX: number;
  pinkScaleX: number;
  blueRotate: number;
  pinkRotate: number;
  bluePath?: string;
  pinkPath?: string;
};

const heroNodes: ClusterNode[] = [
  { src: irisDefault, top: '12%', left: '16%', size: 128, rotate: -2 },
  { kind: 'text', text: '\u{1F4A1}', top: '10%', left: '34%', size: 32 },
  { src: irisSpeaking, top: '18%', left: '74%', size: 106, rotate: 2 },
  { src: reedSpeakingAlt, top: '30%', left: '34%', size: 86, rotate: -5 },
  { src: irisSpeakingAlt, top: '40%', left: '57%', size: 240, rotate: -1 },
  { src: reedDefault, top: '48%', left: '14%', size: 80, rotate: 4 },
  { src: reedLive, top: '47%', left: '86%', size: 76, rotate: -3 },
  { src: irisConnecting, top: '60%', left: '30%', size: 210, rotate: -3 },
  { src: reedDisconnected, top: '66%', left: '56%', size: 102, rotate: -2 },
  { src: irisDefault, top: '72%', left: '12%', size: 88, rotate: -6 },
  { src: reedSpeaking, top: '78%', left: '86%', size: 112, rotate: -2 },
  { src: irisLive, top: '88%', left: '44%', size: 154, rotate: 1 },
];

const subscriptionNodes: ClusterNode[] = [
  { src: reedSpeaking, top: '32%', left: '22%', size: 84, rotate: -4 },
  { src: irisConnecting, top: '20%', left: '38%', size: 58, rotate: -6 },
  { kind: 'text', text: '\u{1F4A1}', top: '20%', left: '44%', size: 24 },
  { src: irisSpeakingAlt, top: '17%', left: '68%', size: 72, rotate: 2 },
  { src: irisSpeaking, top: '33%', left: '75%', size: 96, rotate: -2 },
  { src: reedDefault, top: '44%', left: '87%', size: 70, rotate: 6 },
  { src: reedDisconnected, top: '57%', left: '12%', size: 72, rotate: -6 },
  { src: irisLive, top: '64%', left: '27%', size: 88, rotate: 5 },
  { src: irisListening, top: '86%', left: '35%', size: 84, rotate: -7 },
  { src: reedSpeakingAlt, top: '76%', left: '52%', size: 84, rotate: 1 },
  { src: irisDefault, top: '78%', left: '81%', size: 74, rotate: -4 },
  { src: reedLive, top: '94%', left: '90%', size: 94, rotate: -2 },
  { src: reedDefault, top: '93%', left: '68%', size: 54, rotate: 2 },
  { kind: 'text', text: '\u{1F4A1}', top: '88%', left: '72%', size: 30 },
];

const coachOrder: CoachId[] = ['iris', 'reed'];

const coachProfiles: Record<CoachId, CoachProfile> = {
  iris: {
    name: 'Iris',
    accent: 'pink',
    avatar: irisDefault,
    blurb: 'Cheerful and energetic guidance with expressive feedback and momentum-focused coaching.',
    voicePrompt: 'Start session to speak with Iris.',
    textPrompt: 'Send a message to chat with Iris.',
  },
  reed: {
    name: 'Reed',
    accent: 'blue',
    avatar: reedDefault,
    blurb: 'Direct and grounded coaching designed for cleaner structure and no-nonsense execution.',
    voicePrompt: 'Start session to speak with Reed.',
    textPrompt: 'Send a message to chat with Reed.',
  },
};

const testimonials: Testimonial[] = [
  {
    name: 'Maya Thompson',
    meta: 'Austin, TX · Product Designer',
    body:
      'The structure finally feels sustainable. I use voice check-ins on weekdays and quick text updates on busy days, and I have not broken my routine in 11 weeks.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=220&h=220&q=80',
  },
  {
    name: 'Ethan Brooks',
    meta: 'Chicago, IL · Sales Manager',
    body:
      'I needed direct feedback without paying for daily in-person sessions. Delirio gave me clear accountability and better consistency than what I had before.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=220&h=220&q=80',
  },
  {
    name: 'Sofia Ramirez',
    meta: 'Miami, FL · Graduate Student',
    body:
      'Switching between personalities was the part I did not expect to matter this much. I use Iris when I want momentum and Reed when I need blunt direction.',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=220&h=220&q=80',
  },
];

const typicalCoaching: ComparisonItem[] = [
  { icon: '🚫', text: 'Unavailable during special dates' },
  { icon: '💸', text: 'Expensive ($50 / session)' },
  { icon: '🗓️', text: 'Schedule limitations' },
  { icon: '📍', text: 'On-site' },
];

const delirioCoaching: ComparisonItem[] = [
  { icon: '💰', text: '10% of common subscription cost' },
  { icon: '✅', text: 'Runs on your schedule' },
  { icon: '⏱️', text: 'Always accessible' },
  { icon: '🌍', text: 'From anywhere' },
];

const faqOrder: FaqCategory[] = ['ACTIVITIES', 'TRAINERS', 'WORKOUTS', 'SUBSCRIPTIONS'];

const faqItems: Record<FaqCategory, FaqItem[]> = {
  ACTIVITIES: [
    {
      question: 'HOW DO ACTIVITIES FIT NEXT TO WORKOUTS?',
      answer:
        'Activities are meant to live alongside strength plans, so walks, runs, or lighter sessions can support the same routine instead of sitting outside it.',
    },
    {
      question: 'CAN ACTIVITIES BE TRACKED CASUALLY?',
      answer:
        'Yes. The design direction supports lighter logging when you want consistency without turning every check-in into a full workout flow.',
    },
    {
      question: 'DO ACTIVITIES CHANGE WEEK TO WEEK?',
      answer:
        'They can. The app direction is intentionally flexible so your schedule can shift without breaking the plan.',
    },
    {
      question: 'ARE ACTIVITIES ONLY CARDIO-BASED?',
      answer:
        'No. Activities can include mobility, recovery, and other routine-building actions that still support overall coaching.',
    },
  ],
  TRAINERS: [
    {
      question: 'WHAT MAKES IRIS AND REED DIFFERENT?',
      answer:
        'Iris leans brighter and more expressive. Reed feels steadier and more direct. The point is to make the coaching tone feel distinct instead of generic.',
    },
    {
      question: 'CAN I SWITCH BETWEEN TRAINERS?',
      answer:
        'Yes. The coach selection flow is designed around choosing the tone that fits you best rather than locking you into one static personality.',
    },
    {
      question: 'DO TRAINERS WORK IN TEXT AND VOICE?',
      answer:
        'That is part of the core concept. The same personality should feel consistent whether you are messaging or speaking in the app.',
    },
    {
      question: 'ARE THE TRAINERS MEANT TO FEEL HUMAN?',
      answer:
        'They are meant to feel personal and recognizable, with enough character to make repeated use feel less sterile.',
    },
  ],
  WORKOUTS: [
    {
      question: 'WHAT TYPES OF WORKOUTS ARE OFFERED?',
      answer:
        'Split-based plans, exercise libraries, and activity additions are all part of the product direction shown in the current mockups.',
    },
    {
      question: 'CAN I ADD WORKOUTS OR ACTIVITIES?',
      answer:
        'Yes. The workouts section is built around expansion, so the user can keep adapting the plan instead of staying locked to one rigid routine.',
    },
    {
      question: 'DO I NEED A STRICT CALENDAR?',
      answer:
        'No. Delirio is meant to support both strict schedule-based execution and lighter routine building when needed.',
    },
    {
      question: 'CAN THE PLAN SHIFT WITH MY WEEK?',
      answer:
        'Yes. The product value is in flexible coaching, so the routine should be able to move as your availability changes.',
    },
  ],
  SUBSCRIPTIONS: [
    {
      question: 'WHAT IS INCLUDED IN THE SUBSCRIPTION?',
      answer:
        'Form analysis, schedule building, workout planning, and voice sessions are positioned as part of the subscription experience.',
    },
    {
      question: 'HOW DOES THE PRICE COMPARE TO COACHING?',
      answer:
        'The subscription section frames Delirio as a much lower-cost coaching alternative while keeping guidance available much more often.',
    },
    {
      question: 'IS THERE A SALES CONTACT?',
      answer:
        'Yes. The current landing uses a direct contact path instead of a waitlist so people can reach out without an extra form step.',
    },
    {
      question: 'CAN I DOWNLOAD THE APP DIRECTLY?',
      answer:
        'The section is structured like a download block, with the App Store badge and brand stage replacing the old waitlist flow.',
    },
  ],
};

const waveSections: WaveSection[] = [
  'hero',
  'features',
  'messaging',
  'workouts',
  'testimonials',
  'comparison',
  'personalities',
  'subscription',
  'faq',
];

const personalitiesBluePath =
  'M-120 360C170 236 402 500 734 398C1048 302 1282 220 1540 290C1728 344 1900 468 2050 484';

const personalitiesPinkPath =
  'M-120 858C200 976 492 996 818 816C1118 644 1412 620 1704 700C1868 740 1976 768 2050 786';

const waveMotionBySection: Record<WaveSection, WaveLineMotion> = {
  hero: { blueAmp: 1.22, pinkAmp: 0.9, blueShiftX: -2, blueShiftY: -10, pinkShiftX: 3, pinkShiftY: 12, blueScaleX: 1.02, pinkScaleX: 1.05, blueRotate: -1, pinkRotate: 1 },
  features: { blueAmp: 0.96, pinkAmp: 1.16, blueShiftX: -4, blueShiftY: -6, pinkShiftX: 2, pinkShiftY: 8, blueScaleX: 1.01, pinkScaleX: 1.03, blueRotate: -0.5, pinkRotate: 0.8 },
  messaging: { blueAmp: 1.34, pinkAmp: 0.86, blueShiftX: -3, blueShiftY: 18, pinkShiftX: 2, pinkShiftY: 22, blueScaleX: 1.04, pinkScaleX: 1.08, blueRotate: 1.2, pinkRotate: -1.2 },
  workouts: { blueAmp: 0.9, pinkAmp: 1.22, blueShiftX: -1, blueShiftY: 20, pinkShiftX: 4, pinkShiftY: 12, blueScaleX: 1.03, pinkScaleX: 1.1, blueRotate: 0.7, pinkRotate: -0.8 },
  testimonials: { blueAmp: 1.08, pinkAmp: 1.04, blueShiftX: -2, blueShiftY: 6, pinkShiftX: 2, pinkShiftY: 10, blueScaleX: 1.01, pinkScaleX: 1.02, blueRotate: 0, pinkRotate: 0.3 },
  comparison: { blueAmp: 1.28, pinkAmp: 0.92, blueShiftX: 0, blueShiftY: 0, pinkShiftX: 1, pinkShiftY: 14, blueScaleX: 1.04, pinkScaleX: 1.02, blueRotate: -0.6, pinkRotate: 0.6 },
  personalities: {
    blueAmp: 1,
    pinkAmp: 1,
    blueShiftX: 0,
    blueShiftY: 0,
    pinkShiftX: 0,
    pinkShiftY: 0,
    blueScaleX: 1,
    pinkScaleX: 1,
    blueRotate: 0,
    pinkRotate: 0,
    bluePath: personalitiesBluePath,
    pinkPath: personalitiesPinkPath,
  },
  subscription: { blueAmp: 1.28, pinkAmp: 1.12, blueShiftX: -1, blueShiftY: -2, pinkShiftX: 2, pinkShiftY: 8, blueScaleX: 1.03, pinkScaleX: 1.05, blueRotate: 0.5, pinkRotate: -0.2 },
  faq: { blueAmp: 0.94, pinkAmp: 1.18, blueShiftX: -2, blueShiftY: -6, pinkShiftX: 3, pinkShiftY: 4, blueScaleX: 1, pinkScaleX: 1.04, blueRotate: -0.3, pinkRotate: 0.5 },
};

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function FloatingCluster({
  nodes,
  className = '',
  eagerCount = 0,
}: {
  nodes: ClusterNode[];
  className?: string;
  eagerCount?: number;
}) {
  return (
    <div className={`landing-floating-cluster ${className}`}>
      {nodes.map((node, index) => {
        const style = {
          top: node.top,
          left: node.left,
          width: `${node.size}px`,
          height: `${node.size}px`,
          fontSize: `${node.size}px`,
          transform: `translate(-50%, -50%) rotate(${node.rotate ?? 0}deg)`,
          opacity: node.opacity ?? 1,
          animationDelay: `${index * -0.75}s`,
        };

        if (node.kind === 'text') {
          return (
            <span key={`${node.text}-${index}`} className="landing-floating-node landing-floating-node--text" style={style} aria-hidden="true">
              {node.text}
            </span>
          );
        }

        const shouldEagerLoad = index < eagerCount;
        return (
          <span key={`${node.src}-${index}`} className="landing-floating-node" style={style} aria-hidden="true">
            <img
              src={node.src}
              alt=""
              loading={shouldEagerLoad ? 'eager' : 'lazy'}
              fetchPriority={shouldEagerLoad && index < 2 ? 'high' : 'auto'}
              decoding="async"
            />
          </span>
        );
      })}
    </div>
  );
}

function PhoneMock({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'auto' | 'high' | 'low';
}) {
  return (
    <figure className={`landing-phone ${className}`}>
      <img src={src} alt={alt} loading={loading} fetchPriority={fetchPriority} decoding="async" />
    </figure>
  );
}

function ComparisonColumn({
  title,
  subtitle,
  items,
  mirrored = false,
  tone = 'blue',
}: {
  title: string;
  subtitle: string;
  items: ComparisonItem[];
  mirrored?: boolean;
  tone?: 'muted' | 'blue';
}) {
  return (
    <div
      className={`landing-comparison-column landing-comparison-column--${tone} ${mirrored ? 'landing-comparison-column--mirrored' : ''}`.trim()}
    >
      <div className="landing-comparison-column-head">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <ul className="landing-comparison-list">
        {items.map((item) => (
          <li key={`${title}-${item.text}`} className="landing-comparison-item">
            <span className="landing-comparison-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCoach, setActiveCoach] = useState<CoachId>('iris');
  const [interactionMode, setInteractionMode] = useState<InteractionMode>('voice');
  const [coachSlideDirection, setCoachSlideDirection] = useState<1 | -1>(1);
  const [coachSlideTick, setCoachSlideTick] = useState(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState<FaqCategory>('ACTIVITIES');
  const [openFaqQuestion, setOpenFaqQuestion] = useState<string>(faqItems.ACTIVITIES[0].question);
  const [activeWaveSection, setActiveWaveSection] = useState<WaveSection>('hero');
  const [sessionUserId] = useState(() => generateDiscoveryId());
  const [chatInput, setChatInput] = useState('');

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatInputRef = useRef<HTMLInputElement | null>(null);
  const previousCoachRef = useRef<CoachId>(activeCoach);

  const {
    sessionState,
    isMicMuted,
    isBotSpeaking,
    isUserSpeaking,
    botTranscript,
    botTurns,
    userTranscript,
    error: voiceError,
    connect,
    disconnect,
    toggleMic,
    toggleSpeakerMute,
    isSpeakerMuted,
  } = useVoiceSession({
    personality: activeCoach,
    userId: sessionUserId,
    context: 'default_app',
  });

  const {
    messages: chatMessages,
    isLoading: chatLoading,
    error: chatError,
    sendMessage,
    clearMessages,
  } = useTextChat({
    personality: activeCoach,
    userId: sessionUserId,
    context: 'default_app',
  });

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionElements = waveSections
      .map((section) => document.querySelector<HTMLElement>(`[data-wave-section="${section}"]`))
      .filter((section): section is HTMLElement => section !== null);

    if (!sectionElements.length) {
      return;
    }

    const updateActiveWaveSection = () => {
      const viewportMidline = window.innerHeight * 0.5;
      let nextSection: WaveSection = 'hero';
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionElements.forEach((sectionElement) => {
        const sectionKey = sectionElement.getAttribute('data-wave-section') as WaveSection | null;

        if (!sectionKey || !waveSections.includes(sectionKey)) {
          return;
        }

        const rect = sectionElement.getBoundingClientRect();
        const containsMidline = rect.top <= viewportMidline && rect.bottom >= viewportMidline;

        if (containsMidline) {
          nextSection = sectionKey;
          closestDistance = -1;
          return;
        }

        if (closestDistance < 0) {
          return;
        }

        const sectionMidpoint = rect.top + rect.height / 2;
        const distance = Math.abs(sectionMidpoint - viewportMidline);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextSection = sectionKey;
        }
      });

      setActiveWaveSection((current) => (current === nextSection ? current : nextSection));
    };

    updateActiveWaveSection();
    window.addEventListener('scroll', updateActiveWaveSection, { passive: true });
    window.addEventListener('resize', updateActiveWaveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveWaveSection);
      window.removeEventListener('resize', updateActiveWaveSection);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatLoading]);

  useEffect(() => {
    if (previousCoachRef.current === activeCoach) {
      return;
    }

    previousCoachRef.current = activeCoach;
    disconnect();
    clearMessages();
    setChatInput('');
  }, [activeCoach, clearMessages, disconnect]);

  useEffect(() => {
    if (interactionMode === 'text' && (sessionState === 'connected' || sessionState === 'connecting')) {
      disconnect();
    }
  }, [disconnect, interactionMode, sessionState]);

  function handleChatSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const trimmed = chatInput.trim();
    if (!trimmed || chatLoading) {
      return;
    }

    sendMessage(trimmed);
    setChatInput('');
  }

  function handleFaqCategoryChange(category: FaqCategory) {
    setActiveFaqCategory(category);
    setOpenFaqQuestion(faqItems[category][0].question);
  }

  function switchCoach(direction: 1 | -1) {
    setCoachSlideDirection(direction);
    setActiveCoach((currentCoach) => {
      const currentIndex = coachOrder.indexOf(currentCoach);
      const nextIndex = (currentIndex + direction + coachOrder.length) % coachOrder.length;
      return coachOrder[nextIndex];
    });
    setCoachSlideTick((tick) => tick + 1);
  }

  function selectCoach(targetCoach: CoachId) {
    if (targetCoach === activeCoach) {
      return;
    }

    const currentIndex = coachOrder.indexOf(activeCoach);
    const targetIndex = coachOrder.indexOf(targetCoach);
    const direction: 1 | -1 = targetIndex > currentIndex ? 1 : -1;

    setCoachSlideDirection(direction);
    setActiveCoach(targetCoach);
    setCoachSlideTick((tick) => tick + 1);
  }

  const visibleFaqItems = faqItems[activeFaqCategory];
  const lineMotion = waveMotionBySection[activeWaveSection];
  const activeCoachProfile = coachProfiles[activeCoach];
  const inactiveCoach = coachOrder.find((coachId) => coachId !== activeCoach) ?? activeCoach;
  const inactiveCoachProfile = coachProfiles[inactiveCoach];
  const isPersonalitySectionActive = activeWaveSection === 'personalities';
  const travelBlue = isPersonalitySectionActive && activeCoach === 'reed';
  const travelPink = isPersonalitySectionActive && activeCoach === 'iris';
  const isVoiceConnected = interactionMode === 'voice' && sessionState === 'connected';
  const isVoiceConnecting = interactionMode === 'voice' && sessionState === 'connecting';
  const sessionStatusLabel = sessionState === 'connecting'
    ? 'CONNECTING'
    : sessionState === 'connected'
      ? isBotSpeaking
        ? 'COACH SPEAKING'
        : isUserSpeaking
          ? 'LISTENING'
          : 'LIVE'
      : sessionState === 'error'
        ? 'ERROR'
        : 'READY';
  const sessionStatusTone = sessionState === 'error'
    ? 'landing-personality-session-state--error'
    : sessionState === 'connected'
      ? 'landing-personality-session-state--live'
      : sessionState === 'connecting'
        ? 'landing-personality-session-state--busy'
        : '';
  const canSendChat = interactionMode === 'text' && chatInput.trim().length > 0 && !chatLoading;

  let voiceTranscriptSpeaker = '';
  let voiceTranscriptText = '';
  const liveBotTranscript = botTranscript.trim();
  const liveUserTranscript = userTranscript.trim();
  const lastBotTurn = (botTurns[0] ?? '').trim();

  if (liveBotTranscript) {
    voiceTranscriptSpeaker = activeCoachProfile.name;
    voiceTranscriptText = liveBotTranscript;
  } else if (liveUserTranscript) {
    voiceTranscriptSpeaker = 'You';
    voiceTranscriptText = liveUserTranscript;
  } else if (lastBotTurn) {
    voiceTranscriptSpeaker = activeCoachProfile.name;
    voiceTranscriptText = lastBotTurn;
  }
  const hasRenderableVoiceTranscript = Boolean(voiceTranscriptSpeaker && voiceTranscriptText);

  return (
    <div className="landing-shell">
      <LandingBackgroundLines
        bluePath={lineMotion.bluePath}
        pinkPath={lineMotion.pinkPath}
        blueAmplitude={lineMotion.blueAmp}
        pinkAmplitude={lineMotion.pinkAmp}
        blueShiftX={lineMotion.blueShiftX}
        blueShiftY={lineMotion.blueShiftY}
        pinkShiftX={lineMotion.pinkShiftX}
        pinkShiftY={lineMotion.pinkShiftY}
        blueScaleX={lineMotion.blueScaleX}
        pinkScaleX={lineMotion.pinkScaleX}
        blueRotate={lineMotion.blueRotate}
        pinkRotate={lineMotion.pinkRotate}
        travelBlue={travelBlue}
        travelPink={travelPink}
      />
      <LandingSiteHeader
        isScrolled={isScrolled}
        onFeaturesClick={() => scrollToSection('features')}
        onPersonalitiesClick={() => scrollToSection('personalities')}
        onSubscriptionClick={() => scrollToSection('subscription')}
      />

      <main className="landing-main">
        <section id="hero" data-wave-section="hero" className="landing-section landing-section--hero">
          <div className="landing-container landing-eyecatcher">
            <div className="landing-eyecatcher-copy">
              <p className="landing-eyecatcher-kicker">PERSONAL TRAINING</p>
              <h1 className="landing-display landing-display--hero">
                <span>
                  A <span className="landing-display-blue">PERSONAL</span>
                </span>
                <span>
                  COACH FOR <span className="landing-display-blue">ALL</span>
                </span>
              </h1>
              <div className="landing-eyecatcher-body">
                <p>Receive seamless feedback from your very own personal trainer</p>
                <p>Know your body better, act with insights</p>
              </div>
              <button className="landing-outline-button" type="button" onClick={() => scrollToSection('personalities')}>
                <span>Talk to a personal trainer</span>
                <MoveRight size={20} />
              </button>
            </div>

            <div className="landing-eyecatcher-visual">
              <FloatingCluster nodes={heroNodes} className="landing-floating-cluster--hero" eagerCount={6} />
            </div>
          </div>
        </section>

        <section id="features" data-wave-section="features" className="landing-section landing-section--feature-intro">
          <div className="landing-container landing-feature-intro">
            <div className="landing-feature-intro-copy">
              <h2 className="landing-display landing-display--section">
                <span className="landing-display-blue">PERSONALITIES</span>
                <span>
                  THAT FEEL <span className="landing-display-pink">UNIQUE</span>
                </span>
              </h2>
              <p className="landing-section-body landing-section-body--feature-intro">
                Start your journey by selecting a personality for your trainer
              </p>
            </div>

            <div className="landing-feature-intro-visual">
              <PhoneMock
                src={coachSelectionReed}
                alt="Coach selection screen featuring Reed"
                className="landing-phone--feature-main"
                loading="eager"
                fetchPriority="high"
              />
              <PhoneMock
                src={coachSelectionIris}
                alt="Coach selection screen featuring Iris"
                className="landing-phone--feature-side"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section id="messaging" data-wave-section="messaging" className="landing-section landing-section--messaging">
         
          <div style = {{display: "flex", flexDirection: "column", gap: 100}} className="landing-container landing-messaging">
            <h2 className="landing-heading landing-heading--center">
              IN-APP &amp; EXTERNAL <span className="landing-display-blue">MESSAGING</span>
            </h2>

       
            <div className="landing-messaging-grid">
              <div className="landing-messaging-column">
                <div className="landing-messaging-label landing-messaging-label--blue">
                  <span className="landing-icon-badge landing-icon-badge--blue" aria-hidden="true">
                    <MessageCircle size={36} />
                  </span>
                  <span>SMS MESSAGING FROM ANYWHERE</span>
                </div>

                <ul className="landing-check-list landing-check-list--blue">
                  <li>AN INTERFACE YOU ALREADY LOVE</li>
                  <li>NO EXTRA DOWNLOADS</li>
                  <li>ALWAYS ACCESSIBLE</li>
                </ul>

                <PhoneMock src={messagingLeft} alt="External messaging screen" className="landing-phone--messaging" />
              </div>

              <div className="landing-messaging-column landing-messaging-column--right">
                <div className="landing-messaging-label landing-messaging-label--pink">
                  <span className="landing-icon-badge landing-icon-badge--pink" aria-hidden="true">
                    <Smartphone size={36} />
                  </span>
                  <span>
                    MESSAGE OR VOICE CHAT <span className="landing-display-pink">IN-APP</span>
                  </span>
                </div>

                <ul className="landing-check-list landing-check-list--pink">
                  <li>GENERATE WORKOUT PLANS &amp; SPLITS</li>
                  <li>REFLECT ON YOUR PROGRESS WITH TRAINER</li>
                  <li>FEELS NATURAL</li>
                </ul>

                <PhoneMock src={messagingRight} alt="In-app messaging screen" className="landing-phone--messaging" />
              </div>
            </div>
          </div>
        </section>

        <section id="workouts" data-wave-section="workouts" className="landing-section landing-section--workouts">
          <div className="landing-container landing-workouts">
            <div className="landing-workouts-visual">
              <PhoneMock src={exerciseLibrary} alt="Exercise library view" className="landing-phone--workout-left" />
              <PhoneMock src={splitRest} alt="Workout split view" className="landing-phone--workout-center" />
              <PhoneMock src={activityList} alt="Activities list view" className="landing-phone--workout-right" />
            </div>

            <div className="landing-workouts-copy">
              <p className="landing-overline landing-overline--blue">300+ WORKOUTS</p>
              <h2 className="landing-display landing-display--section">
                <span>
                  ADD <span className="landing-display-blue">WORKOUTS</span>
                </span>
                <span>
                  OR <span className="landing-display-blue">ACTIVITIES</span>
                </span>
              </h2>
              <p className="landing-section-body">
                Use splits or strict calendar based schedule to execute your plan and keep consistent
              </p>
            </div>
          </div>
        </section>

        <section id="testimonials" data-wave-section="testimonials" className="landing-section landing-section--testimonials">
          <div className="landing-container landing-testimonials">
            <div className="landing-testimonials-copy">
              <h2 className="landing-display landing-display--section">
                <span>
                  OUR <span className="landing-display-blue">TESTIMONIALS</span>
                </span>
              </h2>
              <p className="landing-section-body">
                Real customers, real results from everyday people at different stages of their fitness journeys
              </p>
            </div>

            <div className="landing-testimonial-track">
              {testimonials.map((testimonial) => (
                <article
                  key={`${testimonial.name}-${testimonial.meta}`}
                  className="landing-testimonial-card"
                >
                  <div className="landing-testimonial-profile">
                    <span className="landing-testimonial-avatar">
                      <img src={testimonial.avatar} alt={`${testimonial.name} portrait`} loading="lazy" />
                    </span>
                    <div>
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.meta}</p>
                    </div>
                  </div>
                  <p className="landing-testimonial-body">{testimonial.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="comparison" data-wave-section="comparison" className="landing-section landing-section--comparison">
          <div className="landing-container landing-comparison">
            <h2 className="landing-heading landing-heading--center">
              <span className="landing-display-blue">FLEXIBLE</span> COACHING
            </h2>
            <p className="landing-comparison-subtitle">
              Compare rigid coaching models with Delirio&apos;s adaptive structure built for consistency and daily accessibility.
            </p>

            <div className="landing-comparison-grid">
              <ComparisonColumn
                title="TYPICAL COACHING"
                subtitle="Effective but often constrained by pricing, scheduling, and availability."
                items={typicalCoaching}
                tone="muted"
              />
              <div className="landing-comparison-divider" aria-hidden="true">
                <span className="landing-comparison-vs">VS</span>
              </div>
              <ComparisonColumn
                title="DELIRIO"
                subtitle="Designed for reliable execution with lower friction across voice and text."
                items={delirioCoaching}
                mirrored
                tone="blue"
              />
            </div>
          </div>
        </section>

        <section
          id="personalities"
          data-wave-section="personalities"
          className="landing-section landing-section--personality-spotlight"
        >
          <div className="landing-container landing-personality-spotlights landing-personality-experience">
            <h2 className="landing-heading landing-heading--center">
              <span className="landing-display-pink">GET</span>  TO KNOW THE <span className="landing-display-blue">PERSONALITIES</span>
            </h2>

            <div className="landing-personality-experience-shell">
              <div className="landing-personality-console">
                <article className="landing-personality-session-card">
                  <div className="landing-personality-session-head">
                    <span
                      className={`landing-personality-session-state landing-personality-session-state--${activeCoachProfile.accent} ${sessionStatusTone}`.trim()}
                    >
                      {sessionStatusLabel}
                    </span>
                    <span className="landing-personality-session-channel">
                      {activeCoachProfile.name} · {interactionMode === 'voice' ? 'Voice' : 'Text'}
                    </span>
                  </div>

                  <div className="landing-personality-session-controls">
                    <button
                      type="button"
                      className={`landing-personality-session-icon-button ${
                        interactionMode === 'voice' && isSpeakerMuted ? 'is-muted' : ''
                      }`.trim()}
                      aria-label={interactionMode === 'voice' ? 'Toggle speaker output' : 'Clear chat'}
                      aria-pressed={interactionMode === 'voice' ? isSpeakerMuted : undefined}
                      onClick={() => {
                        if (interactionMode === 'voice') {
                          toggleSpeakerMute();
                          return;
                        }

                        clearMessages();
                      }}
                    >
                      <Volume2 size={26} />
                    </button>
                    <button
                      type="button"
                      className="landing-personality-session-start"
                      disabled={interactionMode === 'voice' ? isVoiceConnecting : chatLoading}
                      onClick={() => {
                        if (interactionMode === 'voice') {
                          if (isVoiceConnected || isVoiceConnecting) {
                            disconnect();
                          } else {
                            connect();
                          }
                          return;
                        }

                        if (chatInput.trim()) {
                          handleChatSubmit();
                        } else {
                          chatInputRef.current?.focus();
                        }
                      }}
                    >
                      {interactionMode === 'voice'
                        ? isVoiceConnecting
                          ? 'Connecting...'
                          : isVoiceConnected
                            ? 'End Session'
                            : 'Start Session'
                        : chatLoading
                          ? 'Sending...'
                          : chatInput.trim()
                            ? 'Send Message'
                            : 'Open Chat'}
                    </button>
                    <button
                      type="button"
                      className={`landing-personality-session-icon-button ${
                        interactionMode === 'voice' && isMicMuted ? 'is-muted' : ''
                      }`.trim()}
                      aria-label={interactionMode === 'voice' ? 'Microphone' : 'Send message'}
                      aria-pressed={interactionMode === 'voice' ? isMicMuted : undefined}
                      disabled={interactionMode === 'text' ? !canSendChat : false}
                      onClick={() => {
                        if (interactionMode === 'voice') {
                          toggleMic();
                          return;
                        }

                        handleChatSubmit();
                      }}
                    >
                      {interactionMode === 'voice' ? <Mic size={26} /> : <SendHorizontal size={26} />}
                    </button>
                  </div>

                  {interactionMode === 'voice' && (
                    <>
                      {hasRenderableVoiceTranscript && (
                        <div className="landing-personality-session-transcript">
                          <p>
                            <strong>{voiceTranscriptSpeaker}:</strong> {voiceTranscriptText}
                          </p>
                        </div>
                      )}
                      {voiceError && <p className="landing-personality-session-error">{voiceError}</p>}
                    </>
                  )}

                  <div
                    className={`landing-personality-mode-toggle landing-personality-mode-toggle--${activeCoachProfile.accent}`}
                    role="tablist"
                    aria-label="Choose interaction method"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={interactionMode === 'voice'}
                      className={interactionMode === 'voice' ? 'is-active' : ''}
                      onClick={() => setInteractionMode('voice')}
                    >
                      Voice
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={interactionMode === 'text'}
                      className={interactionMode === 'text' ? 'is-active' : ''}
                      onClick={() => setInteractionMode('text')}
                    >
                      Text / Chat
                    </button>
                  </div>

                  {interactionMode === 'text' && (
                    <div className="landing-personality-chat-shell">
                      <div className="landing-personality-chat-messages">
                        {chatMessages.length === 0 && (
                          <p className="landing-personality-chat-empty">
                            Send a message to start chatting with {activeCoachProfile.name}
                          </p>
                        )}

                        {chatMessages.map((message, index) => (
                          <div
                            key={`${message.role}-${index}-${message.text.slice(0, 24)}`}
                            className={`landing-personality-chat-bubble ${
                              message.role === 'user'
                                ? 'landing-personality-chat-bubble--user'
                                : 'landing-personality-chat-bubble--bot'
                            }`}
                          >
                            <span>{message.role === 'user' ? 'You' : activeCoachProfile.name}</span>
                            <p>{message.text}</p>
                          </div>
                        ))}

                        {chatLoading && (
                          <div className="landing-personality-chat-bubble landing-personality-chat-bubble--bot">
                            <span>{activeCoachProfile.name}</span>
                            <p>Typing...</p>
                          </div>
                        )}

                        <div ref={chatEndRef} />
                      </div>

                      <form className="landing-personality-chat-input-row" onSubmit={handleChatSubmit}>
                        <input
                          ref={chatInputRef}
                          type="text"
                          value={chatInput}
                          placeholder={`Message ${activeCoachProfile.name}`}
                          onChange={(event) => setChatInput(event.target.value)}
                          disabled={chatLoading}
                        />
                        <button type="submit" disabled={!canSendChat}>
                          <SendHorizontal size={20} />
                        </button>
                      </form>

                      {chatError && <p className="landing-personality-session-error">{chatError}</p>}
                    </div>
                  )}
                </article>

                <button type="button" className="landing-personality-settings-row" disabled aria-disabled="true">
                  <span>{interactionMode === 'voice' ? 'Audio Settings' : 'Chat Settings'}</span>
                  <span>{interactionMode === 'voice' ? 'Expand' : 'Customize'}</span>
                </button>
              </div>

              <div className="landing-personality-stage" aria-live="polite">
                <div className="landing-personality-stage-shell">
                  <button
                    key={`${inactiveCoach}-${coachSlideTick}`}
                    type="button"
                    className={`landing-personality-stage-ghost landing-personality-stage-ghost--${inactiveCoach}`}
                    aria-label={`Switch to ${inactiveCoachProfile.name}`}
                    onClick={() => selectCoach(inactiveCoach)}
                  >
                    <img src={inactiveCoachProfile.avatar} alt="" />
                  </button>
                  <div
                    key={`${activeCoach}-${coachSlideTick}`}
                    className={`landing-personality-stage-avatar landing-personality-stage-avatar--${activeCoach} ${
                      coachSlideDirection > 0
                        ? 'landing-personality-stage-avatar--descend-forward'
                        : 'landing-personality-stage-avatar--descend-backward'
                    } ${interactionMode === 'voice' && sessionState === 'connected' ? 'landing-personality-stage-avatar--voice' : ''}`}
                  >
                    <img src={activeCoachProfile.avatar} alt={`${activeCoachProfile.name} personality avatar`} />
                  </div>

                </div>

                <div className="landing-personality-stage-nav">
                  <button type="button" aria-label="Previous personality" onClick={() => switchCoach(-1)}>
                    <ChevronLeft size={26} />
                  </button>

                  <div className="landing-personality-stage-meta">
                    <p className={`landing-personality-stage-name landing-personality-stage-name--${activeCoachProfile.accent}`}>
                      {activeCoachProfile.name}
                    </p>
                    <p>{activeCoachProfile.blurb}</p>
                  </div>

                  <button type="button" aria-label="Next personality" onClick={() => switchCoach(1)}>
                    <ChevronRight size={26} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="subscription" data-wave-section="subscription" className="landing-section landing-section--subscription">
          <div className="landing-container landing-subscription">
            <div className="landing-subscription-copy">
              <h2 className="landing-display landing-display--section">
                <span>
                  A <span className="landing-display-blue">LIFE-STYLE</span> WORTH
                </span>
                <span>PAYING FOR</span>
              </h2>
              <p className="landing-section-body">
                Form analysis, schedule builder, and voice sessions are included in all subscriptions
              </p>

              <div className="landing-pricing-card">
                <div className="landing-pricing-card-top">
                  <span className="landing-pricing-tier">Starter</span>
                  <div className="landing-pricing-card-icons" aria-hidden="true">
                    <img src={irisConnecting} alt="" />
                    <span>{'\u{1F4A1}'}</span>
                  </div>
                </div>

                <div className="landing-pricing-stat">
                  <span>-90%</span>
                  <span>of average prices</span>
                </div>

                <div className="landing-pricing-actions">
                  <ul className="landing-check-list landing-check-list--blue landing-check-list--pricing">
                    <li>Personal trainer</li>
                    <li>Real time feedback</li>
                    <li>Voice sessions</li>
                    <li>Automated workout routines</li>
                  </ul>

                  <a className="landing-outline-button landing-outline-button--full" href="mailto:Delirio.0fficial0@gmail.com">
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>

            <div className="landing-subscription-visual">
              <FloatingCluster nodes={subscriptionNodes} className="landing-floating-cluster--subscription" />

              <div className="landing-subscription-stage">
                <div className="landing-subscription-logo-block">
                  <Logo width="50" height="auto" />
                </div>
                <img className="landing-app-badge" src={appStoreBadge} alt="Download on the App Store" />
              </div>
            </div>
          </div>
        </section>

        <section id="faq" data-wave-section="faq" className="landing-section landing-section--faq">
          <div className="landing-container landing-faq">
            <div className="landing-faq-title">
              <h2 className="landing-heading">FAQ</h2>
            </div>

            <div className="landing-faq-layout">
              <div className="landing-faq-categories" aria-label="FAQ categories">
                {faqOrder.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={category === activeFaqCategory ? 'is-active' : ''}
                    onClick={() => handleFaqCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="landing-faq-list">
                {visibleFaqItems.map((item, index) => {
                  const isOpen = item.question === openFaqQuestion;
                  const answerId = `faq-answer-${activeFaqCategory.toLowerCase()}-${index}`;
                  return (
                    <div key={item.question} className={`landing-faq-item ${isOpen ? 'landing-faq-item--open' : ''}`}>
                      <button
                        type="button"
                        className="landing-faq-question"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => setOpenFaqQuestion(isOpen ? '' : item.question)}
                      >
                        <span>{item.question}</span>
                        <ChevronRight size={24} />
                      </button>
                      <div id={answerId} className="landing-faq-answer" aria-hidden={!isOpen}>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                })}

                <a className="landing-faq-more" href="mailto:Delirio.0fficial0@gmail.com">
                  IS YOUR QUESTION NOT LISTED?
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingSiteFooter />
    </div>
  );
}
