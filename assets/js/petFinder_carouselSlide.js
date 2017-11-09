$("#animal-carousel-results-photo").on('slid.bs.carousel', function (e) {
    console.log('slide event!');

    var currentIndex = $('div.active').index();

    //index position will allow for referring to locally stored JSON object
    console.log("current pic: " + currentIndex)

    var multPetResultsObject = localStorage.getItem('multAnimalResults');

    if (multPetResultsObject) { //if more than one photo is in carousel

        multPetResultsObject = JSON.parse(multPetResultsObject);

        var petDetails = multPetResultsObject.pets.pet;

        console.log(petDetails);


        for (var i = 0; i < petDetails.length; i++) {
            if (currentIndex === i) { //match active pet in carousel with pet in array
                var petInfo = petDetails[i]
                insertInfo(petInfo)//petFinder_resultsPageLoad.js
            }
        }
    }

    //loop through results array
    //loop through photos for 300px photo
    //if imgaddress === null after for loop, assign image not available
    //assign pet id to image

// var url = 'http://api.petfinder.com/pet.get?key=435c7d11e964556e87d7de00e3333dba&location=' + location

// if(animalType !== 'any'){
//     url += '&animal=' + animalType;
// }

// if(breed !== 'any'){
//     url += '&breed=' + breed;
// }

// if(age !== 'Any'){
//     url += '&age=' + age;
// }

// if(size !== 'any'){
//     url += '&size=' + size;
// }

// if(gender !== 'any'){
//     url += '&sex=' + gender;
// }

// url += '&count=15&format=json'

// $.ajax({
//     type: 'GET',
//     data: {},
//     url: url + '&callback=?',
//     dataType: 'json',
//     success: function (data) {

//         var petfinder = data.petfinder.pets;

//         var isArray = $.isArray(petfinder.pet)

//         if(isArray){
//             localStorage.setItem("multAnimalResults", JSON.stringify(data.petfinder));
//             // localStorage.setItem("singleAnimalResults", null);
//         } else {
//             localStorage.setItem("singleAnimalResults", JSON.stringify(data.petfinder.pets));
//         }
//         // console.log(petfinder);

//         window.location.href = "results-page.html";
//         // console.log("is Array: " + isArray);


//     }
// })
});