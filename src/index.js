

function fetchAndDisplayData() {

    return {
        tempToday: "",
        tempMin: "",
        tempMax: "",
        temp15Days: "",
        date: "",

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
                // the arrow function allows to use the parent scope
                .then((json) => {
                    // test log (delete)
                    console.log(json);

                    this.tempToday = (json.days[1].temp);
                    this.tempMin = (json.days[1].tempmin);
                    this.tempMax = (json.days[1].tempmax);

                    const length = (json.days.length)
                    for (let i = 0; i < length; i++) {
                        this.temp15Days = (json.days[i].temp)
                        this.date = (json.days[i].datetime);

                        console.log(this.date + ": " + this.temp15Days)
                    }
                    this.displayFetchData(json.days);

                    // test log (delete)
                    console.log("The temperature today in " + this.locationInput + " is " + this.tempToday)
                    console.log("The temperature today in " + this.locationInput + " is " + this.tempMin)
                    console.log("The temperature today in " + this.locationInput + " is " + this.tempMax)
                })
        },

    displayFetchData(list) {
            const template = document.getElementById("template");
            const displayContainer = document.getElementById("display");
            const clone = template.content.cloneNode(true);

            clone.getElementById("city-name").textContent = this.locationInput;
            clone.getElementById("temperature").textContent = "The temperature today in " + this.locationInput + " is " + this.tempToday + "°F";
            clone.getElementById("min-temp").textContent = "The min temperature today in " + this.locationInput + " is " + this.tempMin + "°F";
            clone.getElementById("max-temp").textContent = "The max temperature today in " + this.locationInput + " is " + this.tempMax + "°F";

            let i = 0;
            for (let day of list) {
                let liCreation = document.createElement("li");
                liCreation.textContent = this.date + " : " + this.temp15Days;
                i++;
                clone.getElementById("forecast-list").appendChild(liCreation);
            }

            displayContainer.appendChild(clone);
        }
    }
}

const fetchAndDisplay = fetchAndDisplayData();


// Submit form
function searchSubmit() {
    const searchButton = document.getElementById("location-form");
    searchButton.addEventListener("submit", (e) => {
        e.preventDefault();
        fetchAndDisplay.locationFetch();
    })
}
searchSubmit();

