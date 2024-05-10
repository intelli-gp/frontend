const workercode = () => {
  let timerInterval: any;
  let minutes: number;
  let seconds: number;
  
  self.onmessage = function ({ data: { turn, initialMinutes, initialSeconds } }) {
    if (turn === "off" || timerInterval) {
      clearInterval(timerInterval);
      minutes = initialMinutes;
      seconds = initialSeconds;

    }
    if (turn === "on") {
      minutes = initialMinutes;
      seconds = initialSeconds;
      timerInterval = setInterval(() => {
        if (seconds > 0) {
          seconds -= 1;
        
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
       
        }      
        self.postMessage({ minutes, seconds });
      }, 1000);
    }
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/typescript" });
const worker = URL.createObjectURL(blob);

export default worker;
