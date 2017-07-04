var lat,
    lon,
    tempC,
    tempF;

var unitConversion = function(u) {
    switch(u) {
        case "F":
            htmlUpdates.mainTemp(tempF);
            break;
            
        case "C":
            tempC = parseInt((tempF - 32) * (5 / 9));
            htmlUpdates.mainTemp(tempC);
            break;
    }
};

var htmlUpdates = {
    
    mainTemp: function(t) {
        var newTemp = t;
        $("#mainTemp").html(newTemp);
    }
    
}

var getWeather = function() {
    var self = this;
    
    var apiKey = "fae5ff9943f6e263ec870d049b13f11c",
        url = "https://api.darksky.net/forecast/",
        apiCall = url + apiKey + "/" + lat + "," + lon + "?callback=?";
    
    var parseWeather = function(weatherData) {
        tempF = Math.floor(weatherData.currently.apparentTemperature);
        htmlUpdates.mainTemp(tempF);
        //console.log(tempF);
        console.log(weatherData);
    };
    
    $.getJSON(apiCall, function(data) {
       parseWeather(data);
    });
    
    
};

var getLocation = function() {
    var apiKey = "AIzaSyC56_J0IR6PuhGoEBzH3wl2hI_oIaeKJ4A",
        url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=",
        apiCall = url + lat + "," + lon + "&key=" + apiKey + "&callback=parseLocation";
    
    var parseLocation = function(locationData) {
        cityStateCountry = locationData.results[2]["formatted_address"];
        $("#location").html(cityStateCountry);
        //console.log(locationData.results[2]["formatted_address"]); 
        console.log(locationData);
    };
    
    $.getJSON(apiCall, function(data) {
        parseLocation(data);
    });  
};

var getCoords = function() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    var success = function(pos) {
        var coords = pos.coords;
        lat = coords.latitude;
        lon = coords.longitude;
        console.log(lat + " | " + lon);
        getWeather();
        getLocation();
    };
    
    var error = function(err) {
        console.log(err);  
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);
};

var buttonListeners = function() {
    $("#unit").on("click", function() {
        $("#unit").html($("#unit").text() == "F" ? "C" : "F");
        unitConversion($("#unit").text());
    });
};

$(document).ready(function () {
    getCoords();
    buttonListeners();
});