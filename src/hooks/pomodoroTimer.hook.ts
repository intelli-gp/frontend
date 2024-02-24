import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import alarm from '../assets/sounds/alarm-digital.mp3';
import { RootState, incrementRound, setMode } from '../store';
import { player } from '../utils/sounds';

type State = {
    mode: string;
    round: number;
    autoBreaks: boolean;
    autoPomodoros: boolean;
    longBreakInterval: number;
};
export type TimerModes = 'pomodoro' | 'shortBreak' | 'longBreak';
const usePomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const dispatch = useDispatch();
    const timeSelector = createSelector(
        (state: RootState) => state.timer.pomodoro,
        (timer: State) => {
            return {
                ...timer,
            };
        },
    );

    const time = useSelector(timeSelector);
    useEffect(() => {
        console.log(time.mode);
        //    setTimerMode(time.pomodoro.mode)
    }, [time]);
    const alarmAudio = player({
        asset: alarm,
    });
    const startTimer = () => {
        setIsRunning(true);
    };
    const stopTimer = () => {
        setIsRunning(false);
    };
    useEffect(() => {
        setIsRunning(false);
        if (time.mode === 'pomodoro') {
            setMinutes(25);
            setSeconds(0);
        } else if (time.mode === 'shortBreak') {
            setMinutes(5);
            setSeconds(0);
        } else if (time.mode === 'longBreak') {
            setMinutes(15);
            setSeconds(0);
        }
    }, [time.mode]);
    useEffect(() => {
        let interval: any = null;

        if (isRunning) {
            if (Number(minutes) === 0 && Number(seconds) === 0) {
                stopTimer();
                alarmAudio.play();

                if (time.mode === 'shortBreak' || time.mode === 'longBreak') {
                    dispatch(incrementRound());
                }

                if (time.round % 3 === 0 && time.mode === 'pomodoro') {
                    dispatch(setMode('longBreak'));
                } else if (time.mode === 'pomodoro') {
                    dispatch(setMode('shortBreak'));
                } else {
                    dispatch(setMode('pomodoro'));
                }
                return;
            }
            if (Number(seconds) === 0) {
                setSeconds(59);
                setMinutes((prevTime) => prevTime - 1);
            }
            if (Number(seconds) > 0) {
                interval = setInterval(() => {
                    setSeconds((prevTime) => prevTime - 1);
                }, 1000);
            }
        }

        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds]);

    return {
        minutes,
        seconds,
        isRunning,
        startTimer,
        stopTimer,
        time,
    };
};
export default usePomodoroTimer;
