// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
var latlng, userCityState;
var userHasAllowedLocationAccess;

if (localStorage.getItem("userHasAllowedLocationAccess") !== "false") {
	// the user has already disallowed access, do not prompt them,
	//otherwise, proceed
	console.log(localStorage.getItem("userHasAllowedLocationAccess"))

	if (localStorage.getItem("userLocation") == null || (localStorage.getItem("userLocation") == "undefined")) {
		// if we do not have a userLocation stored in local Storage, prompt for it 

		geoCodeReturnCoordinates()

		function geoCodeReturnCoordinates() {

			if (window.navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
						var lat = position.coords.latitude,
							lng = position.coords.longitude,
							latlng = new google.maps.LatLng(lat, lng),
							geocoder = new google.maps.Geocoder();
						geocoder.geocode({
							'latLng': latlng
						}, function (results, status) {
							if (status == google.maps.GeocoderStatus.OK) {
								if (results[1]) {
									for (var i = 0; i < results.length; i++) {
										if (results[i].types[0] === "locality") {
											var city = results[i].address_components[0].short_name;
											var state = results[i].address_components[2].short_name;
											//$("#location-input").val(city + ", " + state);
											userHasAllowedLocationAccess = "true"
											var userLocationlocalStorage = (city + ", " + state)
											$("#location-input").val(userLocationlocalStorage);
											// Store the username into localStorage using "localStorage.setItem"
											localStorage.setItem("userLocation", userLocationlocalStorage);
											localStorage.setItem("userHasAllowedLocationAccess", userHasAllowedLocationAccess);
											console.log(userLocationlocalStorage);
											
										}
									}
								} else {
									console.log("No reverse geocode results.")
								}
							} else {
								console.log("Geocoder failed: " + status)
							}
						});
					},
					function () {
						console.log("Geolocation not available.")
						console.log("user has blocked location search")
						userHasAllowedLocationAccess = false
						localStorage.setItem("userHasAllowedLocationAccess", userHasAllowedLocationAccess);

					});



			}



		}


	}
}

//we need these two sources included to work properly
//<script src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
//script async defer src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDVKfD2GQPkmzqBhcT_tSHEt2XM69yRCWo&callback=geoCodeReturnCoordinates">