document.addEventListener("load", resultsPageLoad());

var petLocation
function resultsPageLoad() {

    $(".carousel-inner").empty();
    $(".animal-carousel-results-info").empty();

    var singlePetResultsObject = localStorage.getItem('singleAnimalResults');
    var multPetResultsObject = localStorage.getItem('multAnimalResults');



    if (singlePetResultsObject) { //truthy statement checking for single animal return
        singlePetResultsObject = JSON.parse(singlePetResultsObject);

        var petDetails = singlePetResultsObject.pet;

        console.log(petDetails);

        var imgDiv = $("<div class='carousel-item active'>");
        var petImg = $("<img class='d-block w-100 pet-carousel-img' alt='pet-image'>");
        var imgAddress

        //loop through images array and find 300px image
        for (var t = 0; t < petDetails.media.photos.photo.length; t++) {
            let imgItr = petDetails.media.photos.photo[t].$t;

            if (imgItr.indexOf(300) >= 0) {
                imgAddress = petDetails.media.photos.photo[t].$t;
            }
        }

        petImg.attr({
            src: imgAddress,
            'data-id': petDetails.id.$t
        })

        imgDiv.append(petImg);

        $(".carousel-inner").append(imgDiv);

        //DESCRIPTION DETAILS

        insertInfo(petDetails)

        // var name = petDetails.name.$t;
        // var description = petDetails.description.$t;
        // var age = petDetails.age.$t;
        // var shots = "NA";
        // var fixed = "NA";
        // var houseTrained = "NA";
        // var sex = petDetails.sex.$t;
        // var size = petDetails.size.$t;
        // var breed = petDetails.breeds.breed.$t;

        // for (var i = 0; i < petDetails.options.option.length; i++) {
        //     if (petDetails.options.option[i].$t === "hasShots") {
        //         shots = "Yes"
        //     } else if (petDetails.options.option[i].$t === "altered") {
        //         fixed = "Yes"
        //     } else if (petDetails.options.option[i].$t === "housetrained") {
        //         houseTrained = "Yes"
        //     }
        // }

        // //build description in HTML
        // var descriptionDiv = $("<div class='animal-description-details'>");

        // descriptionDiv.append("<p><b>Name: </b>" + name + "</p>")
        // descriptionDiv.append("<p><b>Age: </b>" + age + "</p>")
        // descriptionDiv.append("<p><b>Breed: </b>" + breed + "</p>")
        // descriptionDiv.append("<p><b>Sex: </b>" + sex + "</p>")
        // descriptionDiv.append("<p><b>Size: </b>" + size + "</p>")
        // descriptionDiv.append("<p><b>Shots: </b>" + shots + "</p>")
        // descriptionDiv.append("<p><b>Fixed: </b>" + fixed + "</p>")
        // descriptionDiv.append("<p><b>House Trained: </b>" + houseTrained + "</p>")
        // descriptionDiv.append("<p><b>Description: </b>" + description + "</p>")

        // //add to container
        // $("#animal-carousel-results-info").append(descriptionDiv);

        // debugger;

        // //MAP INFO
        // $("#animal-carousel-results-map")


    } else if (multPetResultsObject) { //checking for multiple animal return
        //then look at the multiAnimalResults localstorage


        multPetResultsObject = JSON.parse(multPetResultsObject);

        var petDetails = multPetResultsObject.pets.pet;

        console.log(petDetails);


        for (var i = 0; i < petDetails.length; i++) {
            let imgDiv
            if (i === 0) {
                imgDiv = $("<div class='carousel-item active'>");
            } else {
                imgDiv = $("<div class='carousel-item'>");
            }

            let petImg = $("<img class='d-block w-100 pet-carousel-img' alt='pet-image'>");
            var imgAddress = "";

            //loop through images array and find 300px image
            for (var t = 0; t < petDetails[i].media.photos.photo.length; t++) {
                let imgItr = petDetails[i].media.photos.photo[t].$t;

                if (imgItr.indexOf(300) >= 0) {
                    imgAddress = petDetails[i].media.photos.photo[t].$t;
                }
            }

            //if no 300px image was found
            if (imgAddress) {} else {
                imgAddress = "assets/images/imageNA.png";
            }

            petImg.attr({
                src: imgAddress,
                'data-id': petDetails[i].id.$t
            })

            imgDiv.append(petImg);

            $(".carousel-inner").append(imgDiv);

            //insert first animals info
            if (i === 0) {
                var petInfo = petDetails[i]
                insertInfo(petInfo)
            }
        }

        //loop through results array
        //loop through photos for 300px photo
        //if imgaddress === null after for loop, assign image not available
        //assign pet id to image
    } else {
        //if neither single nor multiple, return random 10 animals
    }




    //console.log(petResultsArr);
}

function insertInfo(petDetails) {
    var name = petDetails.name.$t;
    var description = petDetails.description.$t;
    var age = petDetails.age.$t;
    var shots = "NA";
    var fixed = "NA";
    var houseTrained = "NA";
    var sex = petDetails.sex.$t;
    var size = petDetails.size.$t;
    var breed = petDetails.breeds.breed.$t;
      petLocation = petDetails.contact.zip.$t;

    var optionsArr = $.isEmptyObject(petDetails.options.option);

    if (optionsArr) {} else {
        for (var i = 0; i < petDetails.options.option.length; i++) {
            if (petDetails.options.option[i].$t === "hasShots") {
                shots = "Yes"
            } else if (petDetails.options.option[i].$t === "altered") {
                fixed = "Yes"
            } else if (petDetails.options.option[i].$t === "housetrained") {
                houseTrained = "Yes"
            }
        }
    }

    //build description in HTML
    var descriptionDiv = $("<div class='animal-description-details'>");

    //populate with new info
    descriptionDiv.append("<p><b>Name: </b>" + name + "</p>")
    descriptionDiv.append("<p><b>Age: </b>" + age + "</p>")
    descriptionDiv.append("<p><b>Breed: </b>" + breed + "</p>")
    descriptionDiv.append("<p><b>Sex: </b>" + sex + "</p>")
    descriptionDiv.append("<p><b>Size: </b>" + size + "</p>")
    descriptionDiv.append("<p><b>Shots: </b>" + shots + "</p>")
    descriptionDiv.append("<p><b>Fixed: </b>" + fixed + "</p>")
    descriptionDiv.append("<p><b>House Trained: </b>" + houseTrained + "</p>")
    descriptionDiv.append("<p><b>Description: </b>" + description + "</p>")

    //clear & reset
    $("#animal-carousel-results-info").empty();

    //add to container
    $("#animal-carousel-results-info").append(descriptionDiv);
}