import usePomodoroTimer from '../../../../../New folder/backend/src/hooks/pomodoroTimer/pomodoroTimer.hook';
import {
    CenterElement,
    ControlButton,
    ModeButton,
    ModesContainer,
    PomodoroContainer,
    Timer,
} from './pomodoro.styles';

const PomodoroPage = () => {
    const {
        minutes,
        seconds,
        isRunning,
        startTimer,
        stopTimer,
        timerMode,
        setTimerMode,
    } = usePomodoroTimer();

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
                <ControlButton
                    onClick={isRunning ? stopTimer : startTimer}
                    mode={timerMode}
                >
                    {isRunning ? 'PAUSE' : 'START'}
                </ControlButton>
            </PomodoroContainer>
        </CenterElement>
    );
};
export default PomodoroPage;
