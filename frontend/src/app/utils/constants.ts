// Mapping of gesture numbers to names
export const gestureMap: { [key: number]: string } = {
  1: 'Rock',
  2: 'Paper',
  3: 'Scissors',
  4: 'Lizard',
  5: 'Spock',
};

// API endpoints
export const API_ENDPOINTS = {
  STATE: 'http://localhost:5000/state',
  GESTURE: 'http://localhost:5000/gesture',
  VIDEO_FEED: 'http://localhost:5000/video_feed',
};

// Game states
export const GAME_STATES = {
  HOME: 'HOME',
  ROUNDS_COUNT: 'ROUNDS_COUNT',
  VERIFY_ROUNDS: 'VERIFY_ROUNDS',
  COUNTDOWN: 'COUNTDOWN',
  GAME: 'GAME',
  GAME_SCORES: 'GAME_SCORES',
  FINAL_SCORES: 'FINAL_SCORES',
};

// States that require gesture processing
export const GESTURE_PROCESSING_STATES = [
  GAME_STATES.HOME,
  GAME_STATES.ROUNDS_COUNT,
  GAME_STATES.VERIFY_ROUNDS,
  GAME_STATES.GAME,
];