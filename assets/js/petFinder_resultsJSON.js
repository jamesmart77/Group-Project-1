function singleAnimalResults(url) {
    
    localStorage.removeItem("singleAnimalResults");
    
    $.ajax({
        type: 'GET',
        data: {},
        url: url + '&callback=?',
        dataType: 'json',
        success: function (data) {

            localStorage.setItem("singleAnimalResults", JSON.stringify(data.petfinder));

            window.location.href = "results-page.html";

        }
    })
}

function searchBtnFuntion(url) {

    localStorage.removeItem("multAnimalResults");

        $.ajax({
            type: 'GET',
            data: {},
            url: url + '&callback=?',
            dataType: 'json',
            success: function (data) {
    
                localStorage.setItem("multAnimalResults", JSON.stringify(data.petfinder));
    
    
                window.location.href = "results-page.html";
    
            }
        })
    }