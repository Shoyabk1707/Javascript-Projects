const body = document.querySelector("body"),
hourHand = document.querySelector(".hour"),
minuteHand = document.querySelector(".minute"),
secondHand = document.querySelector(".second"),
modeSwitch = document.querySelector(".mode-switch");


const updateTime = () =>{
// Get current time and calculate degrees for clock hands
    let date = new Date(),
    secToDeg = (date.getSeconds() / 60) * 360,
    minuteToDeg = (date.getMinutes() / 60) * 360,
    hourToDeg = (date.getHours() / 60) * 360;

// Rotate the clock hands to the appropriate degree based on the current time
    secondHand.style.transform = `rotate(${secToDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteToDeg}deg)`;
    hourHand.style.transform = `rotate(${hourToDeg}deg)`;
};

// Mode Switch
modeSwitch.addEventListener("click", ()=>{
    body.classList.toggle("dark");

    const isDarkMode = body.classList.contains("dark");

    modeSwitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

    localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
});

if(localStorage.getItem("mode") === "Dark Mode"){
    body.classList.add("dark");
    modeSwitch.textContent = "Light Mode";
}

// Call UpdateTime to set clock hands every second
setInterval(updateTime, 1000);
