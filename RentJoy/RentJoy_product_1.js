$("#deviceModalOpen").click(function(){
    $("#deviceModal").toggle();
    $("#overlay").toggle();
    $("body").addClass('modal-open');
})

$("#deviceModalClose").click(function(){
    $("#deviceModal").toggle();
    $("#overlay").toggle();
    $("body").removeClass('modal-open');
})

$(".product-img-group").click(function(){
    $("#imgCarousel").toggle();
    $("#overlay").toggle();
    $("body").addClass('modal-open');
})

$("#carouselClose").click(function(){
    $("#imgCarousel").toggle();
    $("#overlay").toggle();
    $("body").removeClass('modal-open');
})
