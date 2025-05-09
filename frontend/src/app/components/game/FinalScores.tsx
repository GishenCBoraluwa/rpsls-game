'use client';

import { GameState, ErrorState } from "@/app/types/game";



interface FinalScoresProps {
  state: GameState;
  error: ErrorState;
}

export default function FinalScores({ state, error }: FinalScoresProps) {
  const resultText =
    state.pcWinnings > state.playerWinnings
      ? 'YOU LOST!'
      : state.pcWinnings < state.playerWinnings
      ? 'YOU WON!'
      : "IT'S A DRAW!";
      
  const bgColor =
    state.pcWinnings > state.playerWinnings
      ? 'bg-red-950'
      : state.pcWinnings < state.playerWinnings
      ? 'bg-green-950'
      : 'bg-blue-950';

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${bgColor} transition-colors duration-500`}>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-100 mb-4 animate-bounce">GAME OVER</h1>
      <h2 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-10">{resultText}</h2>
      <div className="w-full max-w-5xl bg-gray-800 rounded-2xl shadow-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Computer</h2>
            <p className="text-2xl text-orange-400">{state.pcWinnings}</p>
          </div>
          <p className="text-2xl text-gray-100 my-4 md:my-0 animate-pulse">VS</p>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-100 mb-2">You</h2>
            <p className="text-2xl text-orange-400">{state.playerWinnings}</p>
          </div>
        </div>
        <p className="text-lg text-gray-300 text-center mt-6">Returning to Home Screen...</p>
        <div className="w-full bg-gray-700 rounded-full h-3 mt-6">
          <div className="bg-orange-500 h-3 rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>
      {error && <p className="text-red-400 text-center mt-6 text-lg">{error}</p>}
    </div>
  );
}