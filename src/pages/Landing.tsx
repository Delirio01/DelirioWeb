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
import messagingLeft from '../images/iMocksImages/blueChat_iMsg_iMock.png';
import messagingRight from '../images/iMocksImages/inApp_msging_iMock.png';
import { useTextChat } from '../hooks/useTextChat';
import { useVoiceSession } from '../hooks/useVoiceSession';
import { generateDiscoveryId } from '../utils/pipecatConfig';
import { FirestoreService } from '../utils/firebase';
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

type FaqCategory = 'AI' | 'COACHING' | 'PRODUCT' | 'PRICE';

type FaqItem = {
  question: string;
  answer: string;
};

type ComparisonRow = {
  label: string;
  inPerson: string;
  online: string;
  delirio: string;
};

type CoachId = 'iris' | 'reed';

type InteractionMode = 'voice' | 'text';

type CoachProfile = {
  name: string;
  accent: 'pink' | 'blue';
  avatar: string;
  blurb: string;
  approach: string;
  voicePrompt: string;
  textPrompt: string;
  demoExchange: {
    user: string;
    coach: string;
  };
};

type WaveSection =
  | 'hero'
  | 'features'
  | 'personalities'
  | 'form-feedback'
  | 'messaging'
  | 'workouts'
  | 'comparison'
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

const APP_DOWNLOAD_URL = 'https://apps.apple.com/us/search?term=delirio%20fit';

const coachOrder: CoachId[] = ['reed', 'iris'];

const coachProfiles: Record<CoachId, CoachProfile> = {
  iris: {
    name: 'Iris',
    accent: 'pink',
    avatar: irisDefault,
    blurb: 'Expressive, energetic coaching that keeps momentum high and sessions moving.',
    approach: 'Best for athletes who want encouragement, energy, and quick resets between sets.',
    voicePrompt: 'Want momentum today? Iris will keep your pace high and your focus tight.',
    textPrompt: 'Text Iris for high-energy check-ins, encouragement, and mid-week adjustments.',
    demoExchange: {
      user: "I'm dragging today.",
      coach: "No problem. We cut one accessory, keep the main lift, and stack a clean win.",
    },
  },
  reed: {
    name: 'Reed',
    accent: 'blue',
    avatar: reedDefault,
    blurb: 'Direct, structured coaching focused on clean execution and practical progression.',
    approach: 'Best for athletes who want clear structure, specific corrections, and no fluff.',
    voicePrompt: 'Need structure today? Reed keeps sessions focused and technically sharp.',
    textPrompt: 'Text Reed for direct feedback, specific targets, and plan changes that make sense.',
    demoExchange: {
      user: 'My squats felt off.',
      coach: 'Your hips shifted right on rep three. Widen stance one inch and slow the descent.',
    },
  },
};

const comparisonRows: ComparisonRow[] = [
  {
    label: 'Presence',
    inPerson: 'In the room with you',
    online: 'Not there - you train alone',
    delirio: 'Watching your form live, talking during rest',
  },
  {
    label: 'Check-ins',
    inPerson: 'Only during sessions',
    online: 'Weekly (maybe)',
    delirio: 'Daily - your coach is available every day',
  },
  {
    label: 'Form feedback',
    inPerson: 'Real-time, in person',
    online: 'You send a video, they respond later',
    delirio: 'Real-time, live during your workout',
  },
  {
    label: 'Programming',
    inPerson: 'Varies by trainer',
    online: 'Google Sheet or PDF',
    delirio: 'Built and adjusted by your coach dynamically',
  },
  {
    label: 'Communication',
    inPerson: 'In-person only',
    online: 'Email or app portal',
    delirio: 'Text, voice, in-app - however you want',
  },
  {
    label: 'Scheduling',
    inPerson: 'Fixed appointments',
    online: 'Async, but slow responses',
    delirio: 'On your schedule, always responsive',
  },
  {
    label: 'Cost',
    inPerson: '$50-150/session',
    online: '$150-200/month',
    delirio: '$50/month',
  },
];

const faqCategoryLabels: Record<FaqCategory, string> = {
  AI: 'About the AI',
  COACHING: 'About the coaching',
  PRODUCT: 'About the product',
  PRICE: 'About the price',
};

const faqOrder: FaqCategory[] = ['AI', 'COACHING', 'PRODUCT', 'PRICE'];

const faqItems: Record<FaqCategory, FaqItem[]> = {
  AI: [
    {
      question: 'Is this actually a real AI or just a chatbot with canned responses?',
      answer:
        "It's a real AI. Reed and Iris have distinct personalities, remember your history, and respond to what you actually say - not from a script. The conversations are live, whether you're texting between workouts or talking mid-session.",
    },
    {
      question: 'Can the AI actually see my form?',
      answer:
        'Yes. Your phone camera runs real-time pose estimation to track your body during exercises. Your coach gives you feedback on what it sees - not generic tips, corrections specific to your reps.',
    },
    {
      question: 'Is this going to feel weird?',
      answer:
        "Honestly, for about two minutes. Then your coach says something that actually makes sense for what you just did, and it clicks. Most people adjust faster than they expect.",
    },
    {
      question: 'Is the voice coaching awkward? Like talking to Siri?',
      answer:
        "No. The voice is natural, the responses are contextual, and your coach is reacting to what you're actually doing - not running through a script. It's closer to having a trainer in your ear than talking to a voice assistant.",
    },
  ],
  COACHING: [
    {
      question: "What's the difference between Reed and Iris?",
      answer:
        "Reed is direct and structured - good if you want someone who keeps things focused and practical. Iris is expressive and energetic - good if you want someone who brings momentum. You pick the coach that fits how you like to be coached, and they're yours from that point on. They remember your history, your goals, and what you talked about last Tuesday.",
    },
    {
      question: 'Can this actually replace a personal trainer?',
      answer:
        "For most people, yes. You get form correction, programming, accountability, and someone to talk to between sessions. What you don't get is someone physically spotting you on a heavy bench press. If that's what you need, we're not pretending to be that.",
    },
    {
      question: 'What happens between workouts?',
      answer:
        "Your coach texts you. Check-ins, reminders, follow-ups on things you mentioned. You can text back whenever. It's not a notification machine - it's a conversation that continues.",
    },
    {
      question: 'How is this different from a fitness app?',
      answer:
        "It's not a fitness app. Fitness apps give you content - videos, plans, timers - and leave you to figure it out. Delirio gives you a coach. Someone who knows your name, checks in on you between sessions, watches your form while you train, and remembers that you tweaked your shoulder two weeks ago. The difference is relationship, not features.",
    },
    {
      question: 'How is this different from an online coaching subscription?',
      answer:
        "Most online coaches give you a Google Sheet, check in once a week, and charge $150-200/month. Your Delirio coach is available every day, watches your form live, and costs a fraction of that. The tradeoff is that it's AI, not a human - but for most people, daily AI coaching beats weekly human check-ins.",
    },
    {
      question: 'Do I need to work out every day for this to be worth it?',
      answer:
        "No. Your coach meets you where you are. Whether that's five days a week or two, the value is that someone is paying attention to your consistency and adjusting with you - not judging you for missing a day.",
    },
    {
      question: 'Will my coach push me too hard?',
      answer:
        "Your coach adapts to you, not the other way around. If you're consistent and progressing, they'll push you. If you're recovering or having a rough week, they'll meet you there. That's what coaching is.",
    },
    {
      question: 'Can my coach change my program mid-week if something comes up?',
      answer:
        "Yes. If you're traveling, sore, short on time, or just not feeling it, tell your coach. They'll adjust on the spot. The program serves you, not the other way around.",
    },
    {
      question: 'Can I talk to my coach about stuff outside of workouts?',
      answer:
        "Your coach is a fitness coach, not a therapist. But the best trainers know that life affects training. If you're stressed, traveling, or going through something, your coach factors that in.",
    },
  ],
  PRODUCT: [
    {
      question: 'Can I text my coach or do I have to use the app?',
      answer:
        "Both. You can message your coach through the app, over SMS, or on WhatsApp. Same coach, same conversation, whatever's convenient. Most people end up texting their coach the same way they'd text anyone else.",
    },
    {
      question: 'Does this work at a gym or only at home?',
      answer:
        'Both. You need your phone camera visible while you train, and space to move. That works in a living room, a garage, a park, or a gym floor.',
    },
    {
      question: 'Do I need special equipment?',
      answer:
        'No. You need your phone and enough space to move. Your coach programs around whatever you have access to - bodyweight at home, a full gym, a hotel room with nothing.',
    },
    {
      question: 'Do I have to use the camera every time?',
      answer:
        "No. The camera gives your coach eyes on your form, so it's better when you use it. But you can still text, voice chat, and follow your program without it.",
    },
    {
      question: 'What kind of workouts can I do?',
      answer:
        'Strength training is the core focus. Your coach builds your splits, programs your progression, and watches your form through your camera. Activities like walks, runs, and mobility work fit alongside your strength plan.',
    },
    {
      question: 'How long are the workouts?',
      answer:
        "That depends on you. Your coach builds around the time you have. If you've got 30 minutes, you get a 30-minute session. If you've got an hour, you get an hour. No filler.",
    },
    {
      question: 'What if I already have a workout plan?',
      answer:
        "Your coach can work with it or build you a new one. Either way, the value isn't just the plan - it's having someone watching your form and keeping you accountable to whatever plan you're following.",
    },
    {
      question: "What if I'm a complete beginner?",
      answer:
        "That's actually where this helps most. You don't have to walk into a gym knowing what to do. Your coach builds your program, walks you through the movements, and corrects your form in real time. No prerequisite knowledge needed.",
    },
    {
      question: "What if I already know what I'm doing?",
      answer:
        "Then you're not paying for education - you're paying for accountability and a second pair of eyes on your form. Even experienced lifters benefit from having someone watching their reps and keeping their programming honest.",
    },
    {
      question: "What if I don't like my coach?",
      answer:
        "You can switch. But give it a few sessions - the coaching gets more personal as your coach learns how you train, what motivates you, and what your patterns are.",
    },
    {
      question: 'What happens if I stop for a while and come back?',
      answer:
        'Your coach remembers you. They know what you were working on, where you left off, and what was going on when you paused. No starting from scratch, no re-explaining your situation.',
    },
    {
      question: 'Can I use this alongside a human trainer?',
      answer:
        "Sure. Some people use Delirio for the days they're not with their trainer. Your coach picks up where your in-person sessions leave off.",
    },
    {
      question: 'Is my data private?',
      answer: "Yes. Your workout data, video, and conversations stay with us - we don't share or sell any of it to third parties.",
    },
    {
      question: "I've tried a bunch of stuff and nothing sticks. Why would this be different?",
      answer:
        "Probably because the other stuff left you on your own. Plans don't fail because they're bad plans - they fail because nobody's there to keep you going when it gets boring or life gets in the way. That's the whole point of having a coach.",
    },
    {
      question: 'Does this work for weight loss specifically?',
      answer:
        'Yes. Your coach can build programming around weight loss goals and check in on the habits that actually drive progress - not just the workouts, but everything around them.',
    },
  ],
  PRICE: [
    {
      question: '$50/month - why should I pay that?',
      answer:
        "A single session with a trainer costs $50-150. You're getting daily access to a coach who watches your form, builds your program, and texts you between sessions. If you train three times a week, that's under $5 per session.",
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes. No contracts, no cancellation fees.',
    },
  ],
};

const waveSections: WaveSection[] = [
  'hero',
  'features',
  'personalities',
  'form-feedback',
  'messaging',
  'workouts',
  'comparison',
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
  'form-feedback': { blueAmp: 1.1, pinkAmp: 0.98, blueShiftX: -2, blueShiftY: 8, pinkShiftX: 3, pinkShiftY: 14, blueScaleX: 1.02, pinkScaleX: 1.04, blueRotate: 0.4, pinkRotate: -0.4 },
  messaging: { blueAmp: 1.34, pinkAmp: 0.86, blueShiftX: -3, blueShiftY: 18, pinkShiftX: 2, pinkShiftY: 22, blueScaleX: 1.04, pinkScaleX: 1.08, blueRotate: 1.2, pinkRotate: -1.2 },
  workouts: { blueAmp: 0.9, pinkAmp: 1.22, blueShiftX: -1, blueShiftY: 20, pinkShiftX: 4, pinkShiftY: 12, blueScaleX: 1.03, pinkScaleX: 1.1, blueRotate: 0.7, pinkRotate: -0.8 },
  comparison: { blueAmp: 1.28, pinkAmp: 0.92, blueShiftX: 0, blueShiftY: 0, pinkShiftX: 1, pinkShiftY: 14, blueScaleX: 1.04, pinkScaleX: 1.02, blueRotate: -0.6, pinkRotate: 0.6 },
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

export default function Landing() {
  const firestoreServiceRef = useRef<FirestoreService | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDownloadStripVisible, setIsDownloadStripVisible] = useState(false);
  const [activeCoach, setActiveCoach] = useState<CoachId>('reed');
  const [interactionMode, setInteractionMode] = useState<InteractionMode>('voice');
  const [coachSlideDirection, setCoachSlideDirection] = useState<1 | -1>(1);
  const [coachSlideTick, setCoachSlideTick] = useState(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState<FaqCategory>('AI');
  const [openFaqQuestion, setOpenFaqQuestion] = useState<string>(faqItems.AI[0].question);
  const [activeWaveSection, setActiveWaveSection] = useState<WaveSection>('hero');
  const [sessionUserId] = useState(() => generateDiscoveryId());
  const [chatInput, setChatInput] = useState('');
  const [warmName, setWarmName] = useState('');
  const [warmEmail, setWarmEmail] = useState('');
  const [warmPhone, setWarmPhone] = useState('');
  const [isWarmSubmitting, setIsWarmSubmitting] = useState(false);
  const [warmSubmitError, setWarmSubmitError] = useState<string | null>(null);
  const [isWarmSubmitSuccess, setIsWarmSubmitSuccess] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatInputRef = useRef<HTMLInputElement | null>(null);
  const previousCoachRef = useRef<CoachId>(activeCoach);
  const previousScrollYRef = useRef(0);

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
      const currentScrollY = Math.max(window.scrollY, 0);
      const hasScrolled = currentScrollY > 24;
      const previousScrollY = previousScrollYRef.current;
      const isScrollingDown = currentScrollY > previousScrollY + 1;
      const isScrollingUp = currentScrollY < previousScrollY - 1;

      setIsScrolled(hasScrolled);

      if (!hasScrolled || isScrollingUp) {
        setIsDownloadStripVisible(false);
      } else if (isScrollingDown) {
        setIsDownloadStripVisible(true);
      }

      previousScrollYRef.current = currentScrollY;
    }

    previousScrollYRef.current = Math.max(window.scrollY, 0);
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

  async function handleWarmNetworkSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isWarmSubmitting) {
      return;
    }

    try {
      const name = warmName.trim();
      const email = warmEmail.trim().toLowerCase();
      const phone = warmPhone.trim();

      if (!name || !email || !phone) {
        setWarmSubmitError('Please complete all required fields.');
        setIsWarmSubmitSuccess(false);
        return;
      }

      setIsWarmSubmitting(true);
      setWarmSubmitError(null);
      setIsWarmSubmitSuccess(false);
      console.log('[InfoCapture] submit started');

      let timeoutId: number | undefined;
      try {
        const firestoreService = firestoreServiceRef.current ?? new FirestoreService();
        firestoreServiceRef.current = firestoreService;

        const savePromise = firestoreService.addWarmNetworkSubmissionDocument({
          Timestamp: new Date().toISOString(),
          Name: name,
          Email: email,
          Phone: phone,
        });

        const timeoutPromise = new Promise<never>((_, reject) => {
          timeoutId = window.setTimeout(() => reject(new Error('warm_network_submit_timeout')), 15000);
        });

        await Promise.race([savePromise, timeoutPromise]);
      } finally {
        if (timeoutId !== undefined) {
          window.clearTimeout(timeoutId);
        }
      }

      setWarmName('');
      setWarmEmail('');
      setWarmPhone('');
      setIsWarmSubmitSuccess(true);
      console.log('[InfoCapture] submit successful');
    } catch (error) {
      console.error('[InfoCapture] submit failed', error);
      const firebaseErrorCode = typeof error === 'object' && error && 'code' in error
        ? String((error as { code?: string }).code ?? '')
        : '';

      if (error instanceof Error && error.message.startsWith('missing_firebase_env_vars:')) {
        setWarmSubmitError('Firebase config is missing. Check your VITE_FIREBASE_* variables and restart the dev server.');
      } else if (firebaseErrorCode === 'permission-denied') {
        setWarmSubmitError('Firestore rules are blocking this write. Ask admin to allow create on info capture.');
      } else if (error instanceof Error && error.message === 'warm_network_submit_timeout') {
        setWarmSubmitError('Request timed out. Please try again.');
      } else {
        setWarmSubmitError('There was a problem submitting your info. Please try again.');
      }
      setIsWarmSubmitSuccess(false);
    } finally {
      setIsWarmSubmitting(false);
    }
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

  function handleFeatureCoachCardClick(targetCoach: CoachId) {
    selectCoach(targetCoach);
    const personalityPanel = document.querySelector('.landing-personality-console') as HTMLElement | null;

    if (!personalityPanel) {
      scrollToSection('personalities');
      return;
    }

    const panelRect = personalityPanel.getBoundingClientRect();
    const centerOffset = Math.max((window.innerHeight - panelRect.height) * 0.5, 0);
    const extraScrollBias = 0; 
    const targetTop = Math.max(window.scrollY + panelRect.top - centerOffset + extraScrollBias, 0);

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
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

  //wave behavior switch : swicthes on/off the wave behaviour in the baackground blue and pink lines 
  const waveBehaviour = false;

  return (
    <div className="landing-shell">
      <LandingBackgroundLines
        waveBehaviour={waveBehaviour}
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
        isStripVisible={isDownloadStripVisible}
        onFeaturesClick={() => scrollToSection('features')}
        onPersonalitiesClick={() => scrollToSection('form-feedback')}
        onSubscriptionClick={() => scrollToSection('subscription')}
        downloadUrl={APP_DOWNLOAD_URL}
      />

      <main className="landing-main">
        <section id="hero" data-wave-section="hero" className="landing-section landing-section--hero">
          <div className="landing-container landing-eyecatcher">
            <div className="landing-eyecatcher-copy">
              <p className="landing-eyecatcher-kicker">PERSONAL TRAINING</p>
              <h1 className="landing-display landing-display--hero">
                <span>GUDEINCE&nbsp;THAT</span>
                <span className="landing-display-blue">SHOWS UP</span>
                <span className="landing-display-blue">WHEN YOU</span>
                <span className="landing-display-blue">DO.</span>
              </h1>
              <div className="landing-eyecatcher-body">
                <p>Meet the AI coach that watches your form, guides your workouts, and actually shows up when you do.</p>
              </div>
              <button className="landing-outline-button landing-outline-button--hero" type="button" onClick={() => scrollToSection('features')}>
                <span>Find your coach</span>
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
                <span>
                  A COACH WHO&apos;S <span className="landing-display-blue">ACTUALLY THERE</span>
                </span>
              </h2>
              <p className="landing-section-body landing-section-body--feature-intro">
                Reed and Iris are distinct coaches with distinct styles. You choose who matches how you want to be coached,
                and that coach stays with you.
              </p>

              <div className="landing-feature-intro-actions">
                <div className="landing-coach-cards">
                  <button
                    type="button"
                    className={`landing-coach-card landing-coach-card--blue ${activeCoach === 'reed' ? 'is-active' : ''}`}
                    onClick={() => handleFeatureCoachCardClick('reed')}
                    aria-pressed={activeCoach === 'reed'}
                  >
                    <h3>Reed</h3>
                    <p>Direct, structured, practical. Clear cues. Clean execution.</p>
                  </button>
                  <button
                    type="button"
                    className={`landing-coach-card landing-coach-card--pink ${activeCoach === 'iris' ? 'is-active' : ''}`}
                    onClick={() => handleFeatureCoachCardClick('iris')}
                    aria-pressed={activeCoach === 'iris'}
                  >
                    <h3>Iris</h3>
                    <p>Expressive, energetic, momentum-driven. High engagement from first rep to last.</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="landing-feature-intro-visual">
              <PhoneMock
                src={coachSelectionReed}
                alt="Coach screen featuring Reed"
                className="landing-phone--feature-main"
                loading="eager"
                fetchPriority="high"
              />
              <PhoneMock
                src={coachSelectionIris}
                alt="Coach screen featuring Iris"
                className="landing-phone--feature-side"
                loading="eager"
                fetchPriority="high"
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
              <span>MEET YOUR</span> <span className="landing-display-blue">COACH</span>
            </h2>
            <p className="landing-comparison-subtitle">
              Same workout. Different coaching style. Switch between Reed and Iris to feel the difference in action.
            </p>

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
                      {activeCoachProfile.name} · {interactionMode === 'voice' ? 'Voice Coaching' : 'Text Coaching'}
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
                      {!hasRenderableVoiceTranscript && <p className="landing-personality-chat-empty">{activeCoachProfile.voicePrompt}</p>}
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
                          <>
                            <p className="landing-personality-chat-empty">{activeCoachProfile.textPrompt}</p>
                            <div className="landing-personality-chat-bubble landing-personality-chat-bubble--user">
                              <span>You</span>
                              <p>{activeCoachProfile.demoExchange.user}</p>
                            </div>
                            <div className="landing-personality-chat-bubble landing-personality-chat-bubble--bot">
                              <span>{activeCoachProfile.name}</span>
                              <p>{activeCoachProfile.demoExchange.coach}</p>
                            </div>
                          </>
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
                    <img src={activeCoachProfile.avatar} alt={`${activeCoachProfile.name} coach avatar`} />
                  </div>
                </div>

                <div className="landing-personality-stage-nav">
                  <button type="button" aria-label="Previous coach" onClick={() => switchCoach(-1)}>
                    <ChevronLeft size={26} />
                  </button>

                  <div className="landing-personality-stage-meta">
                    <p className={`landing-personality-stage-name landing-personality-stage-name--${activeCoachProfile.accent}`}>
                      {activeCoachProfile.name}
                    </p>
                    <p className="landing-personality-stage-blurb">{activeCoachProfile.blurb}</p>
                    <p className="landing-personality-stage-approach">{activeCoachProfile.approach}</p>
                  </div>

                  <button type="button" aria-label="Next coach" onClick={() => switchCoach(1)}>
                    <ChevronRight size={26} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="form-feedback" data-wave-section="form-feedback" className="landing-section landing-section--form-feedback">
          <div className="landing-container landing-form-feedback">
            <div className="landing-form-feedback-copy">
              <h2 className="landing-display landing-display--section">
                <span>REAL FEEDBACK.</span>
                <span className="landing-display-blue">REAL-TIME.</span>
              </h2>
              <p className="landing-section-body">
                Your coach tracks your movement live and gives corrections during the set, not after it. You train with
                eyes on your form the whole time.
              </p>
              <ul className="landing-check-list landing-check-list--blue landing-check-list--feedback">
                <li>LIVE FORM CUES WHILE YOU MOVE</li>
                <li>REST-TIME ADJUSTMENTS BETWEEN SETS</li>
                <li>CORRECTIONS TIED TO YOUR EXACT REPS</li>
              </ul>
            </div>

            <div className="landing-form-feedback-visual">
              <PhoneMock src={splitRest} alt="Live form feedback during workout session" className="landing-phone--feedback-main" />
              <PhoneMock src={activityList} alt="Activity view with live coaching context" className="landing-phone--feedback-right" />
            </div>
          </div>
        </section>

        <section id="messaging" data-wave-section="messaging" className="landing-section landing-section--messaging">
          <div className="landing-container landing-messaging">
            <h2 className="landing-heading landing-heading--center">
              YOUR COACH STAYS WITH YOU <span className="landing-display-blue">BETWEEN WORKOUTS</span>
            </h2>
            <p className="landing-comparison-subtitle">Text, voice, and in-app chat. Same coach. Same thread. Every day.</p>

            <div className="landing-messaging-grid">
              <div className="landing-messaging-column">
                <div className="landing-messaging-label landing-messaging-label--blue">
                  <span className="landing-icon-badge landing-icon-badge--blue" aria-hidden="true">
                    <MessageCircle size={36} />
                  </span>
                  <span>TEXT FROM ANYWHERE</span>
                </div>

                <ul className="landing-check-list landing-check-list--blue">
                  <li>SMS OR WHATSAPP, WHATEVER&apos;S EASIEST</li>
                  <li>DAILY CHECK-INS THAT FEEL HUMAN</li>
                  <li>NO CONTEXT LOST BETWEEN CHANNELS</li>
                </ul>

                <PhoneMock src={messagingLeft} alt="SMS coaching conversation" className="landing-phone--messaging" />
              </div>

              <div className="landing-messaging-column landing-messaging-column--right">
                <div className="landing-messaging-label landing-messaging-label--pink">
                  <span className="landing-icon-badge landing-icon-badge--pink" aria-hidden="true">
                    <Smartphone size={36} />
                  </span>
                  <span>
                    VOICE + <span className="landing-display-pink">IN-APP CHAT</span>
                  </span>
                </div>

                <ul className="landing-check-list landing-check-list--pink">
                  <li>TALK MID-SESSION WHEN THINGS CHANGE</li>
                  <li>UPDATE TRAINING ON THE SPOT</li>
                  <li>KEEP ACCOUNTABILITY ALIVE BETWEEN LIFTS</li>
                </ul>

                <PhoneMock src={messagingRight} alt="In-app coach chat" className="landing-phone--messaging" />
              </div>
            </div>
          </div>
        </section>

        <section id="workouts" data-wave-section="workouts" className="landing-section landing-section--workouts">
          <div className="landing-container landing-workouts">
            <div className="landing-workouts-visual">
              <PhoneMock src={exerciseLibrary} alt="Exercise library view" className="landing-phone--workout-left" />
              <PhoneMock src={splitRest} alt="Workout split view" className="landing-phone--workout-center" />
              <PhoneMock src={activityList} alt="Activity plan view" className="landing-phone--workout-right" />
            </div>

            <div className="landing-workouts-copy">
              <p className="landing-overline landing-overline--blue">COACH-BUILT PROGRAMMING</p>
              <h2 className="landing-display landing-display--section">
                <span>YOUR PLAN</span>
                <span>
                  ADAPTS <span className="landing-display-blue">WITH YOU</span>
                </span>
              </h2>
              <p className="landing-section-body">
                Traveling, short on time, or recovering from a rough week? Your coach adjusts your week in real time.
              </p>
            </div>
          </div>
        </section>

        <section id="comparison" data-wave-section="comparison" className="landing-section landing-section--comparison">
          <div className="landing-container landing-comparison">
            <h2 className="landing-heading landing-heading--center">
              THE BEST OF BOTH <span className="landing-display-blue">WORLDS</span>
            </h2>
            <p className="landing-comparison-subtitle landing-subheading-match">
              In-person trainers bring presence but limited access. Online coaching is asynchronous and often distant.
              Delirio combines live presence with everyday availability.
            </p>

            <div className="landing-comparison-matrix" role="table" aria-label="Coaching comparison table">
              <div className="landing-comparison-row landing-comparison-row--head" role="row">
                <div className="landing-comparison-cell landing-comparison-cell--label" role="columnheader" />
                <div className="landing-comparison-cell" role="columnheader">In-Person Trainer</div>
                <div className="landing-comparison-cell" role="columnheader">Online Coaching</div>
                <div className="landing-comparison-cell landing-comparison-cell--delirio" role="columnheader">Delirio</div>
              </div>

              {comparisonRows.map((row) => (
                <div key={row.label} className="landing-comparison-row" role="row">
                  <div className="landing-comparison-cell landing-comparison-cell--label" role="rowheader">
                    {row.label}
                  </div>
                  <div className="landing-comparison-cell" role="cell">{row.inPerson}</div>
                  <div className="landing-comparison-cell" role="cell">{row.online}</div>
                  <div className="landing-comparison-cell landing-comparison-cell--delirio" role="cell">{row.delirio}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="subscription" data-wave-section="subscription" className="landing-section landing-section--subscription">
          <div className="landing-container landing-subscription">
            <div className="landing-subscription-copy">
              <h2 className="landing-display landing-display--section">
                <span>SIMPLE</span>
                <span className="landing-display-blue">PRICING</span>
              </h2>
              <p className="landing-section-body">$50/month. Less than a single session with most trainers.</p>

              <div className="landing-pricing-card">
                <div className="landing-pricing-stat">
                  <span>$50</span>
                  <span>per month</span>
                </div>
                <p className="landing-pricing-context">Less than a single session with most trainers.</p>

                <div className="landing-pricing-actions">
                  <ul className="landing-check-list landing-check-list--blue landing-check-list--pricing">
                    <li>Personalized workout plans</li>
                    <li>Nutrition guidance</li>
                    <li>24/7 coach availability</li>
                    <li>Progress tracking</li>
                  </ul>

                  <a className="landing-outline-button landing-outline-button--full" href={APP_DOWNLOAD_URL} target="_blank" rel="noreferrer">
                    Download the app
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
                <a className="landing-app-badge-link" href={APP_DOWNLOAD_URL} target="_blank" rel="noreferrer">
                  <img className="landing-app-badge" src={appStoreBadge} alt="Download on the App Store" />
                </a>
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
                    style = {{
                      fontSize: 20
                    }}
                    type="button"
                    className={category === activeFaqCategory ? 'is-active' : ''}
                    onClick={() => handleFaqCategoryChange(category)}
                  >
                    {faqCategoryLabels[category]}
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

                <a className="landing-faq-more" href="mailto:contact@delirio.fit">
                  Still have a question? contact@delirio.fit
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact-capture" className="landing-section landing-section--warm-network">
          <div className="landing-container landing-warm-network">
            <div className="landing-warm-copy">
              <h2 className="landing-display landing-display--section landing-warm-title">
                <span>JOIN OUR</span>
                <span className="landing-display-blue">WARM NETWORK</span>
              </h2>
              <p className="landing-section-body landing-warm-body landing-subheading-match">
                No pressure. Drop your info and we&apos;ll keep you in the loop - launches, updates, and the occasional
                discount.
              </p>
            </div>

            <div className={`landing-warm-card ${isWarmSubmitSuccess ? 'is-success' : ''}`.trim()}>
              <div className="landing-warm-form-shell" aria-hidden={isWarmSubmitSuccess}>
                <Logo width="44" height="62" />
                <form className="landing-warm-form" onSubmit={handleWarmNetworkSubmit}>
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={warmName}
                      onChange={(event) => setWarmName(event.target.value)}
                      disabled={isWarmSubmitting}
                      required
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={warmEmail}
                      onChange={(event) => setWarmEmail(event.target.value)}
                      disabled={isWarmSubmitting}
                      required
                    />
                  </label>
                  <label>
                    <span>Phone Number</span>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={warmPhone}
                      onChange={(event) => setWarmPhone(event.target.value)}
                      disabled={isWarmSubmitting}
                      required
                    />
                  </label>
                  <button className="joinButton" type="submit" disabled={isWarmSubmitting}>
                    {isWarmSubmitting ? 'Submitting...' : 'Keep me in the loop'}
                  </button>
                  {warmSubmitError && <p className="landing-warm-form-status landing-warm-form-status--error">{warmSubmitError}</p>}
                </form>
              </div>

              <div className="landing-warm-success" aria-live="polite" aria-hidden={!isWarmSubmitSuccess}>
                <span className="landing-warm-success-ring">
                  <span className="landing-warm-success-check" aria-hidden="true">✓</span>
                </span>
                <p className="landing-warm-success-text">You&apos;re in. We&apos;ll keep you posted.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingSiteFooter />
    </div>
  );
}
