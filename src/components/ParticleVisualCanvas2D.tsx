import { useEffect, useRef, useState } from "react";
import { defaultParticlePositions } from "./particle-defaults";

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
    console.log("🎨 Canvas2D: Initializing particle system...");

    const particles: Particle2D[] = [];
    

    // Find bounds of all cx/cy
    const allPositions = defaultParticlePositions.slice(0, Math.min(particleCount, defaultParticlePositions.length));
    const minX = Math.min(...allPositions.map(p => p.cx));
    const maxX = Math.max(...allPositions.map(p => p.cx));
    const minY = Math.min(...allPositions.map(p => p.cy));
    const maxY = Math.max(...allPositions.map(p => p.cy));

    // Padding as percent of canvas size
    const paddingRatio = 0.08;

    allPositions.forEach((pos, i) => {
      // Normalized [0,1]
      const normX = (pos.cx - minX) / (maxX - minX);
      const normY = (pos.cy - minY) / (maxY - minY);
      // Will be mapped to canvas size in animation loop
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
    console.log(`✅ Canvas2D: Created ${particles.length} particles`);
  }, [particleCount, nodeScale]);

  // Animation loop
  useEffect(() => {
    if (!isInitialized || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    // Set canvas size
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

  // Padding in px
  const paddingRatio = 0.08;
  const padX = rect.width * paddingRatio;
  const padY = rect.height * paddingRatio;
  const drawW = rect.width - padX * 2;
  const drawH = rect.height - padY * 2;

      // Update and draw particles
      particles.forEach((p, i) => {
        // Breathing animation
        const breathing = Math.sin(t * 0.5 + p.phaseOffset) * 0.03;

        // Gentle orbital motion
        p.angle += p.speed * 0.01;
        const orbitRadius = 0.015;
        let normX = p.originalX + Math.cos(p.angle) * orbitRadius + breathing;
        let normY = p.originalY + Math.sin(p.angle) * orbitRadius + breathing;

        // Add some drift
        normX += Math.sin(t * 0.3 + p.phaseOffset) * 0.005;
        normY += Math.cos(t * 0.2 + p.phaseOffset * 1.5) * 0.005;

        // Map normalized [0,1] to canvas coordinates
        const drawX = padX + normX * drawW;
        const drawY = padY + normY * drawH;

        // Draw particle
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Draw connections to nearby particles
        particles.forEach((p2, j) => {
          if (i < j) {
            // Map p2 as well
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

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ minHeight: "400px" }}
      />
      {isInitialized && (
        <>   </>
        /*
        <div className="absolute top-4 left-4 text-xs opacity-30 font-mono bg-green-500/20 px-2 py-1 rounded">
          ✅ {particlesRef.current.length} particles (Canvas2D)
        </div>
        */
      
      )}
    </div>
  );
}
