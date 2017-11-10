document.addEventListener("load", savedPageLoad());

var savedImgRef = database.ref("");


function savedPageLoad() {
    var savedImgQuery = firebase.database().ref();
    var imgArr = [];

    database.ref().on("value", function(snapshot) {

        var imgCount = snapshot.numChildren();

        savedImgQuery.once("value")
            .then(function(snap) {
                snap.forEach(function(childSnapShot) {
                    var imgID = childSnapShot.val().image;
                    // console.log(imgID);
                    imgArr.push(imgID)
                });
                //get img IDs from petFinder
                getSavedPetIDs(imgArr);
            })
    })
}

function getSavedPetIDs(petsArr) {

    console.log(petsArr)

    $("#saved-animal-container").empty();


    for (var i = 0; i < petsArr.length; i++) {
        var url = 'https://api.petfinder.com/pet.get?key=435c7d11e964556e87d7de00e3333dba&id=' + petsArr[i]


        url += '&format=json'

        $.ajax({
            type: 'GET',
            data: {},
            url: url + '&callback=?',
            dataType: 'json',
            success: function(data) {


                var petfinder = data.petfinder.pet;

                var infoDiv = $("<div id='animal-div' class='card col-lg-2 col-md-4 col-sm-12 col-xs-12'>")
                var cardBody = $("<div class='card-body'>")
                var name = $("<h4 class='card-title'>" + petfinder.name.$t + "</h4>");
                // var animal = $("<div>").html("<b>Animal Type: </b>" + petfinder.animal['$t']);
                // var age = $("<div>").html("<b>Age: </b>" + petfinder.age['$t']);
                // var sex = $("<div>").html("<b>Sex: </b>" + petfinder.sex['$t']);
                // var size = $("<div>").html("<b>Size: </b>" + petfinder.size['$t']);
                var imgAddress = "";

                for (var t = 0; t < petfinder.media.photos.photo.length; t++) {
                    let imgItr = petfinder.media.photos.photo[t].$t;

                    if (imgItr.indexOf(300) >= 0) {
                        imgAddress = petfinder.media.photos.photo[t].$t;
                    }

                }

                if (imgAddress === "") {
                    imgAddress = "assets/images/imageNA.png"
                }

                var photo = $("<img class='card-img-top'>").attr({
                    src: imgAddress,
                    alt: 'pet image',
                    'data-id': petfinder.id.$t
                });
                // infoDiv.append(animal)
                // infoDiv.append(name)
                // infoDiv.append(age)
                // infoDiv.append(sex)
                // infoDiv.append(size)
                infoDiv.append(photo)
                infoDiv.append(cardBody)
                cardBody.append(name)

                // return infoHTML;
                $('#saved-animal-container').append(infoDiv);
                // var isArray = $.isArray(petfinder.pet)

                // //isArray will check if more than one animal has been returned
                // if (isArray) {
                //     localStorage.setItem("multAnimalResults", JSON.stringify(data.petfinder));
                //     // localStorage.setItem("singleAnimalResults", null);
                // } else {
                //     localStorage.setItem("singleAnimalResults", JSON.stringify(data.petfinder.pets));
                // }
                // // console.log(petfinder);

                // window.location.href = "results-page.html";
                // console.log("is Array: " + isArray);


            }
        })
    }
}