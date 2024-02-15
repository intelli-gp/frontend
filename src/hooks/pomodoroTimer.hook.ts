import { useEffect, useState } from 'react';
import alarm from '../assets/sounds/alarm-digital.mp3'
import { player } from '../utils/sounds';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, incrementRound } from '../store';
import { createSelector } from 'reselect';


export type TimerModes = 'pomodoro' | 'shortBreak' | 'longBreak';
const usePomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timerMode, setTimerMode] = useState<TimerModes>('pomodoro');
    const dispatch = useDispatch();
    const timeSelector = createSelector(
        (state: RootState) => state.timer,
        (timer: any) => {
          return {
            ...timer,
          };
        }
      );
      
      const time = useSelector(timeSelector);
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
        if (timerMode === 'pomodoro') {
            setMinutes(0);
            setSeconds(20);
        } else if (timerMode === 'shortBreak') {
            setMinutes(0);
            setSeconds(5);
        } else if (timerMode === 'longBreak') {
            setMinutes(0);
            setSeconds(6);
        }
    }, [timerMode]);
    useEffect(() => {
        let interval: any = null;

        if (isRunning) {
            if (Number(minutes) === 0 && Number(seconds) === 0) {
                stopTimer();
                alarmAudio.play();

                if (timerMode === 'shortBreak'|| timerMode === 'longBreak') {
                    dispatch(incrementRound());
                }

                if (time.pomodoro.round % 3 === 0 && timerMode === 'pomodoro') {
                    setTimerMode('longBreak');
                } else if (timerMode === 'pomodoro') {
                    setTimerMode('shortBreak');
                } else {
                    setTimerMode('pomodoro');
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
        timerMode,
        setTimerMode,
        isRunning,
        startTimer,
        stopTimer,
        time,
    };
};
export default usePomodoroTimer;
