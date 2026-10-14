'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorGlow = () => {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.25 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => { x.set(event.clientX); y.set(event.clientY); };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [x, y]);

  return <motion.div aria-hidden='true' className='pointer-events-none fixed left-0 top-0 z-[60] hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-2xl md:block' style={{ x: springX, y: springY }} />;
};

export default CursorGlow;
