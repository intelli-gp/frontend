import { useEffect, useState } from 'react';

export type TimerModes = 'pomodoro' | 'shortBreak' | 'longBreak';
const usePomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timerMode, setTimerMode] = useState<TimerModes>('pomodoro');
    const startTimer = () => {
        setIsRunning(true);
    };
    const stopTimer = () => {
        setIsRunning(false);
    };
    useEffect(() => {
        setIsRunning(false);
        if (timerMode === 'pomodoro') {
            setMinutes(25);
            setSeconds(0);
        } else if (timerMode === 'shortBreak') {
            setMinutes(5);
            setSeconds(0);
        } else if (timerMode === 'longBreak') {
            setMinutes(15);
            setSeconds(0);
        }
    }, [timerMode]);
    useEffect(() => {
        let interval: any = null;

        if (isRunning) {
            if (Number(minutes) === 0 && Number(seconds) === 0) {
                stopTimer();
                setTimerMode((prevMode) => {
                    if (prevMode === 'pomodoro') return 'shortBreak';
                    if (prevMode === 'shortBreak') return 'longBreak';
                    if (prevMode === 'longBreak') return 'pomodoro';
                    return 'pomodoro';
                });
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
        timerMode,
        setTimerMode,
        isRunning,
        startTimer,
        stopTimer,
    };
};
export default usePomodoroTimer;
