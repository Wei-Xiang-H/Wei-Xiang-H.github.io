const lastMonthBtn = document.querySelectorAll(".last-month-btn");
const reservedLastMonthBtn = document.querySelector("#lBtn3");
const footerReservedLastMonthBtn = document.querySelector("#lBtn4");
const nextMonthBtn = document.querySelectorAll(".next-month-btn");
const reservedNextMonthBtn = document.querySelector("#rBtn3");
const footerReservedNextMonthBtn = document.querySelector("#rBtn4");
const dateInput = document.querySelector("#selectDate");



const today = new Date();
let currentYear;
let currentMonth; //從1開始 1~12
let nextYear;
let nextMonth;



window.onload = function(){
    initCalendar();
}



//lastMonthBtn事件區
lastMonthBtn.forEach(mon => {
    mon.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 1) {
            currentYear--;
            currentMonth = 12;
        }
        nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
        nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
        showTitle(currentYear, currentMonth,".date-title");
        renderingCalendar(currentYear, currentMonth, ".date-area1");
        showTitle(nextYear, nextMonth, ".date-title2");
        renderingCalendar(nextYear, nextMonth, ".date-area2");
    })
});

reservedLastMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 1) {
        currentYear--;
        currentMonth = 12;
    }
    showTitle(currentYear, currentMonth,".date-title3");
    renderingCalendar(currentYear, currentMonth, ".date-area3");
})

footerReservedLastMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 1) {
        currentYear--;
        currentMonth = 12;
    }
    showTitle(currentYear, currentMonth,".date-title4");
    renderingCalendar(currentYear, currentMonth, ".date-area4");
})

//nextMonthBtn事件區
nextMonthBtn.forEach(mon=>{
    mon.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 12) {
            currentYear++;
            currentMonth = 1;
        }
        nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
        nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
        showTitle(currentYear, currentMonth,".date-title");
        renderingCalendar(currentYear, currentMonth, ".date-area1");
        showTitle(nextYear, nextMonth, ".date-title2");
        renderingCalendar(nextYear, nextMonth, ".date-area2");
    });
})

reservedNextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 12) {
        currentYear++;
        currentMonth = 1;
    }
    showTitle(currentYear, currentMonth,".date-title3");
    renderingCalendar(currentYear, currentMonth, ".date-area3");
});

footerReservedNextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 12) {
        currentYear++;
        currentMonth = 1;
    }
    showTitle(currentYear, currentMonth,".date-title4");
    renderingCalendar(currentYear, currentMonth, ".date-area4");
});

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

$(".productPrice .timePeriodGroup button").click(function(){
    $(this).toggleClass("btnClick");
    showReservedDetails(this,".productPrice");
})

$(".footerProductPrice .timePeriodGroup button").click(function(){
    $(this).toggleClass("btnClick");
    showReservedDetails(this,".footerProductPrice");
})





//function
function initCalendar() {
    currentYear = today.getFullYear();
    currentMonth = today.getMonth() + 1;
    nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    showTitle(currentYear, currentMonth, ".date-title");
    renderingCalendar(currentYear, currentMonth, ".date-area1");
    showTitle(nextYear, nextMonth, ".date-title2");
    renderingCalendar(nextYear, nextMonth, ".date-area2");
    showTitle(currentYear, currentMonth,".date-title3");
    renderingCalendar(currentYear, currentMonth, ".date-area3");
    showTitle(currentYear, currentMonth,".date-title4");
    renderingCalendar(currentYear, currentMonth, ".date-area4");
    setDateStr(".currDateGroup .dateHover","#selectDate");
    setNextMonDateStr(".nextDateGroup .dateHover","#selectDate");
    setDateStr(".footerReservedCalender .dateHover","#footerSelectDate");
    showSelectTime(".reservedCalender .dateHover",".productPrice");
    showSelectTime(".footerReservedCalender .dateHover",".footerProductPrice");
}


function renderingCalendar(year, month, dateAreaSelector) {
    const firstDateOfCurrentMonth = new Date(year, month  - 1, 1);
    const lastDateOfCurrentMonth = new Date(year, month, 0)
    let start = 1 - firstDateOfCurrentMonth.getDay();
    let end = lastDateOfCurrentMonth.getDate() + (6 - lastDateOfCurrentMonth.getDay());

    const dateArea = document.querySelector(dateAreaSelector);
    dateArea.innerHTML = "";
    for (start; start <= end; start++) {
        const curr = new Date(year, month - 1, start);
        const dateDom = document.createElement("div");
        dateDom.classList.add("col");

        const dateEl = document.createElement("div");
        dateEl.classList.add("h-100", "w-100", "text-center", "date", "rounded","dateHover");
        dateEl.textContent = curr.getDate();

        if (start <= 0 || start > lastDateOfCurrentMonth.getDate()) {
            dateEl.textContent = ""
            dateEl.classList.remove("date","dateHover")
        };

        if (curr.getTime() < today.getTime()) {
            dateEl.classList.add("text-decoration-line-through","opacity-50");
            dateEl.classList.remove("dateHover")
        };
        

        dateDom.append(dateEl);
        dateArea.append(dateDom.cloneNode(true));
    }
}


function setDateStr(targetDate,showDate){
    $(targetDate).click(function(e){
        // console.log("點到了");
        $(showDate).text(`${currentYear} / ${currentMonth.toString().padStart(2, 0)} / ${e.target.textContent.padStart(2, 0)}`);
    })
}

function setNextMonDateStr(targetDate,showDate){
    $(targetDate).click(function(e){
        // console.log("點到了");
        $(showDate).text(`${nextYear} / ${nextMonth.toString().padStart(2, 0)} / ${e.target.textContent.padStart(2, 0)}`);
    })
}

function getDateStr(date) {
    // return '2024-01-09'
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

function showTitle(year, month,titleSelector) {
    const title = document.querySelector(titleSelector);
    title.textContent = `${year} / ${month.toString().padStart(2, 0)}`;
}


function showSelectTime(target,father){
    $(target).click(function(){
        $(`${father} .timePeriodGroup`).toggle();
        $(`${father} .time`).css("display", "flex");
    });
}

function showReservedDetails(target,father){
    if($(target).hasClass("btnClick")){
        $(`${father} .productPriceDetails`).show();
    }
}


