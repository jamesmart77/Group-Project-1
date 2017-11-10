
function fillInCityState(){
    //we do not need to call returnCityState, because that function calls this one.
    //that would result in an infinite loop.
    // returnCityState()
    $("#location-input").val(sessionStorage.getItem("userLocation"));
    //we are filling in the value from storage of the userLocation
    console.log($("#location-input").text);
    console.log(userCityState);
}