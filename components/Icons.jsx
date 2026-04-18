'use client';

// Custom SVG Icons for Bounce It Up
export function PlaygroundIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
      {/* Three towers */}
      <rect x="10" y="50" width="12" height="40" fill="currentColor" opacity="0.9" />
      <rect x="44" y="30" width="12" height="60" fill="currentColor" />
      <rect x="78" y="50" width="12" height="40" fill="currentColor" opacity="0.9" />
      {/* Connecting bridges */}
      <path d="M 22 50 Q 50 40 56 50" stroke="currentColor" strokeWidth="2" />
      <path d="M 56 50 Q 60 55 90 50" stroke="currentColor" strokeWidth="2" />
      {/* Ladder */}
      <line x1="50" y1="30" x2="50" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <line x1="48" y1="25" x2="52" y2="25" stroke="currentColor" strokeWidth="1.5" />
      <line x1="48" y1="28" x2="52" y2="28" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function BounceIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
      {/* Large inflatable shape */}
      <ellipse cx="50" cy="55" rx="25" ry="30" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="20" ry="25" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Bounce motion lines */}
      <circle cx="35" cy="20" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="65" cy="25" r="3" fill="currentColor" opacity="0.6" />
      <path d="M 35 20 L 35 35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />
      <path d="M 65 25 L 65 40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />
    </svg>
  );
}

export function ObstacleIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
      {/* Hurdles */}
      <rect x="15" y="40" width="12" height="35" fill="currentColor" opacity="0.8" />
      <rect x="15" y="35" width="20" height="6" fill="currentColor" opacity="0.6" />
      <rect x="50" y="40" width="12" height="35" fill="currentColor" opacity="0.8" />
      <rect x="50" y="35" width="20" height="6" fill="currentColor" opacity="0.6" />
      <rect x="85" y="40" width="12" height="35" fill="currentColor" opacity="0.8" />
      <rect x="85" y="35" width="20" height="6" fill="currentColor" opacity="0.6" />
      {/* Runner figure */}
      <circle cx="32" cy="15" r="4" fill="currentColor" />
      <line x1="32" y1="19" x2="32" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="22" x2="25" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="22" x2="39" y2="25" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function GamesIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
      {/* Arcade cabinet */}
      <rect x="20" y="25" width="60" height="55" fill="none" stroke="currentColor" strokeWidth="2.5" rx="3" />
      {/* Screen */}
      <rect x="25" y="30" width="50" height="35" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      {/* Joystick */}
      <circle cx="35" cy="72" r="4" fill="currentColor" />
      <line x1="35" y1="66" x2="35" y2="76" stroke="currentColor" strokeWidth="2" />
      {/* Buttons */}
      <circle cx="55" cy="70" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="65" cy="70" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="75" cy="70" r="3" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function ToddlerIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
      {/* Playground area */}
      <rect x="15" y="50" width="70" height="30" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" rx="3" />
      {/* Soft play blocks */}
      <rect x="25" y="60" width="15" height="15" fill="currentColor" opacity="0.5" />
      <rect x="45" y="62" width="15" height="13" fill="currentColor" opacity="0.5" />
      <rect x="65" y="60" width="15" height="15" fill="currentColor" opacity="0.5" />
      {/* Baby figure */}
      <circle cx="40" cy="35" r="5" fill="currentColor" />
      <rect x="36" y="41" width="8" height="12" fill="currentColor" opacity="0.8" />
      {/* Happy */}
      <circle cx="38" cy="34" r="1" fill="white" />
      <circle cx="42" cy="34" r="1" fill="white" />
    </svg>
  );
}

export function FoodIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
      {/* Pizza */}
      <path d="M 50 20 L 70 60 L 30 60 Z" fill="currentColor" opacity="0.7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="45" r="3" fill="white" opacity="0.8" />
      <circle cx="45" cy="50" r="2.5" fill="white" opacity="0.8" />
      <circle cx="55" cy="50" r="2.5" fill="white" opacity="0.8" />
      {/* Drink cup */}
      <rect x="10" y="40" width="10" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 10 40 L 8 38" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 20 40 L 22 38" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="48" x2="20" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
