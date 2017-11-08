document.addEventListener("load", resultsPageLoad());

function resultsPageLoad() {

    var petResultsObject = localStorage.getItem('singleAnimalResults');

    

    if (petResultsObject !== null) { //checking for single animal return
        petResultsObject = JSON.parse(petResultsObject);

        var petDetails = petResultsObject.pet;

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

        var name = petDetails.name.$t;
        var description = petDetails.description.$t;
        var age = petDetails.age.$t;
        var shots = "NA";
        var fixed= "NA";
        var houseTrained= "NA";
        var sex = petDetails.sex.$t;
        var size = petDetails.size.$t;
        var breed = petDetails.breeds.breed.$t;

        for(var i = 0; i < petDetails.options.option.length; i++){
            if(petDetails.options.option[i].$t === "hasShots"){
                shots = "Yes"
            } else if(petDetails.options.option[i].$t === "altered"){
                fixed = "Yes"
            } else if(petDetails.options.option[i].$t === "housetrained"){
                houseTrained = "Yes"
            }
        }

        //build description in HTML
        var descriptionDiv = $("<div class='animal-description-details'>");

        descriptionDiv.append("<p><b>Name: </b>" + name + "</p>")
        descriptionDiv.append("<p><b>Age: </b>" + age  + "</p>")
        descriptionDiv.append("<p><b>Breed: </b>" + breed + "</p>")
        descriptionDiv.append("<p><b>Sex: </b>" + sex + "</p>")
        descriptionDiv.append("<p><b>Size: </b>" + size + "</p>")
        descriptionDiv.append("<p><b>Shots: </b>" + shots  + "</p>")
        descriptionDiv.append("<p><b>Fixed: </b>" + fixed + "</p>")
        descriptionDiv.append("<p><b>House Trained: </b>" + houseTrained + "</p>")
        descriptionDiv.append("<p><b>Description: </b>" + description + "</p>")

        //add to container
        $("#animal-carousel-results-info").append(descriptionDiv);



        //MAP INFO
        $("#animal-carousel-results-map")


    } else {
        //then look at the multiAnimalResults localstorage
    }
    



    //console.log(petResultsArr);
}