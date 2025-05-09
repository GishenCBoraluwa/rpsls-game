'use client';

import { GameState, ErrorState } from "@/app/types/game";
import { gestureMap } from "@/app/utils/constants";
import CameraFeed from "../ui/CameraFeed";


interface GameProps {
  state: GameState;
  error: ErrorState;
}

export default function Game({ state, error }: GameProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-6">
        Round {state.currentRound + 1} of {state.roundCount}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Computer: {state.pcWinnings}</h2>
          <p className="text-lg text-orange-400">Choice: {gestureMap[state.gameRandomNumber] || 'None'}</p>
        </div>
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">You: {state.playerWinnings}</h2>
          <CameraFeed className="mb-4" />
          <p className="text-lg text-gray-300">Make Your Choice:</p>
          <p className="text-lg text-orange-400 animate-pulse">{gestureMap[state.userChoice] || 'None'}</p>
        </div>
      </div>
      <p className="text-lg text-gray-300 mt-6">Rock / Paper / Scissors / Lizard / Spock</p>
      {error && <p className="text-red-400 text-center mt-6 text-lg">{error}</p>}
    </div>
  );
}