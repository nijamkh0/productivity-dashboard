function openFeatures() {
    var allelems = document.querySelectorAll(".elem");
    var fullElemPage = document.querySelectorAll(".FullElem");
    var fullElemPageBackbtn = document.querySelectorAll(".FullElem .back");
    var nav = document.querySelector("nav");

    if (nav) {
        nav.style.display = "block";
    }

    document.querySelector(".allElems").style.display = "block";

    
    allelems.forEach(function (elem) {
        elem.addEventListener("click", function () {
            fullElemPage.forEach(function (page) {
                page.style.display = "none";
            });

            document.querySelector(".allElems").style.display = "none";

            fullElemPage[Number(elem.id)].style.display = "block";

            if (nav) {
                nav.style.display = "none";
            }
        });
    });

   
    fullElemPageBackbtn.forEach(function (back) {
        back.addEventListener("click", function () {
            fullElemPage.forEach(function (page) {
                page.style.display = "none";
            });

            document.querySelector(".allElems").style.display = "block";

            if (nav) {
                nav.style.display = "block";
            }
        });
    });
}

openFeatures();

function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task ist is Empty");
  }

  function renderTask() {
    var allTask = document.querySelector(".allTask");
    var sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
                <h5>${elem.task} <span class =${elem.imp}>imp</span></h5>
                <button id=${idx}>Mark as  Complete</button>
               </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    var markcompletedbtn = document.querySelectorAll(".task button");
    markcompletedbtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();

    taskCheckbox.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}

todoList();

function DailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00 `,
  );

  var WholeDaySum = "";

  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";

    WholeDaySum =
      WholeDaySum +
      ` <div class="day-planner-time">
                  <p>${elem}</p>
                  <input id=${idx} type="text" placeholder="..." value=${savedData}>
                </div>`;
  });

  dayPlanner.innerHTML = WholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

DailyPlanner();

function MotivationalQuotes() {
  var motivationQuote = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let resp = await fetch(
      "https://motivational-spark-api.vercel.app/api/quotes/random",
    );
    let data = await resp.json();

    motivationQuote.textContent = data.quote;
    motivationAuthor.textContent = data.author;
  }
  fetchQuote();
}

MotivationalQuotes();

function PomodoroTimer(){

   let timer = document.querySelector(".pomo-timer h1");

var startbtn = document.querySelector(".pomo-timer .start-timer");
var pausebtn = document.querySelector(".pomo-timer .pause-timer");
var resetbtn = document.querySelector(".pomo-timer .reset-timer");
var session = document.querySelector(".pomodoro-fullpage .session");
var isWorkSession = true

let timerinterval = null;
let totalSecond = 25 * 60;

function UpDateTime() {
  let minutes = Math.floor(totalSecond / 60);
  let seconds = totalSecond % 60;

  timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
}

function startTimer() {
  clearInterval(timerinterval);

  if(isWorkSession){
    
    
     timerinterval = setInterval(function () {
    if (totalSecond > 0) {
      totalSecond--;
       UpDateTime();
    } else {
      isWorkSession = false
      clearInterval(timerinterval);
      timerinterval = null;
       timer.innerHTML = `05:00`
         session.innerHTML = 'Take a Break'
    session.style.backgroundColor = 'var(--blue)'
     totalSecond = 5*60
    }
   
  }, 10);
  }else{
  
    
      timerinterval = setInterval(function () {
    if (totalSecond > 0) {
      totalSecond--;
      UpDateTime();
    } else {
      isWorkSession = true
      clearInterval(timerinterval);
      timerinterval = null;
       timer.innerHTML = `25:00`
       session.innerHTML = 'Work Session'
    session.style.backgroundColor = 'var(--green)'
    totalSecond = 25*60
    }
  
  }, 10);
  }

 
}

function PauseTimer() {
  clearInterval(timerinterval);
  timerinterval = null;
}
function ResetTimer() {
  clearInterval(timerinterval);
  totalSecond = 25 * 60;
  UpDateTime();
}

startbtn.addEventListener("click", startTimer);
pausebtn.addEventListener("click", PauseTimer);
resetbtn.addEventListener("click", ResetTimer);

}

 PomodoroTimer()

function WeatherTimeD(){
   var apiKey ='f3bbfcc49ef04c7f942155722262710'
 var city = 'Mumbai'


var header1Time = document.querySelector('.header-1 h1')
var header1Date = document.querySelector('.header-1 h2')
var header2temp = document.querySelector('.header-2 h2')
var header2Condition = document.querySelector('.header-2 h3')
var precipitation = document.querySelector('.header-2 .precipitation')
var humidity = document.querySelector('.header-2 .humidity')
var wind = document.querySelector('.header-2 .wind')

var data = null

 async function weatherAPICall(){
     var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)

    data = await response.json()  

    header2temp.innerHTML =`${data.current.temp_c}°C`
    header2Condition.innerHTML = `${data.current.condition.text}`
    wind.innerHTML =`Wind:${data.current.wind_kph}km/h`
    precipitation.innerHTML =`Humidity:${data.current.humidity}%`
    humidity.innerHTML =`Heat Index:${data.current.heatindex_c}%`

 }

 weatherAPICall()
var date =null
 function timedate(){
     const totaldaysOfWeek =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
     const totalMonths =["January","February","March","April","May","June","July","August","September","October","November","December"]
     date = new Date()
      var dayofweek = totaldaysOfWeek[date.getDay()]
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      var tarik = date.getDate()
      var month = totalMonths[date.getMonth()]
      var year = date.getFullYear()

      header1Date.innerHTML = `${tarik} ${month}, ${year}`

      if(hours>12){
           header1Time.innerHTML =`${dayofweek}, ${String(hours-12).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} PM`
      }else{
        header1Time.innerHTML =`${dayofweek}, ${hours}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}AM`
      }
 }

 setInterval(() => {
   timedate()
 }, 1000);

}
 WeatherTimeD()
 
function changeTheme() {

    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--primary', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--primary', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#D4C9BE')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--primary', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 0
        }

    })


}

changeTheme()


