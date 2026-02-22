import React from 'react';
import { motion } from 'framer-motion';

export default function PillarRobot({
  pillar,
  themeColor = '#E4E4E7',
}: {
  pillar: string;
  themeColor?: string;
}) {
  // Group 1: Notes (CRM, Automation, Websites)
  const isNotes = ['Websites & E-commerce', 'CRM & Lead Tracking', 'Automation'].includes(pillar);
  // Group 2: Sitting (AI, Content, Training)
  const isSitting = ['AI Assistants', 'Content Systems', 'Team Training'].includes(pillar);
  // Group 3: Counting (Dashboards)
  const isCounting = pillar === 'Dashboards & Reporting';

  const stroke = themeColor;
  const viewBox = '0 0 120 140';
  const head = (
    <>
      <line x1="60" y1="28" x2="60" y2="8" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <motion.circle
        cx="60"
        cy="8"
        r="5"
        fill={themeColor}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      <rect
        x="20"
        y="28"
        width="80"
        height="72"
        rx="10"
        fill="#09090b"
        stroke={stroke}
        strokeWidth="3"
      />
      <rect x="8" y="55" width="12" height="24" rx="3" fill="#27272a" stroke={stroke} strokeWidth="2" />
      <rect x="60" y="55" width="10" height="16" rx="5" fill={themeColor} />
      <rect x="82" y="55" width="10" height="16" rx="5" fill={themeColor} />
      <line x1="35" y1="95" x2="88" y2="95" stroke={stroke} strokeWidth="3" strokeDasharray="6 4" />
    </>
  );

  if (isSitting) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 right-0 w-[100px] h-[120px] md:w-[120px] md:h-[140px] flex items-center justify-end"
        aria-hidden
      >
        <svg viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.g animate={{ rotate: 0 }}>
            {head}
            {/* Sitting: arms at sides */}
            <line x1="20" y1="65" x2="12" y2="95" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <line x1="100" y1="65" x2="108" y2="95" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        </svg>
      </motion.div>
    );
  }

  if (isNotes) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 right-0 w-[100px] h-[120px] md:w-[120px] md:h-[140px] flex items-center justify-end"
        aria-hidden
      >
        <svg viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.g animate={{ rotate: 0 }}>
            {head}
            {/* Notes: one arm holding a note */}
            <line x1="100" y1="60" x2="115" y2="75" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            <motion.rect
              x="108"
              y="70"
              width="18"
              height="22"
              rx="2"
              fill="#27272a"
              stroke={stroke}
              strokeWidth="2"
              animate={{ y: [70, 68, 70] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />
            <line x1="112" y1="78" x2="122" y2="78" stroke={stroke} strokeWidth="1" opacity={0.8} />
            <line x1="112" y1="84" x2="120" y2="84" stroke={stroke} strokeWidth="1" opacity={0.6} />
          </motion.g>
        </svg>
      </motion.div>
    );
  }

  if (isCounting) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 right-0 w-[100px] h-[120px] md:w-[120px] md:h-[140px] flex items-center justify-end"
        aria-hidden
      >
        <svg viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.g animate={{ rotate: 0 }}>
            {head}
            {/* Counting: arms up */}
            <motion.line
              x1="28"
              y1="55"
              x2="10"
              y2="25"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ y2: [25, 20, 25] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.line
              x1="92"
              y1="55"
              x2="110"
              y2="25"
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ y2: [25, 20, 25] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut', delay: 0.1 }}
            />
          </motion.g>
        </svg>
      </motion.div>
    );
  }

  // Default: Laying Down (Sleeping)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute top-0 right-0 w-[100px] h-[120px] md:w-[120px] md:h-[140px] flex items-center justify-end"
      aria-hidden
    >
      <svg viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.g
          style={{ transformOrigin: '60px 64px' }}
          animate={{ rotate: -75 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {head}
        </motion.g>
      </svg>
    </motion.div>
  );
}
