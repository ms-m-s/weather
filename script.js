navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    const url = `https://weather-proxy-api.onrender.com/${latitude}/${longitude}`;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        getIcon(data);
        getTemp(data);
        getDescp(data);
        getCountry(data);
    }).catch(function (error) {
        alert(error);
    });
});

function getIcon(data) {
    let icon = data.weather[0].icon;
    if (icon == "01d")
        document.getElementById("icon").innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/869/869869.png"/>`;
    else if (icon == "01n")
        document.getElementById("icon").innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/3106/3106764.png"/>`;
    else
        document.getElementById("icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png"/>`;
}

function getTemp(data) {
    let celsius = Math.floor(parseFloat(data.main.temp) - 273.15);
    let fahrenheit = Math.floor(parseFloat(data.main.temp) * 9 / 5 - 459.67);
    document.getElementById("temp").innerHTML = celsius + "&deg;<sub>C</sub>";
    document.getElementById("temp").addEventListener("click", function () {
        if (document.getElementById("hidden").innerHTML == "0") {
            document.getElementById("temp").innerHTML = fahrenheit + "&deg;<sub>F</sub>";
            document.getElementById("hidden").innerHTML = "1";
        } else {
            document.getElementById("temp").innerHTML = celsius + "&deg;<sub>C</sub>";
            document.getElementById("hidden").innerHTML = "0";
        }
    });
}

function getDescp(data) {
    document.getElementById("descp").innerHTML = data.weather[0].description;
}

function getCountry(data) {
    document.getElementById("country").innerHTML = data.name + ", " + data.sys.country;
}