'use client';

import { ErrorState, GameState } from "@/app/types/game";


interface CountdownProps {
  state: GameState;
  error: ErrorState;
}

export default function Countdown({ state, error }: CountdownProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-400 animate-pulse">
        Game Starting in {state.countdown}
      </h1>
      {error && <p className="text-red-400 text-center mt-6 text-lg">{error}</p>}
    </div>
  );
}