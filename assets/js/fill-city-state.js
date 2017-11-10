
function fillInCityState(){
    //we do not need to call returnCityState, because that function calls this one.
    //that would result in an infinite loop.
    //  returnCityState()
    $("#location-input").val(userCityState);
   
    //we are filling in the value from storage of the userLocation
    console.log(userCityState);
    console.log("fill in service ran.")
}