from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import cv2
import numpy as np
from cvzone.HandTrackingModule import HandDetector
import sys
import random
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Initialize hand detector and camera
detector = HandDetector(maxHands=2)
cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)

# Game state variables
currentState = 'HOME'
roundCount = 0
playerWinnings = 0
pcWinnings = 0
currentRound = 0
countdown = 0
userChoice = 0
gameRandomNumber = 0
lastGestureIdentifierValue = 0
fingerIdentifierValues = []
lastFingerCountValue = 0
fingerCountValueArray = []

# Gesture detection functions
def fingerGestureDetection(fingers):
    gestures = {
        (0, 0, 0, 0, 0): 1,  # Rock
        (1, 1, 1, 1, 1): 2,  # Paper
        (0, 1, 1, 0, 0): 3,  # Scissors
        (1, 0, 0, 0, 1): 4,  # Lizard
        (1, 1, 1, 0, 1): 5,  # Spock
    }
    return gestures.get(tuple(fingers), 0)

def identifyFingerGesture(fingers):
    global lastGestureIdentifierValue, fingerIdentifierValues
    identifiedGesture = fingerGestureDetection(fingers)
    if lastGestureIdentifierValue == identifiedGesture:
        fingerIdentifierValues.append(identifiedGesture)
        if len(fingerIdentifierValues) > 10:
            fingerIdentifierValues = []
            return identifiedGesture
        else:
            return 0
    else:
        lastGestureIdentifierValue = identifiedGesture
        fingerIdentifierValues = []
        return 0

def calculateFingerCount(hands):
    if len(hands) == 1:
        return sum(detector.fingersUp(hands[0]))
    else:
        return sum(detector.fingersUp(hands[0])) + sum(detector.fingersUp(hands[1]))

def getFingerCount(hands):
    global fingerCountValueArray, lastFingerCountValue
    fingerCount = calculateFingerCount(hands)
    if lastFingerCountValue == fingerCount:
        fingerCountValueArray.append(fingerCount)
        if len(fingerCountValueArray) > 10:
            fingerCountValueArray = []
            return fingerCount
        else:
            return 0
    else:
        lastFingerCountValue = fingerCount
        fingerCountValueArray = []
        return 0

# Camera feed streaming
def gen_frames():
    while True:
        success, frame = cap.read()
        if not success:
            break
        frame = cv2.flip(frame, 1)
        hands, frame = detector.findHands(frame)
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Game state endpoint
@app.route('/state')
def get_state():
    return jsonify({
        'currentState': currentState,
        'roundCount': roundCount,
        'playerWinnings': playerWinnings,
        'pcWinnings': pcWinnings,
        'currentRound': currentRound,
        'countdown': countdown,
        'userChoice': userChoice,
        'gameRandomNumber': gameRandomNumber
    })

# Process gestures and update state
@app.route('/gesture', methods=['POST'])
def process_gesture():
    global currentState, roundCount, playerWinnings, pcWinnings, currentRound, countdown, userChoice, gameRandomNumber

    success, frame = cap.read()
    if not success:
        return jsonify({'error': 'Camera error'}), 500

    frame = cv2.flip(frame, 1)
    hands, frame = detector.findHands(frame)

    if currentState == 'HOME':
        if len(hands) >= 1:
            gesture = identifyFingerGesture(detector.fingersUp(hands[0]))
            if gesture == 1:  # Rock
                currentState = 'ROUNDS_COUNT'
            elif gesture == 2:  # Paper
                currentState = 'EXIT'
    elif currentState == 'ROUNDS_COUNT':
        if len(hands) >= 1:
            fingerCount = getFingerCount(hands)
            if fingerCount > 0:
                roundCount = min(fingerCount, 10)
                currentState = 'VERIFY_ROUNDS'
    elif currentState == 'VERIFY_ROUNDS':
        if len(hands) >= 1:
            gesture = identifyFingerGesture(detector.fingersUp(hands[0]))
            if gesture == 1:  # Rock
                countdown = 3
                currentState = 'COUNTDOWN'
            elif gesture == 2:  # Paper
                currentState = 'ROUNDS_COUNT'
    elif currentState == 'COUNTDOWN':
        if countdown > 0:
            countdown -= 1
            time.sleep(1)
        else:
            currentState = 'GAME'
    elif currentState == 'GAME':
        if len(hands) >= 1:
            gesture = identifyFingerGesture(detector.fingersUp(hands[0]))
            if gesture > 0:
                userChoice = gesture
                gameRandomNumber = random.randint(1, 5)
                if (gesture == 1 and gameRandomNumber in [3, 4]) or \
                   (gesture == 2 and gameRandomNumber in [1, 5]) or \
                   (gesture == 3 and gameRandomNumber in [2, 4]) or \
                   (gesture == 4 and gameRandomNumber in [2, 5]) or \
                   (gesture == 5 and gameRandomNumber in [1, 3]):
                    playerWinnings += 1
                elif (gameRandomNumber == 1 and gesture in [3, 4]) or \
                     (gameRandomNumber == 2 and gesture in [1, 5]) or \
                     (gameRandomNumber == 3 and gesture in [2, 4]) or \
                     (gameRandomNumber == 4 and gesture in [2, 5]) or \
                     (gameRandomNumber == 5 and gesture in [1, 3]):
                    pcWinnings += 1
                currentRound += 1
                currentState = 'GAME_SCORES'
    elif currentState == 'GAME_SCORES':
        time.sleep(2)
        if currentRound < roundCount:
            currentState = 'GAME'
        else:
            currentState = 'FINAL_SCORES'
    elif currentState == 'FINAL_SCORES':
        time.sleep(3)
        playerWinnings = 0
        pcWinnings = 0
        currentRound = 0
        roundCount = 0
        currentState = 'HOME'
    elif currentState == 'EXIT':
        cap.release()
        sys.exit(0)

    return jsonify({'status': 'success', 'state': get_state().get_json()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
