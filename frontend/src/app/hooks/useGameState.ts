'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { GameState, ErrorState } from '../types/game';
import { API_ENDPOINTS, GESTURE_PROCESSING_STATES } from '../utils/constants';

// Initial game state
const initialGameState: GameState = {
  currentState: 'HOME',
  roundCount: 0,
  playerWinnings: 0,
  pcWinnings: 0,
  currentRound: 0,
  countdown: 0,
  userChoice: 0,
  gameRandomNumber: 0,
};

export default function useGameState() {
  const [state, setState] = useState<GameState>(initialGameState);
  const [error, setError] = useState<ErrorState>(null);

  // Fetch game state from backend
  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.STATE);
        setState(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to connect to backend. Ensure the backend is running.');
      }
    };

    const interval = setInterval(fetchState, 500);
    fetchState();

    return () => clearInterval(interval);
  }, []);

  // Process gestures for specific game states
  const processGesture = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.GESTURE);
      setState(response.data.state);
      setError(null);
    } catch (error) {
      setError('Error processing gesture.');
    }
  };

  useEffect(() => {
    if (GESTURE_PROCESSING_STATES.includes(state.currentState)) {
      const interval = setInterval(processGesture, 100);
      return () => clearInterval(interval);
    }
  }, [state.currentState]);

  return { state, error };
}