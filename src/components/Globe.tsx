import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

const Globe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let phi = 0;

    if (canvasRef.current) {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 500 * 2,
        height: 500 * 2,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.10, 0.09, 0.02],
        markerColor: [0.87, 0.86, 0.53],
        glowColor: [0.87, 0.86, 0.53],
        markers: [
          { location: [39.47387096467801, -0.374559095583287], size: 0.03 },
          { location: [38.26542185660706, -0.6992981132792031], size: 0.03 },
          { location: [41.38137890184353, 2.1723661265717533], size: 0.03 },
          { location: [36.510265815917435, -4.884102006324104], size: 0.03 },
          { location: [41.1175159189898, 1.2506940509809823], size: 0.03 },
          { location: [37.175847055898906, -3.5994809988861656], size: 0.03 },
          { location: [43.25620689025074, -2.931774331264896], size: 0.03 },
          { location: [43.35731865990248, -8.413112853421367], size: 0.03 },
          { location: [41.67228605192266, -0.9236326300874903], size: 0.03 },
          { location: [-32.347676952277546, -65.00625904539979], size: 0.03 }
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.002;
        }
      });

      return () => {
        globe.destroy();
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 500, height: 500, maxWidth: '100%', aspectRatio: 1 }}
      width={500 * 2}
      height={500 * 2}
    />
  );
};

export default Globe; 