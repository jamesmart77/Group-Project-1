// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
var latlng, userCityState;



if (localStorage.getItem("userLocation") == null ||(localStorage.getItem("userLocation") =="undefined")) {
    // if we do not have a userLocation stored in local Storage, prompt for it 
geoCodeReturnCoordinates()

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

                var userLocationlocalStorage = returnCityState()
              //  console.log(userLocationlocalStorage);
            
                // Store the username into localStorage using "localStorage.setItem"
                localStorage.setItem("userLocation", userLocationlocalStorage);
            
                // And display that name for the user using "localStorage.getItem"
                $("#location-input").val(userCityState);
                console.log(localStorage.getItem("userLocation"));
                fillInCityState()


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
    //var userLocationlocalStorage = $("#location-input").val().trim();
    
} else {
    console.log("the userLocation Key is" + localStorage.getItem("userLocation"));
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
            localStorage.setItem("userLocation", userCityState);
            console.log(userCityState);
            fillInCityState()
            return userCityState;

        }
    });

}

//we need these two sources included to work properly
//<script src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
//script async defer src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDVKfD2GQPkmzqBhcT_tSHEt2XM69yRCWo&callback=geoCodeReturnCoordinates">