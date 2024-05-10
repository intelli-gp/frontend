import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import alarm from '../assets/sounds/alarm-digital.mp3';
import { RootState, incrementRound, setMode, setStartTimer, setMinutes, setSeconds, setStopTimer } from '../store';
import { player } from '../utils/sounds';
import worker from '../utils/worker-script';

// Create a new Web Worker
const timerWorker = new Worker(worker);

type State = {
    mode: string;
    round: number;
    minutes: number;
    seconds: number;
    autoBreaks: boolean;
    autoPomodoros: boolean;
    longBreakInterval: number;
    isRunning: boolean;
};
const usePomodoroTimer = () => {
    const dispatch = useDispatch();

    // Create a selector to get the timer state from your Redux store
    const timeSelector = createSelector(
        (state: RootState) => state.timer.pomodoro,
        (time: State) => {
            return {
                ...time,
            };
        },
    );

    // Use the useSelector hook with your selector to get the current timer state
    const time = useSelector(timeSelector);

    // Define the onmessage handler to recieve the data from web worker
    timerWorker.onmessage = ({ data: { minutes, seconds } }) => {
        // Use setTimeout to ensure that the state updates are not batched by React
        setTimeout(() => {
            dispatch(setMinutes(minutes));
            dispatch(setSeconds(seconds));
        }, 100);
    };

    // This function sends a message to the web worker to start the timer.
    // It includes the current state's minutes and seconds as initial values.
    const startWebWorkerTimer = () => {
        timerWorker.postMessage({
            turn: "on",
            initialMinutes: time.minutes,
            initialSeconds: time.seconds
        });
    };

    // This function sends a message to the web worker to stop the timer.
    // The worker will clear the interval and reset its internal minutes and seconds to these values.
    const resetWebWorkerTimer = () => {
        timerWorker.postMessage({
            turn: "off",
            initialMinutes: time.minutes,
            initialSeconds: time.seconds
        });
    };
    const alarmAudio = player({
        asset: alarm,
    });
    const startTimer = () => {
        dispatch(setStartTimer());
        startWebWorkerTimer();
    };
    const stopTimer = () => {
        dispatch(setStopTimer());
        resetWebWorkerTimer();
    };


    // Use the useEffect hook to handle the end of a timer cycle
    useEffect(() => {
        if (time.isRunning) {
            if (time.minutes === 0 && time.seconds === 0) {
                stopTimer();
                alarmAudio.play();

                if (time.mode === 'shortBreak' || time.mode === 'longBreak') {
                    dispatch(incrementRound());
                }
                if (time.round % 3 === 0 && time.mode === 'pomodoro') {
                    dispatch(setMode('longBreak'));
                    dispatch(setMinutes(15));
                    dispatch(setSeconds(0));
                } else if (time.mode === 'pomodoro') {
                    dispatch(setMode('shortBreak'));
                    dispatch(setMinutes(5));
                    dispatch(setSeconds(0));
                } else {
                    dispatch(setMode('pomodoro'));
                    dispatch(setMinutes(25));
                    dispatch(setSeconds(0));
                }
                return;
            }
        }
    }, [time.isRunning, time.minutes, time.seconds]);

    return {
        startTimer,
        stopTimer,
        time,
    };
};
export default usePomodoroTimer;
