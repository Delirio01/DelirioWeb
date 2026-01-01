import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { defaultParticlePositions } from "./particle-defaults";
import { ParticleVisualCanvas2D } from "./ParticleVisualCanvas2D";

interface ParticleNode {
  id: number;
  mesh: THREE.Mesh;
  // Original sphere position
  basePosition: THREE.Vector3;
  // Current position with physics
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  // Car-like driving physics
  heading: THREE.Vector3; // Direction the particle is "facing"
  speed: number; // Forward speed
  turnRate: number; // How fast it can turn
  // Entropy/chaos properties
  randomSeed: number;
  phaseOffset: number;
  turbulence: THREE.Vector3;
  driftAngle: number;
  wobbleSpeed: number;
  baseRadius: number;
  sphericalCoords: { theta: number; phi: number; r: number };
}

// 2D Canvas fallback particle
interface Particle2D {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  angle: number;
  speed: number;
  baseX: number;
  baseY: number;
}

interface ParticleVisualProps {
  color?: string;
  particleCount?: number;
  nodeScale?: number;
}

export function ParticleVisual({
  color = "#FF6B35",
  particleCount = 200,
  nodeScale = 1.0,
}: ParticleVisualProps) {
  // Check WebGL support BEFORE any hooks
  const [useCanvas2D, setUseCanvas2D] = useState(() => {
    try {
      const canvas = document.createElement("canvas");

      const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
      if (!gl) {
        console.log("⚠️ WebGL not available, using Canvas2D");
        return true;
      }

      // Check for software renderer
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter((debugInfo as any).UNMASKED_RENDERER_WEBGL) as string;
        if (
          renderer.includes("SwiftShader") ||
          renderer.includes("llvmpipe")
        ) {
          console.log(
            "⚠️ Software renderer detected, using Canvas2D for better performance",
          );
          return true;
        }
      }

      return false;
    } catch (e) {
      console.log("⚠️ WebGL check failed, using Canvas2D", e);
      return true;
    }
  });

  // Early return BEFORE other hooks if using Canvas2D
  if (useCanvas2D) {
    return (
      <ParticleVisualCanvas2D
        color={color}
        particleCount={particleCount}
        nodeScale={nodeScale}
      />
    );
  }

  // Now all the other hooks for Three.js
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(
    null,
  );
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<ParticleNode[]>([]);
  const linesRef = useRef<THREE.Line[]>([]);
  const lineMaterialRef =
    useRef<THREE.LineBasicMaterial | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Initialize Three.js scene
  useEffect(() => {
    console.log("🚀 ParticleVisual: Starting initialization...");

    if (!containerRef.current) {
      console.log("❌ ParticleVisual: No container ref");
      return;
    }

    console.log("✅ ParticleVisual: Container exists", {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      isVisible: containerRef.current.offsetParent !== null,
    });

    try {
      // Scene setup
      console.log("📦 Creating Three.js scene...");
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      console.log("📸 Setting up camera...");
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth /
          containerRef.current.clientHeight,
        0.1,
        1000,
      );
      camera.position.z = 35;
      cameraRef.current = camera;

      // Renderer setup with error handling
      console.log("🎨 Setting up renderer...");
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
        failIfMajorPerformanceCaveat: false, // Allow software rendering
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2),
      ); // Cap pixel ratio
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      console.log(
        "ParticleVisual: Renderer created successfully",
        {
          canvas: renderer.domElement,
        },
      );

      // Create particles from default positions (company logo)
      const particles: ParticleNode[] = [];

      // Convert hex color to THREE.Color
      const particleColor = new THREE.Color(color);

      // Calculate center and scale from default positions
      const centerX = 300; // Approximate center of 0-600 range
      const centerY = 300;
  const scale = 0.03; // Smaller scale for 3D units
      const rotationAngle = 90 * (Math.PI / 180); // 90 degrees in radians

      for (
        let i = 0;
        i <
        Math.min(
          particleCount,
          defaultParticlePositions.length,
        );
        i++
      ) {
        const def = defaultParticlePositions[i];

        // Convert 2D position to centered coordinates
        const xCentered = def.cx - centerX;
        const yCentered = def.cy - centerY;

        // Rotate by -45 degrees
        const xRotated =
          xCentered * Math.cos(rotationAngle) -
          yCentered * Math.sin(rotationAngle);
        const yRotated =
          xCentered * Math.sin(rotationAngle) +
          yCentered * Math.cos(rotationAngle);

        // Scale to 3D coordinates
        const x2d = xRotated * scale;
        const y2d = -yRotated * scale; // Invert Y for 3D space

        // Map to sphere surface using existing position as guide
        const dist2d = Math.sqrt(x2d * x2d + y2d * y2d);
        const maxDist = 15; // Max radius for sphere

        // Calculate spherical position
        const theta = Math.atan2(y2d, x2d);
        const radiusVariation =
          Math.min(1.0, dist2d / 15) *
          maxDist *
          (0.8 + Math.random() * 0.4);

        // Add Z component to create sphere
        const phi =
          (i / defaultParticlePositions.length) * Math.PI; // Distribute across sphere depth

        const x =
          radiusVariation * Math.cos(theta) * Math.sin(phi);
        const y =
          radiusVariation * Math.sin(theta) * Math.sin(phi);
        const z = radiusVariation * Math.cos(phi) * 0.8; // Flatten slightly

        // Create sphere geometry for each particle
        const particleSize = (def.r / 6) * nodeScale; // Scale radius appropriately
        const geometry = new THREE.SphereGeometry(
          particleSize,
          8,
          8,
        );

        // Material with emissive glow
        const material = new THREE.MeshBasicMaterial({
          color: particleColor,
          transparent: true,
          opacity: 0.6 + Math.random() * 0.4,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        scene.add(mesh);

        // Random initial heading
        const randomHeading = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).normalize();

        particles.push({
          id: i,
          mesh,
          basePosition: new THREE.Vector3(x, y, z),
          position: new THREE.Vector3(x, y, z),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
          ),
          heading: randomHeading,
          speed: Math.random() * 0.03 + 0.02, // Slower initial speed
          turnRate: Math.random() * 0.03 + 0.01, // Slower turn rate
          randomSeed: Math.random(),
          phaseOffset: Math.random() * Math.PI * 2,
          turbulence: new THREE.Vector3(0, 0, 0),
          driftAngle: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.5 + 0.5,
          baseRadius: radiusVariation,
          sphericalCoords: { theta, phi, r: radiusVariation },
        });
      }

      particlesRef.current = particles;

      console.log(
        "ParticleVisual: Created",
        particles.length,
        "particles",
      );

      // Create shared line material
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.2,
      });
      lineMaterialRef.current = lineMaterial;

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !camera || !renderer)
          return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleResize);

      setIsInitialized(true);
      console.log("ParticleVisual: Initialization complete!");

      return () => {
        window.removeEventListener("resize", handleResize);

        // Cleanup
        particles.forEach((p) => {
          scene.remove(p.mesh);
          p.mesh.geometry.dispose();
          (p.mesh.material as THREE.Material).dispose();
        });

        linesRef.current.forEach((line) => {
          scene.remove(line);
          line.geometry.dispose();
        });

        if (lineMaterialRef.current) {
          lineMaterialRef.current.dispose();
        }

        if (
          containerRef.current &&
          renderer.domElement.parentElement ===
            containerRef.current
        ) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (error) {
      console.error(
        "Error initializing Three.js scene:",
        error,
      );
      setHasError(true);
    }
  }, [particleCount, color, nodeScale]);

  // IntersectionObserver to pause animation when not visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: "100px", // Start animating slightly before visible
      },
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Animation loop with hive mind physics
  useEffect(() => {
    if (!isInitialized || !isVisible) return; // Only animate when visible

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const particles = particlesRef.current;

    if (
      !scene ||
      !camera ||
      !renderer ||
      particles.length === 0
    )
      return;

    let animationFrameId: number;
    let t = 0;

    // Physics parameters
    const breathingFreq = 0.5;
    const breathingAmp = 0.3;
    const flowSpeed = 0.02;
    const flowStrength = 2.0;

    // Simple value noise function
    const valueNoise = (x: number, y: number, z: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;

      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);

      const u = x * x * (3 - 2 * x);
      const v = y * y * (3 - 2 * y);
      const w = z * z * (3 - 2 * z);

      const hash = (i: number) => {
        i = (i << 13) ^ i;
        return (
          ((i * (i * i * 15731 + 789221) + 1376312589) &
            0x7fffffff) /
          0x7fffffff
        );
      };

      const a = hash(X + Y * 57 + Z * 113);
      const b = hash(X + 1 + Y * 57 + Z * 113);

      return a * (1 - u) + b * u;
    };

    const animate = () => {
      t += 0.01;

      // Slowly orbit camera
      const cameraOrbitSpeed = 0.03;
      const cameraRadius = 35;
      camera.position.x =
        Math.sin(t * cameraOrbitSpeed) * cameraRadius * 0.3;
      camera.position.y =
        Math.cos(t * cameraOrbitSpeed * 0.7) *
        cameraRadius *
        0.2;
      camera.lookAt(0, 0, 0);

      // Update particle physics with hive mind
      particles.forEach((p, i) => {
        // CAR-LIKE DRIVING PHYSICS

        // Slow unique time for each particle
        const uniqueTime =
          t * p.wobbleSpeed * 0.1 + p.phaseOffset;

        // Multi-layered noise for steering decisions
        const noise1 = valueNoise(
          p.position.x * 0.02 + t * 0.03,
          p.position.y * 0.02 + t * 0.025,
          p.randomSeed * 100,
        );
        const noise2 = valueNoise(
          p.position.x * 0.05 + t * 0.02,
          p.position.y * 0.05 + t * 0.03,
          p.randomSeed * 200,
        );
        const noise3 = valueNoise(
          uniqueTime * 0.1,
          p.id * 0.02,
          t * 0.015,
        );

        // STEERING: Gradually turn based on noise and goals
        const steeringNoise =
          (noise1 + noise2 * 0.5 + noise3 * 0.3) * 0.05;

        // Calculate desired direction (towards orbital flow)
        const collectiveFlow = t * flowSpeed * 0.05;
        const targetAngle =
          collectiveFlow +
          Math.sin(collectiveFlow + noise3 * 0.5) *
            (flowStrength * 0.1);

        // Get tangent direction for orbital movement (perpendicular to radius)
        const toCenter = p.position.clone().normalize();
        const orbitalTangent = new THREE.Vector3(
          -toCenter.y,
          toCenter.x,
          toCenter.z * 0.1,
        ).normalize();

        // Add some vertical component for 3D movement
        const upDownBias = Math.sin(uniqueTime * 0.2) * 0.3;
        orbitalTangent.z += upDownBias;
        orbitalTangent.normalize();

        // Blend current heading towards desired direction (gradual steering)
        const desiredHeading = orbitalTangent.clone();
        desiredHeading.add(
          new THREE.Vector3(
            noise1 * 0.2,
            noise2 * 0.2,
            noise3 * 0.2,
          ),
        );
        desiredHeading.normalize();

        // Slowly turn towards desired heading
        p.heading.lerp(desiredHeading, p.turnRate);
        p.heading.normalize();

        // SPEED CONTROL: Vary speed based on noise and collective breathing
        const collectiveBreath =
          Math.sin(t * breathingFreq * 0.5) * breathingAmp;
        const speedVariation =
          noise1 * 0.02 + collectiveBreath * 0.01;
        const targetSpeed = 0.03 + speedVariation; // Base speed around 0.03

        // Gradually accelerate/decelerate to target speed
        p.speed += (targetSpeed - p.speed) * 0.05;
        p.speed = Math.max(0.01, Math.min(0.08, p.speed)); // Clamp speed

        // HIVE MIND: Align with nearby particles (like traffic flow)
        let neighborHeading = new THREE.Vector3(0, 0, 0);
        let neighborCount = 0;

        particles.forEach((neighbor, j) => {
          if (i !== j) {
            const dist = p.position.distanceTo(
              neighbor.position,
            );

            if (dist < 4) {
              const influence = 1 - dist / 4;
              neighborHeading.add(
                neighbor.heading
                  .clone()
                  .multiplyScalar(influence),
              );
              neighborCount++;
            }
          }
        });

        if (neighborCount > 0) {
          neighborHeading.divideScalar(neighborCount);
          neighborHeading.normalize();
          // Align heading with neighbors (flock behavior)
          p.heading.lerp(neighborHeading, 0.05);
          p.heading.normalize();
        }

        // MOVEMENT: Drive forward in heading direction
        const forwardMovement = p.heading
          .clone()
          .multiplyScalar(p.speed);

        // Add tiny turbulence (road bumps)
        const turbulence = new THREE.Vector3(
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001,
        );

        // Update velocity (car-like momentum)
        p.velocity.copy(forwardMovement).add(turbulence);

        // Apply movement
        p.position.add(p.velocity);

        // BOUNDARY: Keep within sphere with "bounce" behavior
        const maxRadius = 20;
        const currentDistance = p.position.length();

        if (currentDistance > maxRadius) {
          // Hit boundary - reflect heading like bouncing off a wall
          p.position.normalize().multiplyScalar(maxRadius);

          // Reflect heading away from center
          const normal = p.position.clone().normalize();
          p.heading.reflect(normal);
          p.heading.normalize();

          // Slow down when hitting boundary
          p.speed *= 0.7;
        }

        // Gentle pull towards maintaining radius (like staying in lane)
        const radiusPull = 15; // Preferred radius
        if (currentDistance < radiusPull - 2) {
          // Too close to center, steer outward slightly
          const outward = p.position.clone().normalize();
          p.heading.lerp(outward, 0.02);
        } else if (currentDistance > radiusPull + 2) {
          // Too far from center, steer inward slightly
          const inward = p.position
            .clone()
            .normalize()
            .negate();
          p.heading.lerp(inward, 0.02);
        }
        p.heading.normalize();

        // Update mesh position
        p.mesh.position.copy(p.position);

        // Update opacity based on Z position (depth)
        const material = p.mesh
          .material as THREE.MeshBasicMaterial;
        const depthOpacity =
          0.3 + ((p.position.z + 20) / 40) * 0.7;
        material.opacity = Math.max(
          0.3,
          Math.min(1.0, depthOpacity),
        );
      });

      // Update connection lines (reuse existing lines or create new ones)
      const maxConnectionDist = 6;
      const connections: Array<{
        p1: THREE.Vector3;
        p2: THREE.Vector3;
        dist: number;
      }> = [];

      particles.forEach((p1, i) => {
        particles.forEach((p2, j) => {
          if (i < j) {
            const dist = p1.position.distanceTo(p2.position);
            if (dist < maxConnectionDist) {
              connections.push({
                p1: p1.position,
                p2: p2.position,
                dist,
              });
            }
          }
        });
      });

      // Remove excess lines
      while (linesRef.current.length > connections.length) {
        const line = linesRef.current.pop();
        if (line) {
          scene.remove(line);
          line.geometry.dispose();
        }
      }

      // Update or create lines
      const lineMaterial = lineMaterialRef.current;
      if (!lineMaterial) return;

      connections.forEach((conn, idx) => {
        const opacity =
          (1 - conn.dist / maxConnectionDist) * 0.2;

        if (idx < linesRef.current.length) {
          // Update existing line
          const line = linesRef.current[idx];
          const positions = line.geometry.attributes.position
            .array as Float32Array;
          positions[0] = conn.p1.x;
          positions[1] = conn.p1.y;
          positions[2] = conn.p1.z;
          positions[3] = conn.p2.x;
          positions[4] = conn.p2.y;
          positions[5] = conn.p2.z;
          line.geometry.attributes.position.needsUpdate = true;
          (line.material as THREE.LineBasicMaterial).opacity =
            opacity;
        } else {
          // Create new line
          const lineGeometry = new THREE.BufferGeometry();
          const positions = new Float32Array([
            conn.p1.x,
            conn.p1.y,
            conn.p1.z,
            conn.p2.x,
            conn.p2.y,
            conn.p2.z,
          ]);
          lineGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3),
          );

          const newLineMaterial = lineMaterial.clone();
          newLineMaterial.opacity = opacity;
          const line = new THREE.Line(
            lineGeometry,
            newLineMaterial,
          );
          scene.add(line);
          linesRef.current.push(line);
        }
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInitialized, color, isVisible]);

  // Update particle colors when color prop changes
  useEffect(() => {
    try {
      if (!isInitialized) return;

      const particles = particlesRef.current;
      const newColor = new THREE.Color(color);

      particles.forEach((p) => {
        const material = p.mesh
          .material as THREE.MeshBasicMaterial;
        material.color.copy(newColor);
      });

      // Update line material color
      if (lineMaterialRef.current) {
        lineMaterialRef.current.color.copy(newColor);
      }

      // Update cloned line materials
      linesRef.current.forEach((line) => {
        (line.material as THREE.LineBasicMaterial).color.copy(
          newColor,
        );
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log(e);
      }
    }
  }, [color, isInitialized]);

  // Show nothing if there's an error (graceful degradation)
  if (hasError) {
    console.log("⚠️ ParticleVisual: WebGL failed, using Canvas2D fallback");
    return <ParticleVisualCanvas2D color={color} particleCount={particleCount} nodeScale={nodeScale} />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{
        minHeight: "400px",
        // Debug: Add a subtle background to see if container is rendering
        background: isInitialized
          ? "transparent"
          : "rgba(255, 107, 53, 0.05)",
      }}
    >
      {/* Debug indicator */}
      {!isInitialized && (
        <div className="absolute top-4 left-4 text-xs opacity-50 font-mono bg-black/50 px-2 py-1 rounded">
          Initializing particle system...
        </div>
      )}
      {isInitialized && (
        <div className="absolute top-4 left-4 text-xs opacity-30 font-mono bg-green-500/20 px-2 py-1 rounded">
          ✅ {particlesRef.current.length} particles active
        </div>
      )}
    </div>
  );
}