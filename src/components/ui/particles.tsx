import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

export const ParticleEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const isInView = useInView(canvasRef);
  const controls = useAnimation();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    const createParticles = () => {
      particles.current = [];
      for (let i = 0; i < 50; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
        });
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

      particles.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Conectar partículas cercanas
        particles.current.forEach((otherParticle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
            Math.pow(particle.y - otherParticle.y, 2)
          );
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });

        // Mover partículas
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Rebotar en los bordes con margen de seguridad
        if (particle.x < 0) {
          particle.x = 0;
          particle.speedX *= -1;
        }
        if (particle.x > canvas.width) {
          particle.x = canvas.width;
          particle.speedX *= -1;
        }
        if (particle.y < 0) {
          particle.y = 0;
          particle.speedY *= -1;
        }
        if (particle.y > canvas.height) {
          particle.y = canvas.height;
          particle.speedY *= -1;
        }
      });
    };

    resizeCanvas();
    createParticles();
    
    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };
    
    window.addEventListener("resize", handleResize);

    let animationId: number;
    const animate = () => {
      if (isInView) {
        drawParticles();
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isInView]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-50"
      />
    </div>
  );
}; 