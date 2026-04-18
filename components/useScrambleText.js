import { useEffect, useState } from 'react';

export function useScrambleText(target, delay = 0) {
  const [text, setText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  useEffect(() => {
    let timeout;
    let interval;
    let iteration = 0;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setText(
          target
            .split('')
            .map((char, idx) => {
              if (idx < iteration) return target[idx];
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        if (iteration >= target.length) clearInterval(interval);
        iteration += 0.5;
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [target, delay]);

  return text || target;
}
