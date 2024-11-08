import "./style.css";
import "@fortawesome/fontawesome-svg-core/index.js";


function createLocationFetcher(callback) {

    return {

        locationInput: "",

        locationFetch() {
            this.locationInput = document.getElementById("locationInput").value;
            console.log(this.locationInput)

            fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + this.locationInput + '?key=TTUAPZNVQABBH9A5GKJ6DLT64', {
                mode: 'cors'
            })
                .then(function (response) {
                    return response.json();
                })

                .then((json) => {
                    callback(this.locationInput, json.days)
                })
        },
    }
}

function display(location, days) {

    const template = document.getElementById("template");
    const displayContainer = document.getElementById("display");
    const clone = template.content.cloneNode(true);

    displayContainer.textContent = "";

    clone.getElementById("city-name").textContent = location;
    clone.getElementById("span").textContent = days[0].icon;
    clone.getElementById("temperature").textContent = days[0].temp + "°F";
    clone.getElementById("min-temp").textContent = "Min " + days[0].tempmin + "°F";
    clone.getElementById("max-temp").textContent = "Max " + days[0].tempmax + "°F";

    for (let day of days) {
        let liCreation = document.createElement("li");
        liCreation.textContent = day.datetime + ":  " + day.temp + "°F";
        clone.getElementById("forecast-list").appendChild(liCreation);
    }

    displayContainer.appendChild(clone);

}

// Submit form
(function () {

    const fetchAndDisplayObject = createLocationFetcher(display);

    const searchButton = document.getElementById("location-form");
    searchButton.addEventListener("submit", (e) => {
        e.preventDefault();
        fetchAndDisplayObject.locationFetch();

    })
})()

