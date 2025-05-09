'use client';

import Countdown from "./components/game/Countdown";
import FinalScores from "./components/game/FinalScores";
import Game from "./components/game/Game";
import GameScores from "./components/game/GameScores";
import Home from "./components/game/Home";
import RoundsCount from "./components/game/RoundsCount";
import VerifyRounds from "./components/game/VerifyRounds";
import useGameState from "./hooks/useGameState";
import { GAME_STATES } from "./utils/constants";



export default function Page() {
  const { state, error } = useGameState();

  return (
    <div className="antialiased">
      {state.currentState === GAME_STATES.HOME && <Home error={error} />}
      {state.currentState === GAME_STATES.ROUNDS_COUNT && <RoundsCount state={state} error={error} />}
      {state.currentState === GAME_STATES.VERIFY_ROUNDS && <VerifyRounds state={state} error={error} />}
      {state.currentState === GAME_STATES.COUNTDOWN && <Countdown state={state} error={error} />}
      {state.currentState === GAME_STATES.GAME && <Game state={state} error={error} />}
      {state.currentState === GAME_STATES.GAME_SCORES && <GameScores state={state} error={error} />}
      {state.currentState === GAME_STATES.FINAL_SCORES && <FinalScores state={state} error={error} />}
    </div>
  );
}