
function getAnimalResults(url, type) {

    $.ajax({
        type: 'GET',
        data: {},
        url: url + '&callback=?',
        dataType: 'json',
        success: function (data) {

            if(type === "single"){
                localStorage.setItem("animalResults", JSON.stringify(data.petfinder));
            } else{
                localStorage.setItem("animalResults", JSON.stringify(data.petfinder));
            }
            
            window.location.href = "results-page.html";

        }
    })
}