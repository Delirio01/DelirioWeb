import { useEffect, useRef, useState, type CSSProperties } from 'react';

type LandingBackgroundLinesProps = {
  className?: string;
  bluePath?: string;
  pinkPath?: string;
  blueAmplitude?: number;
  pinkAmplitude?: number;
  blueShiftX?: number;
  blueShiftY?: number;
  pinkShiftX?: number;
  pinkShiftY?: number;
  blueScaleX?: number;
  pinkScaleX?: number;
  blueRotate?: number;
  pinkRotate?: number;
  travelBlue?: boolean;
  travelPink?: boolean;
};

const defaultBluePath =
  'M-80 250C230 20 470 44 760 330C1060 622 1320 656 1660 462C1800 382 1910 330 2000 338';

const defaultPinkPath =
  'M-80 760C190 910 460 914 760 730C1010 580 1286 466 1562 540C1740 588 1886 690 2000 792';

const pathNumberPattern = /-?\d*\.?\d+/g;
const pathMorphDurationMs = 760;
const waveWavelengthPx = 600;
const waveTravelCycleMs = 2800;
const waveEnvelopeCycleMs = 5200;
const waveSmoothing = 0.1;
const maxWaveAmplitudePx = 42;

const waveNumber = (2 * Math.PI) / waveWavelengthPx;
const waveAngularVelocity = (2 * Math.PI) / waveTravelCycleMs;
const waveEnvelopeAngularVelocity = (2 * Math.PI) / waveEnvelopeCycleMs;

function getPathNumbers(path: string): number[] {
  const matches = path.match(pathNumberPattern);
  return matches ? matches.map(Number) : [];
}

function composePath(templateParts: string[], values: number[]): string {
  let result = templateParts[0] ?? '';

  values.forEach((value, index) => {
    const rounded = Math.round(value * 1000) / 1000;
    result += `${rounded}${templateParts[index + 1] ?? ''}`;
  });

  return result;
}

function easeInOutCubic(progress: number): number {
  if (progress < 0.5) {
    return 4 * progress * progress * progress;
  }

  const shifted = -2 * progress + 2;
  return 1 - (shifted * shifted * shifted) / 2;
}

function morphPath({
  fromPath,
  toPath,
  rafRef,
  onUpdate,
}: {
  fromPath: string;
  toPath: string;
  rafRef: { current: number | null };
  onUpdate: (nextPath: string) => void;
}) {
  const fromNumbers = getPathNumbers(fromPath);
  const toNumbers = getPathNumbers(toPath);

  if (!fromNumbers.length || fromNumbers.length !== toNumbers.length) {
    onUpdate(toPath);
    rafRef.current = null;
    return;
  }

  const templateParts = toPath.split(pathNumberPattern);
  let startTime = 0;

  const tick = (timestamp: number) => {
    if (!startTime) {
      startTime = timestamp;
    }

    const progress = Math.min((timestamp - startTime) / pathMorphDurationMs, 1);
    const easedProgress = easeInOutCubic(progress);

    const mixedValues = fromNumbers.map(
      (value, index) => value + (toNumbers[index] - value) * easedProgress,
    );

    onUpdate(composePath(templateParts, mixedValues));

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    onUpdate(toPath);
    rafRef.current = null;
  };

  rafRef.current = requestAnimationFrame(tick);
}

function applyTravelingWave({
  path,
  timeMs,
  strength,
  amplitude,
  phaseOffset = 0,
  envelopePhaseOffset = 0,
}: {
  path: string;
  timeMs: number;
  strength: number;
  amplitude: number;
  phaseOffset?: number;
  envelopePhaseOffset?: number;
}) {
  if (strength <= 0) {
    return path;
  }

  const values = getPathNumbers(path);

  if (values.length < 4) {
    return path;
  }

  const templateParts = path.split(pathNumberPattern);
  const envelopeAmplitude = Math.sin(timeMs * waveEnvelopeAngularVelocity + envelopePhaseOffset);
  const signedAmplitude = amplitude * strength * envelopeAmplitude;

  for (let index = 1; index < values.length; index += 2) {
    const x = values[index - 1];
    const originalY = values[index];

    // Right-traveling wave with a signed amplitude envelope:
    // high -> zero -> negative -> zero -> high.
    const travelPhase = x * waveNumber - timeMs * waveAngularVelocity + phaseOffset;
    const spatialEnvelope = 0.64 + 0.36 * Math.sin(x * waveNumber * 0.52 + phaseOffset);
    const harmonic =
      (Math.sin(travelPhase) + 0.24 * Math.sin(travelPhase * 0.5 + phaseOffset * 0.35)) / 1.24;
    const yOffset = signedAmplitude * spatialEnvelope * harmonic;

    values[index] = originalY + yOffset;
  }

  return composePath(templateParts, values);
}

export default function LandingBackgroundLines({
  className = '',
  bluePath = defaultBluePath,
  pinkPath = defaultPinkPath,
  blueAmplitude = 1,
  pinkAmplitude = 1,
  blueShiftX = 0,
  blueShiftY = 0,
  pinkShiftX = 0,
  pinkShiftY = 0,
  blueScaleX = 1,
  pinkScaleX = 1,
  blueRotate = 0,
  pinkRotate = 0,
  travelBlue = false,
  travelPink = false,
}: LandingBackgroundLinesProps) {
  const [animatedBluePath, setAnimatedBluePath] = useState(bluePath);
  const [animatedPinkPath, setAnimatedPinkPath] = useState(pinkPath);
  const [displayBluePath, setDisplayBluePath] = useState(bluePath);
  const [displayPinkPath, setDisplayPinkPath] = useState(pinkPath);
  const bluePathRef = useRef(bluePath);
  const pinkPathRef = useRef(pinkPath);
  const blueMorphRafRef = useRef<number | null>(null);
  const pinkMorphRafRef = useRef<number | null>(null);
  const blueWaveRafRef = useRef<number | null>(null);
  const pinkWaveRafRef = useRef<number | null>(null);
  const blueWaveStrengthRef = useRef(0);
  const pinkWaveStrengthRef = useRef(0);
  const travelBlueRef = useRef(travelBlue);
  const travelPinkRef = useRef(travelPink);

  useEffect(() => {
    travelBlueRef.current = travelBlue;
  }, [travelBlue]);

  useEffect(() => {
    travelPinkRef.current = travelPink;
  }, [travelPink]);

  useEffect(() => {
    if (bluePathRef.current === bluePath) {
      return;
    }

    if (blueMorphRafRef.current !== null) {
      cancelAnimationFrame(blueMorphRafRef.current);
      blueMorphRafRef.current = null;
    }

    morphPath({
      fromPath: bluePathRef.current,
      toPath: bluePath,
      rafRef: blueMorphRafRef,
      onUpdate: (nextPath) => {
        bluePathRef.current = nextPath;
        setAnimatedBluePath(nextPath);
      },
    });
  }, [bluePath]);

  useEffect(() => {
    if (pinkPathRef.current === pinkPath) {
      return;
    }

    if (pinkMorphRafRef.current !== null) {
      cancelAnimationFrame(pinkMorphRafRef.current);
      pinkMorphRafRef.current = null;
    }

    morphPath({
      fromPath: pinkPathRef.current,
      toPath: pinkPath,
      rafRef: pinkMorphRafRef,
      onUpdate: (nextPath) => {
        pinkPathRef.current = nextPath;
        setAnimatedPinkPath(nextPath);
      },
    });
  }, [pinkPath]);

  useEffect(() => {
    if (blueWaveRafRef.current === null && !travelBlueRef.current) {
      setDisplayBluePath(animatedBluePath);
    }
  }, [animatedBluePath]);

  useEffect(() => {
    if (pinkWaveRafRef.current === null && !travelPinkRef.current) {
      setDisplayPinkPath(animatedPinkPath);
    }
  }, [animatedPinkPath]);

  useEffect(() => {
    if (!travelBlue && blueWaveRafRef.current === null) {
      blueWaveStrengthRef.current = 0;
      setDisplayBluePath(bluePathRef.current);
      return;
    }

    if (!travelBlue || blueWaveRafRef.current !== null) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      blueWaveStrengthRef.current = 0;
      setDisplayBluePath(bluePathRef.current);
      return;
    }

    const tick = (timestamp: number) => {
      const target = travelBlueRef.current ? 1 : 0;
      const current = blueWaveStrengthRef.current;
      const nextStrength = current + (target - current) * waveSmoothing;
      blueWaveStrengthRef.current = nextStrength;

      const basePath = bluePathRef.current;
      const nextPath =
        nextStrength <= 0.001
          ? basePath
          : applyTravelingWave({
              path: basePath,
              timeMs: timestamp,
              strength: nextStrength,
              amplitude: maxWaveAmplitudePx,
              phaseOffset: 0,
              envelopePhaseOffset: 0,
            });

      setDisplayBluePath(nextPath);

      if (target > 0 || nextStrength > 0.002) {
        blueWaveRafRef.current = requestAnimationFrame(tick);
        return;
      }

      blueWaveStrengthRef.current = 0;
      blueWaveRafRef.current = null;
      setDisplayBluePath(basePath);
    };

    blueWaveRafRef.current = requestAnimationFrame(tick);
  }, [travelBlue]);

  useEffect(() => {
    if (!travelPink && pinkWaveRafRef.current === null) {
      pinkWaveStrengthRef.current = 0;
      setDisplayPinkPath(pinkPathRef.current);
      return;
    }

    if (!travelPink || pinkWaveRafRef.current !== null) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pinkWaveStrengthRef.current = 0;
      setDisplayPinkPath(pinkPathRef.current);
      return;
    }

    const tick = (timestamp: number) => {
      const target = travelPinkRef.current ? 1 : 0;
      const current = pinkWaveStrengthRef.current;
      const nextStrength = current + (target - current) * waveSmoothing;
      pinkWaveStrengthRef.current = nextStrength;

      const basePath = pinkPathRef.current;
      const nextPath =
        nextStrength <= 0.001
          ? basePath
          : applyTravelingWave({
              path: basePath,
              timeMs: timestamp,
              strength: nextStrength,
              amplitude: maxWaveAmplitudePx,
              phaseOffset: Math.PI / 3,
              envelopePhaseOffset: Math.PI / 2,
            });

      setDisplayPinkPath(nextPath);

      if (target > 0 || nextStrength > 0.002) {
        pinkWaveRafRef.current = requestAnimationFrame(tick);
        return;
      }

      pinkWaveStrengthRef.current = 0;
      pinkWaveRafRef.current = null;
      setDisplayPinkPath(basePath);
    };

    pinkWaveRafRef.current = requestAnimationFrame(tick);
  }, [travelPink]);

  useEffect(() => {
    return () => {
      if (blueMorphRafRef.current !== null) {
        cancelAnimationFrame(blueMorphRafRef.current);
      }

      if (pinkMorphRafRef.current !== null) {
        cancelAnimationFrame(pinkMorphRafRef.current);
      }

      if (blueWaveRafRef.current !== null) {
        cancelAnimationFrame(blueWaveRafRef.current);
      }

      if (pinkWaveRafRef.current !== null) {
        cancelAnimationFrame(pinkWaveRafRef.current);
      }
    };
  }, []);

  const style = {
    '--landing-blue-amp': String(blueAmplitude),
    '--landing-pink-amp': String(pinkAmplitude),
    '--landing-blue-shift-x': `${blueShiftX}%`,
    '--landing-blue-shift-y': `${blueShiftY}%`,
    '--landing-pink-shift-x': `${pinkShiftX}%`,
    '--landing-pink-shift-y': `${pinkShiftY}%`,
    '--landing-blue-scale-x': String(blueScaleX),
    '--landing-pink-scale-x': String(pinkScaleX),
    '--landing-blue-rotate': `${blueRotate}deg`,
    '--landing-pink-rotate': `${pinkRotate}deg`,
  } as CSSProperties;

  return (
    <div aria-hidden="true" className={`landing-background-lines ${className}`.trim()} style={style}>
      <svg className="landing-background-lines-svg" viewBox="0 0 1920 1000" preserveAspectRatio="none">
        <g className="landing-background-track landing-background-track--blue">
          <path
            className="landing-background-line landing-background-line--blue"
            d={displayBluePath}
          />
        </g>
        <g className="landing-background-track landing-background-track--pink">
          <path
            className="landing-background-line landing-background-line--pink"
            d={displayPinkPath}
          />
        </g>
      </svg>
    </div>
  );
}
