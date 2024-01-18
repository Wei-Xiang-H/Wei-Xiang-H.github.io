const inputText = document.querySelector("#input");
const localStorageKey = "todoArrKey";
let todoArr = [];
let idNum = 0;

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

//建立todo畫面
function createDiv(obj) {
    //初始化
    // const container = document.querySelector(".container");
    // if (container) {
    //     container.innerHTML = "";
    // }

    //依照todoArr建立畫面
    // for (let index = 0; index < todoArr.length; index++) {
    //     const todoItem = todoArr[index].todo;}


    //建立外框div
    let borderDiv = document.createElement("div");
    borderDiv.classList.add("border", "m-auto", "w700", "px-3", "mb-1")

    //建立input-group
    let inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group", "my-3", "m-auto");
    inputGroup.id = idNum;

    //建立input-checkbox
    let inputCheckbox = document.createElement("div");
    inputCheckbox.classList.add("input-group-text");

    //建立checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = "";
    checkbox.checked = todoArr.complete;
    checkbox.setAttribute("aria-label", "Radio button for following text input");
    checkbox.addEventListener("click", (e) => {
        checkboxStatus(e);
        if (checkbox.checked) {
            input.classList.add("text-decoration-line-through");
        } else {
            input.classList.remove("text-decoration-line-through");
        }
    });

    //建立input
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("form-control");
    input.setAttribute("aria-label", "Text input with radio button");
    input.disabled = true;
    input.value = obj.todo;

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

    //建立button保存
    let btnSave = document.createElement("button");
    btnSave.classList.add("btn", "btn-success", "mx-1", "rounded", "d-none");
    btnSave.type = "button";
    btnSave.innerText = "保存";
    btnSave.addEventListener("click", (e) => {
        //沒輸入內容無法保存
        if(saveButton(e)){
            input.disabled = true;
            btnEdit.classList.remove("d-none");
            btnSave.classList.add("d-none");
            console.log("改變成功");
        }
        
    });

    //建立button刪除
    let btnDel = document.createElement("button");
    btnDel.classList.add("btn", "btn-danger", "mx-1", "rounded");
    btnDel.type = "button";
    btnDel.innerText = "刪除";
    btnDel.addEventListener("click", (e) => {
        deleteButton(e)
    })

    //append
    inputCheckbox.append(checkbox);
    inputGroup.append(inputCheckbox, input, btnEdit, btnSave, btnDel);
    borderDiv.append(inputGroup);
    containerDiv.append(borderDiv);

    //畫面產生再+1
    idNum++;
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
    //更改localstorage舊的id  讓他跟新建畫面的id相同
    todoArr.forEach(obj => {
        createDiv(obj);
        //方法跑完idNum會+1  所以-1才會相同
        obj.id = idNum - 1;
        resetStorage();
    })
}

//AddButton添加事件
let btnAdd = document.querySelector("#addButton");
btnAdd.addEventListener("click", addInput);

//AddButton事件
function addInput() {
    if (inputText.value.trim() !== "") {
        let obj = {
            "todo": inputText.value,
            "complete": false,
            "id": idNum,
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
function checkboxStatus(e) {
    let todoDataID = e.target.parentNode.parentNode.id;
    todoArr.forEach(item => {
        if (todoDataID == item.id) {
            item.complete = e.target.checked;
        }
    });
    resetStorage();
}

//saveButton事件
function saveButton(e) {
    let todoDataID = e.target.parentNode.id;
    let editText = e.target.parentNode.querySelector(".form-control");
    //成功抓到才返回true
    let bool =todoArr.find(item => {
        if (todoDataID == item.id && editText.value.trim() !== "") {
            item.todo = editText.value;
            console.log(true);
            resetStorage();
            return true;
        }
    })
    return bool;
}

//deleteButton事件
function deleteButton(e) {
    let todoDataID = e.target.parentNode.id;
    todoArr.forEach((item, idx) => {
        if (todoDataID == item.id) {
            todoArr.splice(idx, 1);
            let delDiv = e.target.parentNode.parentNode;
            delDiv.remove();
        }
    });
    resetStorage();
}

//將資料存進localStorage
function resetStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(todoArr));
}


