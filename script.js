navigator.geolocation.getCurrentPosition((position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4c5625a855d241482d21471074d82494`;

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.weather[0].icon == "01d")
            document.getElementById("icon").innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/869/869869.png"/>`;
        else if (data.weather[0].icon == "01n")
            document.getElementById("icon").innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/3106/3106764.png"/>`;
        else
            document.getElementById("icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>`;
        var celsius = (parseFloat(data.main.temp) - 273.15).toFixed(2);
        var fahrenheit = ((parseFloat(data.main.temp) * 9 / 5) - 459.67).toFixed(2);
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
        document.getElementById("dscp").innerHTML = data.weather[0].description;
        document.getElementById("country").innerHTML = data.name + ", " + data.sys.country;
    }).catch(function (error) {
        alert(error);
    });
});