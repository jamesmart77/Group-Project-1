var image = "";

$(".carousel-inner").on("click", ".pet-carousel-img", function(event) {
    event.preventDefault();

    image = $(this).attr("data-id");
    // alert(image);
    database.ref().push({
        image: image

    })

})