const lastMonthBtn = document.querySelectorAll(".last-month-btn");
const nextMonthBtn = document.querySelectorAll(".next-month-btn");

//顯示今天日期
//const dateInput = document.querySelector("#date_input");
// dateInput.value = getDateStr(today);

const today = new Date();
let currentYear;
let currentMonth; //從1開始 1~12
let nextYear;
let nextMonth;

window.onload = function(){
    initCalendar();
}
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
            dateEl.classList.remove("date")
        };

        if (curr.getTime() < today.getTime()) {
            dateEl.classList.add("text-decoration-line-through","opacity-50");
            dateEl.classList.remove("dateHover")
        };

        dateDom.append(dateEl);
        dateArea.append(dateDom.cloneNode(true));
        
    }
}

function getDateStr(date) {
    // return '2024-01-09'
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}


function initCalendar() {
    currentYear = today.getFullYear();
    currentMonth = today.getMonth() + 1;
    nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    showTitle(currentYear, currentMonth, ".date-title");
    renderingCalendar(currentYear, currentMonth, ".date-area1");
    showTitle(nextYear, nextMonth, ".date-title2");
    renderingCalendar(nextYear, nextMonth, ".date-area2");
}

function showTitle(year, month,titleSelector) {
    const title = document.querySelector(titleSelector);
    title.textContent = `${year} / ${month.toString().padStart(2, 0)}`;
}
