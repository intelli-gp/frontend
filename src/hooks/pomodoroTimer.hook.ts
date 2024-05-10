import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import alarm from '../assets/sounds/alarm-digital.mp3';
import { RootState, incrementRound, setMode, setStartTimer, setStopTimer, setTimer } from '../store';
import { player } from '../utils/sounds';
import worker from '../utils/worker-script';


const timerWorker = new Worker(worker);

type State = {
    mode: string;
    round: number;
    autoBreaks: boolean;
    autoPomodoros: boolean;
    longBreakInterval: number;
    timer: string;
    isRunning: boolean;
};
export type TimerModes = 'pomodoro' | 'shortBreak' | 'longBreak';
const usePomodoroTimer = () => {
    const dispatch = useDispatch();
    const timeSelector = createSelector(
        (state: RootState) => state.timer.pomodoro,
        (time: State) => {
            return {
                ...time,
            };
        },
    );

    const time = useSelector(timeSelector);

    const [minutes, setMinutes] = useState(Number(localStorage.getItem('minutes')) || 25);
    const [seconds, setSeconds] = useState(Number(localStorage.getItem('seconds')) || 0);

    useEffect(() => {
        timerWorker.onmessage = ({ data: { minutes, seconds } }) => {
            console.log(seconds);
            setMinutes(minutes);
            setSeconds(seconds);
        };
    }, []);
    const startWebWorkerTimer = () => {
        timerWorker.postMessage({ turn: "on", initialMinutes: minutes, initialSeconds: seconds });
    };

    const resetWebWorkerTimer = () => {
        timerWorker.postMessage({ turn: "off", initialMinutes: minutes, initialSeconds: seconds });
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
    useEffect(() => {
        localStorage.setItem('minutes', String(minutes));
        localStorage.setItem('seconds', String(seconds));
        dispatch(setTimer(String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0')));
    }, [minutes, seconds]);
    useEffect(() => {
        const min = Number(localStorage.getItem('minutes'));
        const sec = Number(localStorage.getItem('seconds'));
        if (time.mode === 'pomodoro') {
            setMinutes(min || 25);
            setSeconds(sec || 0);
        } else if (time.mode === 'shortBreak') {
            setMinutes(min || 5);
            setSeconds(sec || 0);

        } else if (time.mode === 'longBreak') {
            setMinutes(min || 15);
            setSeconds(sec || 0);
        }

    }, [time.mode]);
    useEffect(() => {
        if (time.isRunning) {
            if (Number(minutes) === 0 && Number(seconds) === 0) {
                stopTimer();
                alarmAudio.play();

                if (time.mode === 'shortBreak' || time.mode === 'longBreak') {
                    dispatch(incrementRound());
                }
                if (time.round % 3 === 0 && time.mode === 'pomodoro') {
                    dispatch(setMode('longBreak'));
                    setMinutes(15);
                    setSeconds(0);
                } else if (time.mode === 'pomodoro') {
                    dispatch(setMode('shortBreak'));
                    setMinutes(5);
                    setSeconds(0);
                } else {
                    dispatch(setMode('pomodoro'));
                    setMinutes(25);
                    setSeconds(0);
                }
                return;
            }
        }
    }, [time.isRunning, minutes, seconds]);

    return {
        minutes,
        seconds,
        startTimer,
        stopTimer,
        time,
    };
};
export default usePomodoroTimer;
