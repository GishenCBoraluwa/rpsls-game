'use client';

import { GameState, ErrorState } from "@/app/types/game";
import { gestureMap } from "@/app/utils/constants";

interface GameScoresProps {
  state: GameState;
  error: ErrorState;
}

export default function GameScores({ state, error }: GameScoresProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-6">
        Round {state.currentRound} Results
      </h1>
      <div className="w-full max-w-5xl bg-gray-800 rounded-2xl shadow-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Computer</h2>
            <p className="text-lg text-gray-300">Choice: {gestureMap[state.gameRandomNumber] || 'None'}</p>
            <p className="text-2xl text-orange-400">{state.pcWinnings}</p>
          </div>
          <p className="text-2xl text-gray-100 my-4 md:my-0 animate-pulse">VS</p>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-100 mb-2">You</h2>
            <p className="text-lg text-gray-300">Choice: {gestureMap[state.userChoice] || 'None'}</p>
            <p className="text-2xl text-orange-400">{state.playerWinnings}</p>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mt-6">
          <div
            className="bg-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(state.currentRound / state.roundCount) * 100}%` }}
          ></div>
        </div>
        <p className="text-lg text-gray-300 text-center mt-6">
          {state.currentRound < state.roundCount ? 'Next Round Starting...' : 'Calculating Final Results...'}
        </p>
      </div>
      {error && <p className="text-red-400 text-center mt-6 text-lg">{error}</p>}
    </div>
  );
}