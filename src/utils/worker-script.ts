let timerInterval: NodeJS.Timeout;
let minutes: number;
let seconds: number;

// The onmessage event handler is triggered when the worker receives a message from the main thread
self.onmessage = function ({ data: { turn, initialMinutes, initialSeconds } }) {
    // If the timer should be turned off or if it's already running, clear the interval and reset the minutes and seconds
    if (turn === 'off' || timerInterval) {
        clearInterval(timerInterval);
        minutes = initialMinutes;
        seconds = initialSeconds;
    }
    // If the timer should be turned on, start the interval
    if (turn === 'on') {
        minutes = initialMinutes;
        seconds = initialSeconds;
        timerInterval = setInterval(() => {
            if (seconds > 0) {
                seconds -= 1;
            } else if (minutes > 0) {
                minutes -= 1;
                seconds = 59;
            }
            // Send a message back to the main thread with the current minutes and seconds
            self.postMessage({ minutes, seconds });
        }, 1000);
    }
};
