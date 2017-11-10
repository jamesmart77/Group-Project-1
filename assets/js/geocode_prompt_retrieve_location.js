// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
var latlng, userCityState;



if (sessionStorage.getItem("userLocation") == null) {
    // if we do not have a userLocation stored in Session Storage, prompt for it 

    function geoCodeReturnCoordinates() {

        // Try HTML5 geolocation.

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log(pos.lat);
                console.log(pos.lng);
                latlng = pos.lat + "," + pos.lng
                console.log(latlng)
                // infoWindow.setPosition(pos);
                console.log("Location found.");
                // infoWindow.open(map);
                // map.setCenter(pos);

            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
                return latlng;
            });
        } else {
            // Browser doesn't support Geolocation; return false
            handleLocationError(false, infoWindow, map.getCenter());
            console.log("Browser doesn't support geolocation")
            return false;
        }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    

    // Grab the user input
    //var userLocationSessionStorage = $("#location-input").val().trim();
    var userLocationSessionStorage = returnCityState()
    alert("submit button clicked.")

    // Store the username into localStorage using "localStorage.setItem"
    sessionStorage.setItem("userLocation", userLocationSessionStorage);

    // And display that name for the user using "localStorage.getItem"
    $("#location-input").val(sessionStorage.getItem("userLocation"));
    alert(sessionStorage.getItem("userLocation"));

} else {
    console.log("the userLocation Key is" + sessionStorage.getItem("userLocation"));
    fillInCityState()
}






//the function below takes the variable latlng, and returns a json performs an
//api call taking the latlng variable of coordinates, and pasting it into a
//url, then defines userCityState to be a combination of the city portion of response
//and the state

function returnCityState() {
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng +
        "&key=AIzaSyDVKfD2GQPkmzqBhcT_tSHEt2XM69yRCWo"

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (response) {
            userCityState = response.results[3].formatted_address;
            console.log(userCityState);
            return userCityState

        }
    });

}

//we need these two sources included to work properly
//<script src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
//script async defer src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDVKfD2GQPkmzqBhcT_tSHEt2XM69yRCWo&callback=geoCodeReturnCoordinates">