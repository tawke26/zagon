'use client';

import { useReducer, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from '@/components/landing/LandingPage';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { WorkspacePanel } from '@/components/workspace/WorkspacePanel';
import { AppState, AppAction, ParsedCard, OnboardingData } from '@/lib/types';

const initialState: AppState = {
  stage: 'spark',
  cards: [],
  mentorMood: 'thinking',
  isLoading: false,
  started: false,
  onboardingComplete: false,
  onboardingData: { userName: '', ideaCategory: null },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'START':
      return { ...state, started: true };
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true, onboardingData: action.data };
    case 'SET_STAGE':
      return { ...state, stage: action.stage };
    case 'ADD_CARDS':
      return { ...state, cards: [...state.cards, ...action.cards] };
    case 'SET_MOOD':
      return { ...state, mentorMood: action.mood };
    case 'SET_LOADING':
      return { ...state, isLoading: action.loading };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [mobileView, setMobileView] = useState<'chat' | 'workspace'>('chat');

  const handleStart = () => {
    dispatch({ type: 'START' });
  };

  const handleOnboardingComplete = useCallback((data: OnboardingData) => {
    dispatch({ type: 'COMPLETE_ONBOARDING', data });
  }, []);

  const handleCardsGenerated = useCallback((cards: ParsedCard[]) => {
    dispatch({ type: 'ADD_CARDS', cards });

    const stageMap: Record<string, string> = {
      problem_statement: 'hunt',
      research_evidence: 'who',
      persona: 'shape',
      business_model: 'look',
      brand_board: 'build',
      prototype: 'test',
      validation: 'test',
    };

    for (const card of cards) {
      if (stageMap[card.type]) {
        dispatch({ type: 'SET_STAGE', stage: stageMap[card.type] });
      }
    }
  }, []);

  // Determine which phase to show
  const phase = !state.started
    ? 'landing'
    : !state.onboardingComplete
      ? 'onboarding'
      : 'app';

  return (
    <main className="h-screen w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <LandingPage onStart={handleStart} />
          </motion.div>
        )}

        {phase === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <OnboardingFlow onComplete={handleOnboardingComplete} />
          </motion.div>
        )}

        {phase === 'app' && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full flex flex-col"
          >
            {/* Mobile tab switcher */}
            <div className="flex lg:hidden border-b border-[var(--zagon-border)]">
              <button
                onClick={() => setMobileView('chat')}
                className={`flex-1 py-3 text-sm font-display font-bold transition-colors ${
                  mobileView === 'chat'
                    ? 'text-[var(--zagon-accent)] border-b-2 border-[var(--zagon-accent)]'
                    : 'text-[var(--text-dim)]'
                }`}
              >
                CHAT
              </button>
              <button
                onClick={() => setMobileView('workspace')}
                className={`flex-1 py-3 text-sm font-display font-bold transition-colors relative ${
                  mobileView === 'workspace'
                    ? 'text-[var(--zagon-accent)] border-b-2 border-[var(--zagon-accent)]'
                    : 'text-[var(--text-dim)]'
                }`}
              >
                WORKSPACE
                {state.cards.length > 0 && (
                  <span className="absolute top-2 right-[calc(50%-30px)] w-2 h-2 rounded-full bg-[var(--zagon-accent)]" />
                )}
              </button>
            </div>

            {/* Desktop split layout */}
            <div className="flex-1 flex overflow-hidden">
              {/* Chat Panel — slides in from left */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`${
                  mobileView === 'chat' ? 'flex' : 'hidden'
                } lg:flex w-full lg:w-[40%] border-r border-[var(--zagon-border)]`}
              >
                <div className="w-full">
                  <ChatPanel
                    onCardsGenerated={handleCardsGenerated}
                    mentorMood={state.mentorMood}
                    onboardingData={state.onboardingData}
                  />
                </div>
              </motion.div>

              {/* Workspace Panel — slides in from right */}
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className={`${
                  mobileView === 'workspace' ? 'flex' : 'hidden'
                } lg:flex w-full lg:w-[60%]`}
              >
                <div className="w-full">
                  <WorkspacePanel
                    cards={state.cards}
                    currentStage={state.stage}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
