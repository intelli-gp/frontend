import { useEffect } from 'react';

export function useDocumentTitle(
    minutes: number,
    seconds: number,
    isRunning: boolean,
) {
    useEffect(() => {
        if (isRunning) {
            document.title = ` ${String(minutes).padStart(2, '0')}:${String(
                seconds,
            ).padStart(2, '0')} - Pomodoro`;
        } else {
            document.title = `Mujedd`;
        }
    }, [minutes, seconds, isRunning]);
}
