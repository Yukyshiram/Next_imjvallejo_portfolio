import { useState, useRef, useEffect } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagicCard } from "@/components/ui/magic-card";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BentoGrid } from "@/components/ui/bento-grid";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Dock, DockIcon } from "@/components/ui/dock";
import { motion, AnimatePresence } from "framer-motion";
import { HomeIcon, UserIcon, BriefcaseIcon, RocketIcon, MailIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ParticleEffect } from "@/components/ui/particles";
import { StarsEffect } from "@/components/ui/stars";

const Icons = {
  linkedin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
      />
    </svg>
  ),
};

export default function Home() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [currentSection, setCurrentSection] = useState(0);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    sectionsRef.current[index] = el;
  };

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sectionsRef.current.length) {
      sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(index);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSection(Math.max(0, currentSection - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToSection(Math.min(sectionsRef.current.length - 1, currentSection + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionsRef.current;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
          const absoluteTop = window.scrollY + top;
          const absoluteBottom = window.scrollY + bottom;

          if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
            setCurrentSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <ScrollProgress />
      <SmoothCursor />

      {/* Contenedor principal con scroll snap */}
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
        {/* Sección Hero */}
        <section
          ref={setRef(0)}
          className="h-screen snap-start relative flex items-center justify-center bg-black"
        >
          <StarsEffect />
          <div className="text-center z-10">
            <AnimatedGradientText className="text-6xl font-bold mb-4">
               Im_JVallejo
            </AnimatedGradientText>
            <TextReveal text="Desarrollador Full Stack" className="text-2xl" />
          </div>
        </section>

        {/* Sección Sobre Mí */}
        <section
          ref={setRef(1)}
          className="h-screen snap-start relative flex items-center justify-center bg-neutral-900"
        >
          <ParticleEffect />
          <div className="max-w-4xl mx-auto px-4 z-10">
            <MagicCard className="p-8 bg-neutral-900/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-4">Sobre Mí</h2>
              <p className="text-lg">
                Soy un desarrollador apasionado por crear experiencias web únicas y memorables.
                Con experiencia en tecnologías modernas como React, Next.js y Tailwind CSS.
              </p>
            </MagicCard>
          </div>
        </section>

        {/* Sección de Experiencia */}
        <section
          ref={setRef(2)}
          className="h-screen snap-start relative flex items-center justify-center bg-black"
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Experiencia</h2>
            <div className="space-y-6">
              <MagicCard className="p-6">
                <h3 className="text-xl font-bold">Empresa 1</h3>
                <p className="opacity-70">2022 - Presente</p>
                <p className="mt-2">Desarrollador Full Stack Senior</p>
                <ul className="list-disc list-inside mt-2 opacity-80">
                  <li>Desarrollo de aplicaciones web con Next.js</li>
                  <li>Implementación de arquitecturas escalables</li>
                  <li>Liderazgo técnico de equipo</li>
                </ul>
              </MagicCard>

              <MagicCard className="p-6">
                <h3 className="text-xl font-bold">Empresa 2</h3>
                <p className="opacity-70">2020 - 2022</p>
                <p className="mt-2">Desarrollador Frontend</p>
                <ul className="list-disc list-inside mt-2 opacity-80">
                  <li>Desarrollo de interfaces de usuario</li>
                  <li>Optimización de rendimiento</li>
                  <li>Implementación de animaciones</li>
                </ul>
              </MagicCard>
            </div>
          </div>
        </section>

        {/* Sección Proyectos */}
        <section
          ref={setRef(3)}
          className="h-screen snap-start relative flex items-center justify-center bg-neutral-900"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Proyectos</h2>
            <BentoGrid className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MagicCard className="p-4 aspect-square">
                <h3 className="text-xl font-bold">Proyecto 1</h3>
                <p>Descripción del proyecto</p>
              </MagicCard>
              <MagicCard className="p-4 aspect-square">
                <h3 className="text-xl font-bold">Proyecto 2</h3>
                <p>Descripción del proyecto</p>
              </MagicCard>
            </BentoGrid>
          </div>
        </section>

        {/* Sección Contacto */}
        <section
          ref={setRef(4)}
          className="h-screen snap-start relative flex items-center justify-center bg-black"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Contacto</h2>
            <div className="space-y-2">
              <p>email@ejemplo.com</p>
            </div>
          </div>
        </section>
      </div>

      {/* Dock fijo en la parte inferior */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <TooltipProvider>
          <Dock>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToSection(0)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <HomeIcon className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Inicio</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>

            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToSection(1)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <UserIcon className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sobre Mí</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>

            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToSection(2)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <BriefcaseIcon className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Experiencia</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>

            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToSection(3)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <RocketIcon className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Proyectos</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>

            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToSection(4)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <MailIcon className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Contacto</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>

            <div className="h-8 w-px bg-white/20" />

            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <Icons.linkedin className="h-6 w-6" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>

            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <Icons.instagram className="h-6 w-6" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Instagram</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>
    </main>
  );
}