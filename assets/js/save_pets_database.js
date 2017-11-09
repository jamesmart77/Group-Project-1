var image = "";

$(".carousel-item active").on("click", ".pet-carousel-img", function(event) {
    event.preventDefault();

    image = $("pet-carousel-img");

    database.ref().push({
        image: image

    })

})