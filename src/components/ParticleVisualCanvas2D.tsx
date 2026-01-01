import { useEffect, useRef, useState } from "react";
import * as anime from "animejs";
import { defaultParticlePositions } from "./particle-defaults";
import deviceSVG from "../imports/device";
import { svgPathProperties } from "svg-path-properties";

interface Particle2D {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  angle: number;
  speed: number;
  originalX: number;
  originalY: number;
  phaseOffset: number;
}

interface ParticleVisualCanvas2DProps {
  color?: string;
  particleCount?: number;
  nodeScale?: number;
  }

// Helper to extract path data from the imported SVG React component
function extractPathDataFromDeviceSVG() {
  // deviceSVG is a React component, so we can render it to get the path data
  // This is a hacky but effective way for static SVGs
  const el = deviceSVG({});
  if (el && el.props && el.props.children) {
    const pathEl = Array.isArray(el.props.children)
      ? el.props.children.find((child: any) => child && child.type === 'path')
      : el.props.children;
    if (pathEl && pathEl.props && pathEl.props.d) {
      return pathEl.props.d;
    }
  }
  return null;
}

  export function ParticleVisualCanvas2D({
    color = "#FF6B35",
    particleCount = 420,
    nodeScale = 1.0,
  }: ParticleVisualCanvas2DProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle2D[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize particles
    useEffect(() => {
      const particles: Particle2D[] = [];
      const allPositions = defaultParticlePositions.slice(0, Math.min(particleCount, defaultParticlePositions.length));
      const minX = Math.min(...allPositions.map(p => p.cx));
      const maxX = Math.max(...allPositions.map(p => p.cx));
      const minY = Math.min(...allPositions.map(p => p.cy));
      const maxY = Math.max(...allPositions.map(p => p.cy));
      allPositions.forEach((pos) => {
        const normX = (pos.cx - minX) / (maxX - minX);
        const normY = (pos.cy - minY) / (maxY - minY);
        particles.push({
          x: normX,
          y: normY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: pos.r * nodeScale,
          opacity: 0.6 + Math.random() * 0.4,
          angle: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.3,
          originalX: normX,
          originalY: normY,
          phaseOffset: Math.random() * Math.PI * 2,
        });
      });
      particlesRef.current = particles;
      setIsInitialized(true);
    }, [particleCount, nodeScale]);

    // Animation loop
    useEffect(() => {
      if (!isInitialized || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      let animationId: number;
      let t = 0;
      const updateSize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      };
      updateSize();
      window.addEventListener("resize", updateSize);
      const animate = () => {
        t += 0.01;
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
        const particles = particlesRef.current;
        const paddingRatio = 0.08;
        const padX = rect.width * paddingRatio;
        const padY = rect.height * paddingRatio;
        const drawW = rect.width - padX * 2;
        const drawH = rect.height - padY * 2;
        particles.forEach((p, i) => {
          const breathing = Math.sin(t * 0.5 + p.phaseOffset) * 0.03;
          p.angle += p.speed * 0.01;
          const orbitRadius = 0.015;
          let normX = p.originalX + Math.cos(p.angle) * orbitRadius + breathing;
          let normY = p.originalY + Math.sin(p.angle) * orbitRadius + breathing;
          normX += Math.sin(t * 0.3 + p.phaseOffset) * 0.005;
          normY += Math.cos(t * 0.2 + p.phaseOffset * 1.5) * 0.005;
          const drawX = padX + normX * drawW;
          const drawY = padY + normY * drawH;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
          particles.forEach((p2, j) => {
            if (i < j) {
              const p2X = padX + p2.originalX * drawW;
              const p2Y = padY + p2.originalY * drawH;
              const dx = p2X - drawX;
              const dy = p2Y - drawY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 60) {
                const opacity = (1 - dist / 60) * 0.15;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          });
        });
        animationId = requestAnimationFrame(animate);
      };
      animate();
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", updateSize);
      };
    }, [isInitialized, color]);

    // Morph demo: morph all particles to align along SVG path, triggered on load
    useEffect(() => {
      if (isInitialized) {
        try {
          const particles = particlesRef.current;
          if (!particles.length) return;
          const pathData = extractPathDataFromDeviceSVG();
          if (!pathData) return;
          const properties = new svgPathProperties(pathData);
          const pathLength = properties.getTotalLength();
          // Sample points along the path for each particle
          for (let i = 0; i < particles.length; i++) {
            const t = i / particles.length;
            const point = properties.getPointAtLength(t * pathLength);
            // Normalize to [0,1] for canvas drawing
            const normX = (point.x - 0) / 256; // viewBox width
            const normY = (point.y - 0) / 256; // viewBox height
            anime({
              targets: particles[i],
              x: normX,
              y: normY,
              radius: 3 * (typeof nodeScale === 'number' ? nodeScale : 1), // uniform radius
              duration: 1200,
              easing: 'easeInOutQuad',
            });
          }
        } catch (err) {
          // Optionally log or handle error
          console.error('Morph to SVG path failed:', err);
        }
      }
    }, [isInitialized, nodeScale]);

    return (
      <div className="w-full h-full relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ minHeight: "400px" }}
        />
        {/* Morph to Logo now triggers on load, button removed */}
      </div>
    );
  }
