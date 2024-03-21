const apiKey = "14d049b8ba65b761b2ba7498caea4860";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
    }

    if(!inputBox.length){
        document.querySelector(".weather").style.display = "none";
        
    }

    document.querySelector(".city").innerHTML = `<i class="fa-solid fa-location-dot"></i>  ` + data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "Images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "Images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "Images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "Images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "Images/mist.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "./Images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

}

// ------- AutoComplete ------------------------

let availableKeywords = [
            'Ajmer',  'Alwar', 'Bikaner', 'Barmer', 'Banswara', 'Bharatpur', 'Baran', 'Bundi', 'Bhilwara', 'Churu', 'Chittorgarh', 'Dausa', 'Dholpur', 'Dungapur', 'Ganganagar', 'Hanumangarh', 'Jhunjhunu', 'Jalore', 'Jodhpur', 'Jaipur', 'Jaisalmer', 'Jhalawar', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sikar', 'Sawai Madhopur', 'Sirohi', 'Tonk', 'Udaipur',
];



inputBox.onkeyup = ()=> {
    let result = [];
    let input = inputBox.value;
    if(input.length){
        result = availableKeywords.filter((keyword)=>{
           return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }

    display(result);

    if(!result.length){
        resultBox.style.display="none";
    }
}


async function display(result){
    const content = result.map((list)=>{
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });

    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";

}

function selectInput(list){
    inputBox.value = list.innerHTML;
    resultBox.style.display="none";
}

searchBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
  });

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

checkWeather();