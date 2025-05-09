'use client';

import { GameState, ErrorState } from "@/app/types/game";
import CameraFeed from "../ui/CameraFeed";


interface VerifyRoundsProps {
  state: GameState;
  error: ErrorState;
}

export default function VerifyRounds({ state, error }: VerifyRoundsProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-10">
        Confirm {state.roundCount} Rounds?
      </h1>
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
        <CameraFeed className="mb-6" />
        <p className="text-lg text-gray-300 text-center mb-6">Show 'Rock' to Confirm or 'Paper' to Go Back</p>
      </div>
      {error && <p className="text-red-400 text-center mt-6 text-lg">{error}</p>}
    </div>
  );
}