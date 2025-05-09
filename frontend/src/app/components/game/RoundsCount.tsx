'use client';

import { GameState, ErrorState } from "@/app/types/game";
import CameraFeed from "../ui/CameraFeed";



interface RoundsCountProps {
  state: GameState;
  error: ErrorState;
}

export default function RoundsCount({ state, error }: RoundsCountProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-10">Select Number of Rounds</h1>
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
        <CameraFeed className="mb-6" />
        <p className="text-lg text-gray-300 text-center mb-6">Show Fingers (1-10 Rounds)</p>
        {state.roundCount > 0 && (
          <p className="text-xl text-orange-400 text-center animate-bounce">Selected: {state.roundCount} Rounds</p>
        )}
      </div>
      {error && <p className="text-red-400 text-center mt-6 text-lg">{error}</p>}
    </div>
  );
}