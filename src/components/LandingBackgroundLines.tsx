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
  waveBehaviour?: boolean;
};

const defaultBluePath =
  'M-80 250C230 20 470 44 760 330C1060 622 1320 656 1660 462C1800 382 1910 330 2000 338';

const defaultPinkPath =
  'M-80 760C190 910 460 914 760 730C1010 580 1286 466 1562 540C1740 588 1886 690 2000 792';

const pathNumberPattern = /-?\d*\.?\d+/g;
const pathMorphDurationMs = 1000;
const waveWavelengthPx = 600;
const waveTravelCycleMs = 4200;
const waveEnvelopeCycleMs = 9000;
const waveSmoothing = 0.065;
const maxWaveAmplitudePx = 100;
const idleWaveStrength = 0.28;
const activeWaveStrength = 1;

const waveNumber = (1 * Math.PI) / waveWavelengthPx;
const waveAngularVelocity = (2 * Math.PI) / waveTravelCycleMs;
const waveEnvelopeAngularVelocity = (2 * Math.PI) / waveEnvelopeCycleMs;
const waveSamplesPerSegment = 48;
const sampledPathCache = new Map<string, { x: number; y: number }[]>();
const maxSampledPathCacheEntries = 24;

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

function cubicBezierPoint(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number,
) {
  const inverseT = 1 - t;
  const inverseT2 = inverseT * inverseT;
  const inverseT3 = inverseT2 * inverseT;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x:
      inverseT3 * p0.x +
      3 * inverseT2 * t * p1.x +
      3 * inverseT * t2 * p2.x +
      t3 * p3.x,
    y:
      inverseT3 * p0.y +
      3 * inverseT2 * t * p1.y +
      3 * inverseT * t2 * p2.y +
      t3 * p3.y,
  };
}

function sampleCubicPath(path: string): { x: number; y: number }[] | null {
  const values = getPathNumbers(path);

  if (values.length < 8) {
    return null;
  }

  const remaining = values.length - 2;
  if (remaining % 6 !== 0) {
    return null;
  }

  const startPoint = { x: values[0], y: values[1] };
  const sampledPoints = [startPoint];
  let anchorPoint = startPoint;
  let cursor = 2;

  while (cursor + 5 < values.length) {
    const controlA = { x: values[cursor], y: values[cursor + 1] };
    const controlB = { x: values[cursor + 2], y: values[cursor + 3] };
    const endPoint = { x: values[cursor + 4], y: values[cursor + 5] };

    for (let index = 1; index <= waveSamplesPerSegment; index += 1) {
      const t = index / waveSamplesPerSegment;
      sampledPoints.push(cubicBezierPoint(anchorPoint, controlA, controlB, endPoint, t));
    }

    anchorPoint = endPoint;
    cursor += 6;
  }

  return sampledPoints;
}

function getSampledPath(path: string): { x: number; y: number }[] | null {
  const cachedPoints = sampledPathCache.get(path);
  if (cachedPoints) {
    return cachedPoints;
  }

  const sampledPoints = sampleCubicPath(path);
  if (!sampledPoints) {
    return null;
  }

  sampledPathCache.set(path, sampledPoints);

  if (sampledPathCache.size > maxSampledPathCacheEntries) {
    const oldestKey = sampledPathCache.keys().next().value;
    if (typeof oldestKey === 'string') {
      sampledPathCache.delete(oldestKey);
    }
  }

  return sampledPoints;
}

function composePolylinePath(points: { x: number; y: number }[]): string {
  if (!points.length) {
    return '';
  }

  const firstPoint = points[0];
  let result = `M${Math.round(firstPoint.x * 1000) / 1000} ${Math.round(firstPoint.y * 1000) / 1000}`;

  for (let index = 1; index < points.length; index += 1) {
    const point = points[index];
    const roundedX = Math.round(point.x * 1000) / 1000;
    const roundedY = Math.round(point.y * 1000) / 1000;
    result += `L${roundedX} ${roundedY}`;
  }

  return result;
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

  const points = getSampledPath(path);
  if (!points || points.length < 4) {
    return path;
  }

  const envelopeAmplitude = Math.sin(timeMs * waveEnvelopeAngularVelocity + envelopePhaseOffset);
  const signedAmplitude = amplitude * strength * envelopeAmplitude;
  const lastPointIndex = points.length - 1;
  const warpedPoints = points.map((point, pointIndex) => {
    const edgeProgress = pointIndex / lastPointIndex;
    const edgeFade = Math.pow(Math.sin(edgeProgress * Math.PI), 0.9);
    const travelPhase = point.x * waveNumber - timeMs * waveAngularVelocity + phaseOffset;
    const harmonic = Math.sin(travelPhase);
    const yOffset = signedAmplitude * edgeFade * harmonic;

    return {
      x: point.x,
      y: point.y + yOffset,
    };
  });

  return composePolylinePath(warpedPoints);
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
  waveBehaviour = true,
}: LandingBackgroundLinesProps) {
  const [animatedBluePath, setAnimatedBluePath] = useState(bluePath);
  const [animatedPinkPath, setAnimatedPinkPath] = useState(pinkPath);
  const [displayBluePath, setDisplayBluePath] = useState(bluePath);
  const [displayPinkPath, setDisplayPinkPath] = useState(pinkPath);
  const bluePathRef = useRef(bluePath);
  const pinkPathRef = useRef(pinkPath);
  const blueMorphRafRef = useRef<number | null>(null);
  const pinkMorphRafRef = useRef<number | null>(null);
  const waveRafRef = useRef<number | null>(null);
  const blueWaveStrengthRef = useRef(0);
  const pinkWaveStrengthRef = useRef(0);
  const travelBlueRef = useRef(travelBlue);
  const travelPinkRef = useRef(travelPink);
  const waveBehaviourRef = useRef(waveBehaviour);

  useEffect(() => {
    travelBlueRef.current = travelBlue;
  }, [travelBlue]);

  useEffect(() => {
    travelPinkRef.current = travelPink;
  }, [travelPink]);

  useEffect(() => {
    waveBehaviourRef.current = waveBehaviour;
  }, [waveBehaviour]);

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
    if ((waveRafRef.current === null || !waveBehaviourRef.current) && !travelBlueRef.current) {
      setDisplayBluePath(animatedBluePath);
    }
  }, [animatedBluePath]);

  useEffect(() => {
    if ((waveRafRef.current === null || !waveBehaviourRef.current) && !travelPinkRef.current) {
      setDisplayPinkPath(animatedPinkPath);
    }
  }, [animatedPinkPath]);

  useEffect(() => {
    if (!waveBehaviour) {
      if (waveRafRef.current !== null) {
        cancelAnimationFrame(waveRafRef.current);
        waveRafRef.current = null;
      }

      blueWaveStrengthRef.current = 0;
      pinkWaveStrengthRef.current = 0;
      setDisplayBluePath(bluePathRef.current);
      setDisplayPinkPath(pinkPathRef.current);
      return;
    }

    if (waveRafRef.current !== null) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      blueWaveStrengthRef.current = 0;
      pinkWaveStrengthRef.current = 0;
      setDisplayBluePath(bluePathRef.current);
      setDisplayPinkPath(pinkPathRef.current);
      return;
    }

    const tick = (timestamp: number) => {
      if (!waveBehaviourRef.current) {
        blueWaveStrengthRef.current = 0;
        pinkWaveStrengthRef.current = 0;
        waveRafRef.current = null;
        setDisplayBluePath(bluePathRef.current);
        setDisplayPinkPath(pinkPathRef.current);
        return;
      }

      const blueTarget = travelBlueRef.current ? activeWaveStrength : idleWaveStrength;
      const blueCurrent = blueWaveStrengthRef.current;
      const blueNextStrength = blueCurrent + (blueTarget - blueCurrent) * waveSmoothing;
      blueWaveStrengthRef.current = blueNextStrength;

      const pinkTarget = travelPinkRef.current ? activeWaveStrength : idleWaveStrength;
      const pinkCurrent = pinkWaveStrengthRef.current;
      const pinkNextStrength = pinkCurrent + (pinkTarget - pinkCurrent) * waveSmoothing;
      pinkWaveStrengthRef.current = pinkNextStrength;

      const blueBasePath = bluePathRef.current;
      const pinkBasePath = pinkPathRef.current;

      const nextBluePath =
        blueNextStrength <= 0.001
          ? blueBasePath
          : applyTravelingWave({
              path: blueBasePath,
              timeMs: timestamp,
              strength: blueNextStrength,
              amplitude: maxWaveAmplitudePx,
              phaseOffset: 0,
              envelopePhaseOffset: 0,
            });

      const nextPinkPath =
        pinkNextStrength <= 0.001
          ? pinkBasePath
          : applyTravelingWave({
              path: pinkBasePath,
              timeMs: timestamp,
              strength: pinkNextStrength,
              amplitude: maxWaveAmplitudePx,
              phaseOffset: Math.PI / 3,
              envelopePhaseOffset: Math.PI / 2,
            });

      setDisplayBluePath(nextBluePath);
      setDisplayPinkPath(nextPinkPath);

      waveRafRef.current = requestAnimationFrame(tick);
    };

    waveRafRef.current = requestAnimationFrame(tick);
  }, [waveBehaviour]);

  useEffect(() => {
    return () => {
      if (blueMorphRafRef.current !== null) {
        cancelAnimationFrame(blueMorphRafRef.current);
      }

      if (pinkMorphRafRef.current !== null) {
        cancelAnimationFrame(pinkMorphRafRef.current);
      }

      if (waveRafRef.current !== null) {
        cancelAnimationFrame(waveRafRef.current);
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
