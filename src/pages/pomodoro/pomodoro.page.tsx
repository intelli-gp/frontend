import usePomodoroTimer from '../../hooks/pomodoroTimer.hook';
import { player } from '../../utils/sounds';
import {
    CenterElement,
    ControlButton,
    ModeButton,
    ModesContainer,
    PomodoroContainer,
    Timer,
} from './pomodoro.styles';
import button from '../../assets/sounds/button-press.wav'
import { useCallback } from 'react';

const buttonSound = player({
    asset: button,
});


const PomodoroPage = () => {
    const {
        minutes,
        seconds,
        isRunning,
        startTimer,
        stopTimer,
        timerMode,
        setTimerMode,
        time,
    } = usePomodoroTimer();


    const toggleTimer = useCallback(() => {
        buttonSound.play();
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }, [startTimer, stopTimer, isRunning]);
    return (
        <CenterElement>
            <PomodoroContainer mode={timerMode}>
                <ModesContainer>
                    <ModeButton
                        onClick={() => setTimerMode('pomodoro')}
                        active={String(timerMode === 'pomodoro')}
                    >
                        Pomodoro
                    </ModeButton>
                    <ModeButton
                        onClick={() => setTimerMode('shortBreak')}
                        active={String(timerMode === 'shortBreak')}
                    >
                        Short Break
                    </ModeButton>
                    <ModeButton
                        onClick={() => setTimerMode('longBreak')}
                        active={String(timerMode === 'longBreak')}
                    >
                        Long Break
                    </ModeButton>
                </ModesContainer>
                <Timer>
                    {String(minutes).padStart(2, '0')}:
                    {String(seconds).padStart(2, '0')}
                </Timer>
                <div className='flex flex-col items-center gap-3'>
                <ControlButton
                    onClick={toggleTimer}
                    mode={timerMode}
                >
                    {isRunning ? 'PAUSE' : 'START'}
                </ControlButton>
                <p>
                    Round #{time.pomodoro.round}
                </p>
                </div>
            </PomodoroContainer>
        </CenterElement>
    );
};
export default PomodoroPage;
