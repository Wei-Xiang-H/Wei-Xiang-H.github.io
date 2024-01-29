const inputText = document.querySelector("#input");
const localStorageKey = "todoArrKey";
let todoArr = [];

window.onload = function () {
    init();
}

//todoArr
// let todoArr = [
//     {"todo":"睡覺","complete":false,"id":1},
//     {"todo":"上課","complete":false,"id":2},
// ];

//建立最外層container
let containerDiv = document.createElement("div");
containerDiv.classList.add("container");
document.body.append(containerDiv);

//創建畫面時有obj參數  按鈕事件也創建好  所以可以直接obj抓到該物件
//建立todo畫面
function createDiv(obj) {

    //建立外框div
    let borderDiv = document.createElement("div");
    borderDiv.classList.add("border", "m-auto", "w700", "px-3", "mb-1")

    //建立input-group
    let inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group", "my-3", "m-auto");
    inputGroup.id = obj.id;

    //建立input-checkbox
    let inputCheckbox = document.createElement("div");
    inputCheckbox.classList.add("input-group-text");


    //建立input
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("form-control");
    input.setAttribute("aria-label", "Text input with radio button");
    input.disabled = true;
    input.value = obj.todo;

    //建立checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = obj.complete;
    checkbox.setAttribute("aria-label", "Radio button for following text input");
    textDecoration(checkbox, input);
    checkbox.addEventListener("click", () => {
        checkboxStatus(checkbox, obj);
        textDecoration(checkbox, input);
    });



    //建立button編輯
    let btnEdit = document.createElement("button");
    btnEdit.classList.add("btn", "btn-warning", "mx-1", "rounded");
    btnEdit.type = "button";
    btnEdit.innerText = "編輯";
    btnEdit.addEventListener("click", () => {
        input.disabled = false;
        btnEdit.classList.add("d-none");
        btnSave.classList.remove("d-none");
    });

    //建立button保存  (進方法前就排除空值)
    let btnSave = document.createElement("button");
    btnSave.classList.add("btn", "btn-success", "mx-1", "rounded", "d-none");
    btnSave.type = "button";
    btnSave.innerText = "保存";
    btnSave.addEventListener("click", () => {
        //沒輸入內容無法保存
        if (input.value.trim() !== "") {
            saveButton(input, obj);
            input.disabled = true;
            btnEdit.classList.remove("d-none");
            btnSave.classList.add("d-none");
        }
    });

    //建立button刪除
    let btnDel = document.createElement("button");
    btnDel.classList.add("btn", "btn-danger", "mx-1", "rounded");
    btnDel.type = "button";
    btnDel.innerText = "刪除";
    btnDel.addEventListener("click", () => {
        deleteButton(borderDiv, obj)
    })

    //append
    inputCheckbox.append(checkbox);
    inputGroup.append(inputCheckbox, input, btnEdit, btnSave, btnDel);
    borderDiv.append(inputGroup);
    containerDiv.append(borderDiv);
}

//初始化
function init() {
    let localStorageData = localStorage.getItem(localStorageKey);
    if (localStorageData) {
        todoArr = JSON.parse(localStorageData);
    };
    //先清空畫面
    const container = document.querySelector(".container");
    if (container) {
        container.innerHTML = "";
    }
    //依照舊有的localstorage資料 重新建立畫面
    todoArr.forEach(obj => {
        createDiv(obj);
        resetStorage();
    })
}

//AddButton添加事件
let btnAdd = document.querySelector("#addButton");
btnAdd.addEventListener("click", addInput);

//AddButton事件
function addInput() {
    if (inputText.value.trim() !== "") {
        const todoArrLength = todoArr.length
        let obj = {
            "todo": inputText.value,
            "complete": false,
            //如果todoArr中有物件,就將obj的id改成最後一個物件的id+1
            "id": todoArrLength !== 0 ? todoArr[todoArrLength - 1].id + 1 : 0,
        };


        todoArr.push(obj);
        inputText.value = "";
        resetStorage();
        createDiv(obj);
    } else {
        alert("請確認輸入內容");
    }
}

//checkbox事件
function checkboxStatus(checkbox, obj) {
    obj.complete = checkbox.checked;
    resetStorage();
}
//text裝飾事件
function textDecoration(checkbox, input) {
    if (checkbox.checked) {
        input.classList.add("text-decoration-line-through");
    } else {
        input.classList.remove("text-decoration-line-through");
    }
}

//saveButton事件
function saveButton(input, obj) {
    obj.todo = input.value;
    resetStorage();
}

//deleteButton事件
function deleteButton(borderDiv, obj) {
    let index = todoArr.indexOf(obj);
    if (index !== -1) {
        todoArr.splice(index, 1);
        borderDiv.remove();
        resetStorage();
    }
}

//將資料存進localStorage
function resetStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(todoArr));
}


