'use client';

import { ErrorState } from "@/app/types/game";
import CameraFeed from "../ui/CameraFeed";


interface HomeProps {
  error: ErrorState;
}

export default function Home({ error }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 transition-all duration-300">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 mb-10 animate-pulse">
        Rock Paper Scissors Lizard Spock
      </h1>
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
        <CameraFeed className="mb-6" />
        <p className="text-lg text-gray-300 text-center mb-6">Show 'Rock' to Start or 'Paper' to Exit</p>
        <div className="flex justify-center gap-4 flex-wrap">
          {['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'].map((gesture) => (
            <button
              key={gesture}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-110 transition-all duration-200"
            >
              {gesture}
            </button>
          ))}
        </div>
      </div>
      {error && <p className="text-red-400 text-center mt-6 text-lg">{error}</p>}
    </div>
  );
}