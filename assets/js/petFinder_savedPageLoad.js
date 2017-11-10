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
        var url = 'http://api.petfinder.com/pet.get?key=435c7d11e964556e87d7de00e3333dba&id=' + petsArr[i]


        url += '&format=json'

        $.ajax({
            type: 'GET',
            data: {},
            url: url + '&callback=?',
            dataType: 'json',
            success: function(data) {


                var petfinder = data.petfinder.pet;

                console.log(petfinder)
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