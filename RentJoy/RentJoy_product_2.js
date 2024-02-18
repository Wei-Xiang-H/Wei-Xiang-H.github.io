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
    $(".reservedCalender").css("display", "flex");
})

$('#footerSelectDate').click(function () {
    $(".footerReservedCalender").css("display", "flex");
})

$(document).on('click', function (event) {
    if (!$(event.target).is('#selectDate') && (!$(event.target).closest('.reservedCalender').length || $(event.target).is('.dateHover'))) {
        $('.reservedCalender').hide();
    }
})

$(document).on('click', function (event) {
    if (!$(event.target).is('#footerSelectDate') && (!$(event.target).closest('.footerReservedCalender').length || $(event.target).is('.dateHover'))) {
        $('.footerReservedCalender ').hide();
    }
})
