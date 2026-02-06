'use client';

import { MentorMood } from '@/lib/types';

interface MentorAvatarProps {
  mood?: MentorMood;
  size?: number;
}

export function MentorAvatar({ mood = 'thinking', size = 40 }: MentorAvatarProps) {
  const borderColor = mood === 'challenging' ? '#FF3D00' : '#FFD600';

  // Eye dimensions based on mood
  const getEyeProps = () => {
    switch (mood) {
      case 'challenging':
        return { eyeHeight: 2, eyeY: 23, browAngle: 3 };
      case 'hyped':
        return { eyeHeight: 5, eyeY: 21, browAngle: -2 };
      case 'teaching':
        return { eyeHeight: 3, eyeY: 22, browAngle: 1 };
      case 'shipping':
        return { eyeHeight: 3, eyeY: 22, browAngle: 0 };
      default:
        return { eyeHeight: 3, eyeY: 22, browAngle: 0 };
    }
  };

  const { eyeHeight, eyeY, browAngle } = getEyeProps();

  // Mouth based on mood
  const getMouth = () => {
    switch (mood) {
      case 'hyped':
        return <path d="M16 28 Q20 32 24 28" stroke={borderColor} strokeWidth="0.8" fill="none" opacity="0.5" />;
      case 'challenging':
        return <line x1="16" y1="29" x2="24" y2="29" stroke={borderColor} strokeWidth="0.8" opacity="0.35" />;
      case 'shipping':
        return <path d="M15 28 L20 28 L25 26" stroke={borderColor} strokeWidth="0.8" fill="none" opacity="0.4" />;
      default:
        return <path d="M16 29 Q20 31.5 24 29" stroke={borderColor} strokeWidth="0.8" fill="none" opacity="0.35" />;
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#141414" stroke={borderColor} strokeWidth="1" />
      {/* Head */}
      <rect x="8" y="12" width="24" height="18" rx="6" fill="#1A1A1A" stroke={borderColor} strokeWidth="1" />
      {/* Beanie */}
      <path d="M8 16 Q8 7 20 4 Q32 7 32 16" fill="#141414" stroke={borderColor} strokeWidth="1" />
      <line x1="8" y1="16" x2="32" y2="16" stroke={borderColor} strokeWidth="1.5" />
      <line x1="14" y1="11" x2="14" y2="16" stroke={borderColor} strokeWidth="0.3" opacity="0.2" />
      <line x1="20" y1="10" x2="20" y2="16" stroke={borderColor} strokeWidth="0.3" opacity="0.2" />
      <line x1="26" y1="11" x2="26" y2="16" stroke={borderColor} strokeWidth="0.3" opacity="0.2" />
      {/* Eyes */}
      <rect x="12" y={eyeY} width="5" height={eyeHeight} rx="1" fill={borderColor} opacity="0.9" />
      <rect x="23" y={eyeY} width="5" height={eyeHeight} rx="1" fill={borderColor} opacity="0.9" />
      {/* Eyebrows - angle varies by mood */}
      <line
        x1="11" y1={19 + browAngle} x2="18" y2={19 - browAngle}
        stroke={borderColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"
      />
      <line
        x1="22" y1={19 - browAngle} x2="29" y2={19 + browAngle}
        stroke={borderColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"
      />
      {/* Mouth */}
      {getMouth()}
    </svg>
  );
}
