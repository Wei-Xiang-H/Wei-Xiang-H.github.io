$("#deviceModalOpen").click(function(){
    $("#deviceModal").toggle();
    $("#overlay").toggle();
    $("body").addClass('modalOpen');
})

$("#deviceModalClose").click(function(){
    $("#deviceModal").toggle();
    $("#overlay").toggle();
    $("body").removeClass('modalOpen');
})

$(".productImgGroup").click(function(){
    $("#imgCarousel").toggle();
    $("#overlay").toggle();
    $("body").addClass('modalOpen');
})

$("#carouselClose").click(function(){
    $("#imgCarousel").toggle();
    $("#overlay").toggle();
    $("body").removeClass('modalOpen');
})
