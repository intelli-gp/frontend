import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import button from '../../assets/sounds/button-press.wav';
import usePomodoroTimer from '../../hooks/pomodoroTimer.hook';
import { BetweenPageAnimation } from '../../index.styles';
import { setMode } from '../../store';
import { player } from '../../utils/sounds';
import {
    ControlButton,
    ModeButton,
    ModesContainer,
    PageContainer,
    PomodoroContainer,
    Timer,
} from './pomodoro.styles';

const buttonSound = player({
    asset: button,
});

const PomodoroPage = () => {
    const { minutes, seconds, isRunning, startTimer, stopTimer, time } =
        usePomodoroTimer();

    const toggleTimer = useCallback(() => {
        buttonSound.play();
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }, [startTimer, stopTimer, isRunning]);
    const dispatch = useDispatch();

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PomodoroContainer mode={time.mode}>
                <ModesContainer>
                    <ModeButton
                        onClick={() => dispatch(setMode('pomodoro'))}
                        active={String(time.mode === 'pomodoro')}
                    >
                        Pomodoro
                    </ModeButton>
                    <ModeButton
                        onClick={() => dispatch(setMode('shortBreak'))}
                        active={String(time.mode === 'shortBreak')}
                    >
                        Short Break
                    </ModeButton>
                    <ModeButton
                        onClick={() => dispatch(setMode('longBreak'))}
                        active={String(time.mode === 'longBreak')}
                    >
                        Long Break
                    </ModeButton>
                </ModesContainer>
                <Timer>
                    {String(minutes).padStart(2, '0')}:
                    {String(seconds).padStart(2, '0')}
                </Timer>
                <div className="flex flex-col items-center gap-3">
                    <ControlButton onClick={toggleTimer} mode={time.mode}>
                        {isRunning ? 'PAUSE' : 'START'}
                    </ControlButton>
                    <p>Round #{time.round}</p>
                </div>
            </PomodoroContainer>
        </PageContainer>
    );
};
export default PomodoroPage;
