import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import button from '../../assets/sounds/button-press.wav';
import { useDocumentTitle } from '../../hooks/docTitle.hook';
import usePomodoroTimer from '../../hooks/pomodoroTimer.hook';
import { BetweenPageAnimation } from '../../index.styles';
import { setMinutes, setMode, setSeconds, setToggleTimer } from '../../store';
import { player } from '../../utils/sounds';
import {
    ControlButton,
    ModeButton,
    ModesContainer,
    PageContainer,
    PomodoroContainer,
    Skip,
    Timer,
} from './pomodoro.styles';

const buttonSound = player({
    asset: button,
});

const PomodoroPage = () => {
    const { startTimer, stopTimer, time } = usePomodoroTimer();

    const toggleTimer = useCallback(() => {
        buttonSound.play();
        if (time.isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }, [startTimer, stopTimer, time.isRunning]);
    const dispatch = useDispatch();

    // This custom hook updates the browser tab's title to reflect the current state of the timer.
    useDocumentTitle(time.minutes, time.seconds, time.isRunning);
    if (time.minutes === undefined || time.seconds === undefined) {
        dispatch(setMinutes(25));
        dispatch(setSeconds(0));
        dispatch(setMode('pomodoro'));
    }
    return (
        <PageContainer {...BetweenPageAnimation}>
            <PomodoroContainer mode={time.mode}>
                <ModesContainer>
                    <ModeButton
                        onClick={() => {
                            stopTimer();
                            dispatch(setMinutes(25));
                            dispatch(setSeconds(0));
                            dispatch(setMode('pomodoro'));
                        }}
                        active={String(time.mode === 'pomodoro')}
                    >
                        Pomodoro
                    </ModeButton>
                    <ModeButton
                        onClick={() => {
                            stopTimer();
                            dispatch(setMinutes(5));
                            dispatch(setSeconds(0));
                            dispatch(setMode('shortBreak'));
                        }}
                        active={String(time.mode === 'shortBreak')}
                    >
                        Short Break
                    </ModeButton>
                    <ModeButton
                        onClick={() => {
                            stopTimer();
                            dispatch(setMinutes(15));
                            dispatch(setSeconds(0));
                            dispatch(setMode('longBreak'));
                        }}
                        active={String(time.mode === 'longBreak')}
                    >
                        Long Break
                    </ModeButton>
                </ModesContainer>
                <Timer>
                    {String(time.minutes).padStart(2, '0')}:
                    {String(time.seconds).padStart(2, '0')}
                </Timer>
                <div className="flex flex-col items-center gap-3 relative w-[600px] ">
                    <ControlButton onClick={toggleTimer} mode={time.mode}>
                        {time.isRunning ? 'PAUSE' : 'START'}
                    </ControlButton>
                    {time.isRunning && (
                        <Skip onClick={() => dispatch(setToggleTimer(true))} />
                    )}
                    <p>Round #{time.round}</p>
                </div>
            </PomodoroContainer>
        </PageContainer>
    );
};
export default PomodoroPage;
