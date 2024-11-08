

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

function display(location, days){

    const template = document.getElementById("template");
        const displayContainer = document.getElementById("display");
        const clone = template.content.cloneNode(true);

        clone.getElementById("city-name").textContent = location;
        clone.getElementById("temperature").textContent = "The temperature today in " + location + " is " + days[0].temp + "°F";
        clone.getElementById("min-temp").textContent = "The min temperature today in " + location + " is " + days[0].tempmin + "°F";
        clone.getElementById("max-temp").textContent = "The max temperature today in " + location + " is " + days[0].tempmax + "°F";

        for (let day of days) {
            let liCreation = document.createElement("li");
            liCreation.textContent = day.datetime + " : " + day.temp + "°F";
            clone.getElementById("forecast-list").appendChild(liCreation);
        }

        displayContainer.appendChild(clone);
}

// Submit form
(function() {

    const fetchAndDisplayObject = createLocationFetcher(display);

    const searchButton = document.getElementById("location-form");
    searchButton.addEventListener("submit", (e) => {
        e.preventDefault();
        fetchAndDisplayObject.locationFetch();
    })
})()


