'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { OnboardingData, ExperienceLevel } from '@/lib/types';
import { StepIndicator } from './StepIndicator';
import { NameStep } from './NameStep';
import { CategoryStep } from './CategoryStep';
import { ExperienceStep } from './ExperienceStep';
import { JourneyStep } from './JourneyStep';

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [ideaCategory, setIdeaCategory] = useState<string | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null);

  return (
    <div className="h-screen w-screen bg-[var(--bg)] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-[var(--zagon-accent)] opacity-[0.03] blur-[100px]" />
      </div>

      {/* Step indicator */}
      <StepIndicator current={step} total={4} />

      {/* Steps */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <NameStep
            key="name"
            onNext={(name) => {
              setUserName(name);
              setStep(1);
            }}
          />
        )}
        {step === 1 && (
          <CategoryStep
            key="category"
            userName={userName}
            onNext={(cat) => {
              setIdeaCategory(cat);
              setStep(2);
            }}
            onSkip={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <ExperienceStep
            key="experience"
            userName={userName}
            onNext={(level) => {
              setExperienceLevel(level);
              setStep(3);
            }}
          />
        )}
        {step === 3 && (
          <JourneyStep
            key="journey"
            userName={userName}
            onComplete={() => onComplete({ userName, ideaCategory, experienceLevel })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
