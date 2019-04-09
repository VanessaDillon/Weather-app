window.addEventListener('load', () => {
    let long; //longitude
    let lat; //latitude
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    // latitude: 32.350208, longitude: -89.99567359999999
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => { //find location
            long = position.coords.longitude; //variables for latitude and longitude
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/4158ed53e5b6f0f439672413ff32add6/${lat},${long}`; //api used, changed coordinates in link to lat and long variables

            fetch(api) //use the api to retrieve information
                .then(response=>{ //turns into json
                    return response.json();
                })
                .then(data => {
                    console.log(data) //keep or delete to show errors
                    const { temperature, summary, icon } = data.currently; //use the temperature, summary, and icon and set it to current data
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                        //FORMULA FOR CELSIUS
                        let celsius = (temperature - 32) * (5 / 9);

                    //Set Icon 
                    setIcons(icon, document.querySelector('.icon')); //class selector of icon in HTML to seticon

                    //Change temperature to celsius
                   temperatureSection.addEventListener('click', () => {
                       if (temperatureSpan.textContent === "F"){
                           temperatureSpan.textContent = "C";
                           temperatureDegree.textContent = Math.floor(celsius);
                       }else{
                           temperatureSpan.textContent = "F";
                           temperatureDegree.textContent = temperature;
                       }
                   })
                });
            });

            function setIcons(icon, iconID) { //actually setting icons with icon, and ID
                const skycons = new Skycons({"color": "white"}); 
                const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //replace the dashes with underscores so it matches with API
                skycons.play(); //play animation
                return skycons.set(iconID, Skycons[currentIcon]); 
            }
        } 
    });