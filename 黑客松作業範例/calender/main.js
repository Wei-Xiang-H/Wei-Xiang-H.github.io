const title = document.querySelector(".date-title");
const lastMonthBtn = document.querySelector(".last-month-btn");
const nextMonthBtn = document.querySelector(".next-month-btn");
const todayBtn = document.querySelector(".today-btn");
const dateInput = document.querySelector("#date_input");
const todoInput = document.querySelector("#todo_item_input");
const createModal = bootstrap.Modal.getOrCreateInstance("#create_todo_modal");
const updateModal = bootstrap.Modal.getOrCreateInstance("#update_todo_modal");
const updateDateInput = document.querySelector("#date_update_input");
const updateTodoInput = document.querySelector("#todo_item_update_input");
const deleteTodoBtn = document.querySelector(".delete-btn");
const updateTodoBtn = document.querySelector(".update-btn");




const today = new Date();
let currentYear;
let currentMonth; //從1開始 1~12

const localStorageKey = "my-todo";
let todoItemObj = {};

todayBtn.addEventListener("click", () => {
    initCalendar();
});

lastMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 1) {
        currentYear--;
        currentMonth = 12;
    }
    showTitle(currentYear, currentMonth);
    renderingCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 12) {
        currentYear++;
        currentMonth = 1;
    }
    showTitle(currentYear, currentMonth);
    renderingCalendar();
});

document.querySelector("#create_todo_modal").addEventListener("hidden.bs.modal",()=>{
    dateInput.value = getDateStr(today);
    todoInput.value = ''
});

function renderingCalendar() {
    // //月份是從0開始算  0=>1月  日期從1開始 0代表前一個月最後一天
    // const firstDateOfCurrentMonth = new Date(currentYear, currentMonth - 1, 1);
    // const lastDateOfCurrentMonth = new Date(currentYear, currentMonth - 1 + 1, 0);
    // /* 日曆的第一格與當月1號的關係(0-6代表1號星期幾,1為1號):
    //       日一二三四五六       第一格算法(第一天數字-第一天星期的數字)
    //       1,2,3,4,5,6,7       --- >(1-0)
    //       0,1,2,3,4,5,6       --- >(1-1)
    //       -1,0,1,2,3,4,5      --->(1-2)
    //       -2,-1,0,1,2,3,4     --- >(1-3)
    //       -3,-2,-1,0,1,2,3    --- >(1-4)
    //       -4,-3,-2,-1,0,1,2   --- >(1-5)
    //       -5,-4,-3,-2,-1,0,1  --- >(1-6)
    //   */
    // /*日曆上顯示的最後一格與當月最後一天的關係(假設30號為最後一天f代表30號)
    //     日一二三四五六      最後一格算法(最後一天數字+(6-最後一天星期的數字))
    //     f,1,2,3,4,5,6       --- >(30+(6-0))
    //     , f,1,2,3,4,5       --- >(30+(6-1))
    //     , ,f,1,2,3,4        --- >(30+(6-2))
    //     ......
    //     , , , , ,f,1        --- >(30+(6-5))
    //     , , , , , ,f        --- >(30+(6-6))
    // */
    // //getDay()取得星期
    // let start = 1 - firstDateOfCurrentMonth.getDay();
    // //getDate()取得日期
    // const end =
    //     lastDateOfCurrentMonth.getDate() + (6 - lastDateOfCurrentMonth.getDay());
    // const dateArea = document.querySelector(".date-area");
    // dateArea.innerHTML = "";

    // for (start; start <= end; start++) {
    //     const curr = new Date(currentYear, currentMonth - 1, start);
    //     //生成<div class="border col"><span class="d-inline-block text-center w-100"></span></div>
    //     const dateDom = document.createElement("div");
    //     dateDom.classList.add("border", "col");

    //     const dateEl = document.createElement("span");
    //     dateEl.classList.add("d-inline-block", "w-100", "text-center");
    //     dateEl.textContent = curr.getDate();
    //     //今天的日期格子增加藍色
    //     if (
    //         curr.getFullYear() === today.getFullYear() &&
    //         curr.getMonth() === today.getMonth() &&
    //         curr.getDate() === today.getDate()
    //     ) {
    //         dateEl.classList.add("badge", "rounded-pill", "text-bg-primary");
    //     }
    //     dateDom.append(dateEl);

    //     //加入待辦事項
    //     const dateStr = getDateStr(curr);

    //     const currDateStr = dateStr;
    //     // todoItemObj = {
    //     //   "2024-01-01": ["todo1", "todo2"],
    //     //   "2023-12-31": ["跨年", "熬夜"],
    //     // };
    //     const currTodoItems = todoItemObj[currDateStr];
    //     if (currTodoItems) {
    //         const ul = document.createElement("ul");
    //         currTodoItems.forEach((todo, idx) => {
    //             const li = document.createElement("li");
    //             li.textContent = todo;

    //             //新增編輯待辦事項的click
    //             li.addEventListener("click",(e)=>{
    //                 updateDateInput.value = dateStr
    //                 updateTodoInput.value = todo;
    //                 updateModal.show();
    //                 //註冊更新及刪除事件
    //                 //不用addEventListener是因為會重複註冊click，點開很多次編輯的話，只要有點過的都會一起被刪除
    //                 deleteTodoBtn.onclick = ()=>{
    //                     deleteTodo(dateStr,idx);
    //                 };
    //                 updateTodoBtn.onclick = ()=>{
    //                     updateTodo(dateStr,idx,updateTodoInput.value.trim());
    //                 }
    //                 e.stopPropagation();
    //             });
    //             ul.append(li);
    //         });
    //         dateDom.append(ul);
    //     }
    //     //DateDom 註冊click 打開新增代辦事項  日期為那個格子的日期
    //     dateDom.addEventListener("click",()=>{
    //         dateInput.value = dateStr;
    //         createModal.show();
    //     })
    //     dateArea.append(dateDom);
    // }
    const firstDateOfCurrentMonth = new Date(currentYear, currentMonth -1 , 1);
    const lastDateOfCurrentMonth = new Date(currentYear, currentMonth -1 + 1, 0)
    let start = 1 - firstDateOfCurrentMonth.getDay();
    let end = lastDateOfCurrentMonth.getDate() + (6 - lastDateOfCurrentMonth.getDay());

    const dateArea = document.querySelector(".date-area");
    dateArea.innerHTML = "";
    for(start; start <= end ; start++) {
        const curr = new Date(currentYear, currentMonth - 1, start);
        const dateDom = document.createElement("div");
        dateDom.classList.add("border", "col");

        const dateEl = document.createElement("span");
        dateEl.classList.add("d-inline-block", "w-100", "text-center");
        dateEl.textContent = curr.getDate();

        if(start <= 0 || start > lastDateOfCurrentMonth.getDate()) {
            dateEl.classList.add("text-secondary");
            dateEl.textContent = ""
            dateDom.classList.remove("border")
        };
        
        if (curr.getFullYear() === today.getFullYear() && curr.getMonth() === today.getMonth() && curr.getDate() === today.getDate()) {
            dateEl.classList.add("badge", "rounded-pill", "text-bg-secondary");
        };

        dateDom.append(dateEl);

        // To-do List
        const currDateStr = getDateStr(curr);
        const currTodoItems = todoItemObj[currDateStr];
        if (currTodoItems) {
            const ul = document.createElement("ul");
            currTodoItems.forEach((todo, idx) => {
                const li = document.createElement("li");
                li.textContent = todo;

                li.addEventListener("click", (e) => {
                    e.stopPropagation();
                    updateDateInput.value = currDateStr;
                    updateTodoInput.value = todo;
                    updateModal.show();

                    deleteTodoBtn.onclick = () => {
                        deleteTodo(currDateStr, idx);
                    };

                    updateTodoBtn.onclick = () => {
                        updateTodo(currDateStr, idx, updateTodoInput.value.trim());
                    };
                });
                ul.append(li);
            });
            dateDom.append(ul);
        }

        dateDom.addEventListener("click", () => {
            dateInput.value = currDateStr;
            createModal.show();
        });
        dateArea.append(dateDom);
    };
}

function deleteTodo(dateStr,idx){
    const todoItemOfDate = todoItemObj[dateStr];
    if(!todoItemOfDate){
        return;
    }
    todoItemOfDate.splice(idx,1);
    resetStorage();
    updateModal.hide();
    renderingCalendar();
}

function updateTodo(dateStr,idx,content){
    const todoItemsOfDate = todoItemObj[dateStr];
    todoItemsOfDate[idx] = content;
    resetStorage();
    updateModal.hide();
    renderingCalendar();
}

function getDateStr(date) {
    // return '2024-01-09'
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

function resetStorage(){
    //將物件轉為字串存在localStorage
    let jsonStr = JSON.stringify(todoItemObj);
    localStorage.setItem(localStorageKey, jsonStr);
}

function initCalendar() {
    currentYear = today.getFullYear();
    currentMonth = today.getMonth() + 1;
    showTitle(currentYear, currentMonth);
    getTodoFromStorage();
    renderingCalendar();

    dateInput.value = getDateStr(today); 
}

function showTitle(year, month) {
    //padStart 第一個參數最高幾位數  如果數字位數不夠用第二個參數補齊
    title.textContent = `${year} / ${month.toString().padStart(2, 0)}`;
}

//儲存代辦事項到localStorage
function setTodoToStorage(dateStr, content) {
    //用Array.isArray判斷是否是陣列  不是的話就建立以dateStr為key的空陣列
    if (!Array.isArray(todoItemObj[dateStr])) {
        todoItemObj[dateStr] = [];
    }
    //將content作為value加到對應的key(dateStr)
    todoItemObj[dateStr].push(content);
    //物件長相
    // const obj = {
    //   "2024-01-01": ["todo1", "todo2"],
    //   "2023-12-31": ["跨年", "熬夜"],
    // };
    // let myObjKey = "2024-01-01"
    // obj[myObjKey]
    // let jsonStr = JSON.stringify(todoItemObj);
    // localStorage.setItem(localStorageKey, jsonStr);
    resetStorage();
}
//將儲存在localStorage的代辦事項拿出來
function getTodoFromStorage() {
    const todoObj = JSON.parse(localStorage.getItem(localStorageKey));
    //判斷todoObj是否存在(即不為null或undefined)
    if (todoObj) {
        todoItemObj = todoObj;
    }
}

function createTodo(){
    //日期,事項  
    const dateString = dateInput.value;
    const todoContent = todoInput.value.trim();
    if(todoContent === ""){
        return;
    }
    //存進去
    setTodoToStorage(dateString,todoContent);
    createModal.hide();
    renderingCalendar();
}
initCalendar();