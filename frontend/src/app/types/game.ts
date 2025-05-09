// Game state interface
export interface GameState {
  currentState: string;
  roundCount: number;
  playerWinnings: number;
  pcWinnings: number;
  currentRound: number;
  countdown: number;
  userChoice: number;
  gameRandomNumber: number;
}

// Error state type
export type ErrorState = string | null;