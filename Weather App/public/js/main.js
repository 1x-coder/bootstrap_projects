const submitBtn = document.getElementById("submitBtn");
const latt = document.getElementById("latt");
const long = document.getElementById("long");
const city_name = document.getElementById("city_name");
const temp = document.getElementById('temp_val');
const datahide = document.querySelector('.data_hide');
const tempstatus = document.getElementById("temp_status");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");
const cityname = document.getElementById("cityName");


const d = new Date();
let date = d.getDate();
let month = d.getMonth();
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
today_date.innerHTML = `${date}th, ${monthNames[month]}`;

let dayVal = d.getDay();
const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
day.innerHTML = dayName[dayVal];


const getInfo = async (event) => {
    event.preventDefault();
    let cityName = cityname.value;

    if (cityName === "") {
        city_name.innerText = "Please Enter the City Name before search";
        datahide.classList.add("data_hide");
    }
    else {
        try {
            let apilink = (`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=376f357d610893d571318fbc8788697f`);
            const apiResponse = await fetch(apilink);
            const objapiResponse = await apiResponse.json();
            const arrDatacity = [objapiResponse];
            // console.log(arrDatacity); //Whole data of geocode api call
            let lattVal = (arrDatacity[0][0].lat).toFixed(2);
            let longtVal = (arrDatacity[0][0].lon).toFixed(2);
            city_name.innerHTML = (`${(arrDatacity[0][0].name)},${(arrDatacity[0][0].country)} `);

            let url = (`https://api.openweathermap.org/data/2.5/weather?lat=${lattVal}&lon=${longtVal}&units=metric&appid=376f357d610893d571318fbc8788697f`);
            const resposne = await fetch(url);
            const objResponse = await resposne.json();
            const arrData = [objResponse];
            // console.log(arrData); //whole data of temp api call
            temp.innerHTML = arrData[0].main.temp;

            const tempmood = arrData[0].weather[0].main;
            if (tempstatus == "Clouds") {
                tempstatus.innerHTML = `<i class="fa-solid fa-cloud"></i>`
            }
            datahide.classList.remove("data_hide");

        } catch {
            city_name.innerText = "Please Enter the correct City Name";
            datahide.classList.add("data_hide");
        }

    }


}

submitBtn.addEventListener('click', getInfo);