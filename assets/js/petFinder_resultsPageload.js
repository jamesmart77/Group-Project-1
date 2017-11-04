document.addEventListener("load", resultsPageLoad());

function resultsPageLoad() {
    
    var petResultsObject = localStorage.getItem('animalResults');
    
    console.log(JSON.parse(petResultsObject));

    //console.log(petResultsArr);
}