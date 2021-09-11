const timerDiv = document.querySelector("#timer")
const btnStartTimer = document.querySelector("#start-timer")
const pomoDiv = document.querySelector(".pomo-container")
const pomoCompletionID = document.querySelector('#pomo-cycle')
const restCompletionID = document.querySelector('#rest-cycle')

const seconds = 1000;
const minutes = 60 * seconds;
const hours = 60 * minutes;
const day = 24 * hours

let timerId;
let remainingTime = timerDiv.innerText
let restCompleted = false;
let breakTime =  "05:00"

function start_timer(){
    start_time = new Date();
    let timeSpan = final_time - start_time;
    min = Math.floor((timeSpan%hours)/minutes);
    sec = Math.floor((timeSpan%minutes)/seconds);
    if(min<0 && sec <0){
        clearInterval(timerId)
        if(!restCompleted){
            start_break_timer()
        }
        else{
            // cycle completed
            messagedisplay('🚀 pomodoro cycle completed', restCompletionID)
            messagedisplay("reset", btnStartTimer)
            btnStartTimer.removeEventListener('click', start_pomo_timer)
            btnStartTimer.removeEventListener('click', stop_pomo_timer)
            
            btnStartTimer.addEventListener('click', reset_pomo_timer)
        }
        return;
    }
    if(sec<=9){
        sec = "0" + sec
    }
    if(min <=9){
        min = "0" + min
    }
    remainingTime = min + ":" + sec
    timerDiv.innerHTML = remainingTime
    // console.log(min, sec)
    

}
function messagedisplay(msg, ele){
    ele.innerText = msg;
}

function start_break_timer(){

    // let workTimeCompletion = document.createElement('h4')
    // workTimeCompletion.innerText = "awesome work time. now rest"
    // pomoDiv.appendChild(workTimeCompletion);
    messagedisplay('💪 work cycle completed', pomoCompletionID)
    remainingTime = breakTime
    restCompleted = true
    start_pomo_timer()

}
function start_pomo_timer(){
    let start_time = new Date();

    final_time = new Date(start_time);
    final_time.setMinutes ( start_time.getMinutes() + parseInt(remainingTime.split(':')[0]) );
    final_time.setSeconds ( start_time.getSeconds() + parseInt(remainingTime.split(':')[1]) +1 );

    btnStartTimer.removeEventListener('click', start_pomo_timer)
    timerId = setInterval(start_timer, seconds)
    messagedisplay("stop", btnStartTimer)
    btnStartTimer.addEventListener('click', stop_pomo_timer)
}

function stop_pomo_timer(){
    clearInterval(timerId)
    btnStartTimer.removeEventListener('click', stop_pomo_timer)
    messagedisplay("start", btnStartTimer)
    btnStartTimer.addEventListener('click', start_pomo_timer)
}
function reset_pomo_timer(){
    btnStartTimer.removeEventListener('click', reset_pomo_timer)
    remainingTime = "25:00"
    timerDiv.innerText = remainingTime
    restCompleted = false;
    messagedisplay("start", btnStartTimer)
    messagedisplay("", pomoCompletionID)
    messagedisplay("", restCompletionID)
    btnStartTimer.addEventListener('click', start_pomo_timer)

}

btnStartTimer.addEventListener('click', start_pomo_timer)
