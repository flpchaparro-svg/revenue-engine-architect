import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const CountUp: React.FC<{ value: number, suffix?: string, prefix?: string }> = ({ value, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const incrementTime = duration / (value || 1); 
    
    const timer = setInterval(() => {
      start += 1;
      if (start > value) start = value;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

export default CountUp;
