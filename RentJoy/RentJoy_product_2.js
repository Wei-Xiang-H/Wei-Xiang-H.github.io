$("#deviceModalOpen").click(function () {
    $("#deviceModal").toggle();
    $("#overlay").toggle();
    $("body").addClass('modalOpen');
})

$("#deviceModalClose").click(function () {
    $("#deviceModal").toggle();
    $("#overlay").toggle();
    $("body").removeClass('modalOpen');
})

$(".productImgGroup").click(function () {
    $("#imgCarousel").toggle();
    $("#overlay").toggle();
    $("body").addClass('modalOpen');
})

$("#carouselClose").click(function () {
    $("#imgCarousel").toggle();
    $("#overlay").toggle();
    $("body").removeClass('modalOpen');
})

$('#selectDate').click(function () {
    $(".reservedCelender").css("display", "flex");
})


$(document).on('click', function (event) {
    if (!$(event.target).is('#selectDate') && (!$(event.target).closest('.reservedCelender').length || $(event.target).is('.dateHover'))) {
        $('.reservedCelender').hide();
    }
})
