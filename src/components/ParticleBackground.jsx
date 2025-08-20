import React, { useMemo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
  const particlesInit = async (engine) => {
    // Load the slim version of tsparticles
    await loadSlim(engine);
  };

  const particlesLoaded = () => {
    // The container parameter was required by the library API but is not needed in this implementation
  };

  // Calculate particles density based on screen size
  const particlesOptions = useMemo(() => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Adjust particle count based on screen size
    let particleCount = 60;
    let densityArea = 600;
    
    if (isMobile) {
      particleCount = 30;  // Fewer particles on mobile
      densityArea = 800;   // Lower density on mobile
    } else if (isTablet) {
      particleCount = 45;  // Medium particle count on tablet
      densityArea = 700;   // Medium density on tablet
    }
    
    return {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
            quantity: isMobile ? 4 : 10,
          },
          onHover: {
            enable: true,
            mode: "grab",
            distance: 150,
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: isMobile ? 4 : 10,
          },
          attract: {
            distance: 200,
            duration: 0.4,
            speed: 10,
            rotate: {
              x: 600,
              y: 1200
            }
          },
          grab: {
            distance: 150,
            links: {
              opacity: 0.5,
            },
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.3, // 进一步降低连线透明度
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: densityArea,
          },
          value: particleCount,
        },
        opacity: {
          value: 0.15, // 进一步降低粒子透明度
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    };
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default ParticleBackground;