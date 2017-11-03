document.addEventListener("load", pageLoad());

function pageLoad() {

    var location = '35005';
    var animalType = ['dog', 'cat', 'bird', 'smallfurry', 'barnyard']
    var age = 'Young'


    for (var i = 0; i < animalType.length; i++) {
        var url =
            'http://api.petfinder.com/pet.getRandom?key=435c7d11e964556e87d7de00e3333dba&location=' + location +
            '&animal=' + animalType[i] + '&age=' + age + '&count=1&output=full&format=json';

        $.ajax({
            type: 'GET',
            data: {},
            url: url + '&callback=?',
            dataType: 'json',
            success: function (data) {

                var petfinder = data.petfinder.pet;

                console.log(petfinder);

                var infoDiv = $("<div>")
                var name = $("<div>").html("<b>Name: </b>" + petfinder.name['$t']);
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
                var photo = $("<img class='animal-img'>").attr({
                    src: imgAddress,
                    alt: 'pet image',
                    'data-id': petfinder.id['$t']
                });

                // infoDiv.append(animal)
                // infoDiv.append(name)
                // infoDiv.append(age)
                // infoDiv.append(sex)
                // infoDiv.append(size)
                infoDiv.append(photo)
                infoDiv.append(name)
                infoDiv.append("<br><hr><br>")

                // return infoHTML;
                $('#petfinderInfo').append(infoDiv);

            }
        })
    }
}

$("#animal-container").on("click", ".animal-img", function () {
    debugger;
    var animalID = ($(this).data('id'));

    alert(animalID)
})

/*
- on page load find 1 animal of each type available
    - declare and assign default zip
        - this will have the option of being overwritten by google maps
- pass each api return object to homepage.html div
- assign animal id as data attribute for animal pic click function
*/