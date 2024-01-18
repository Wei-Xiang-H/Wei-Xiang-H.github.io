const startBtn = document.querySelector("#start_btn");
const showAnsBtn = document.querySelector("#show_answer_btn");
const gameMsgToast = document.querySelector("#game_msg_toast");
const toastBootstrap = new bootstrap.Toast(gameMsgToast, { delay: 1000 });
const guessInput = document.querySelector("#guess_input");
const guessBtn = document.querySelector("#guess_btn");
const guessHistoryList = document.querySelector("#guess_history_list");
const endGameModal = document.querySelector("#end_game_modal");
const modalBootstrap = new bootstrap.Modal(endGameModal);
const restartBtn = document.querySelector("#restart_btn");
const endGameBtn = document.querySelector("#end_game_modal");
let answer;

guessBtn.addEventListener("click", () => {
    const val = guessInput.value.trim();
    if (!isValidNumber(val)) {
        showHint("請檢查輸入的內容")
        return;
    }
    let a = 0, b = 0;
    for (let i = 0; i < answer.length; i++) {
        if (val[i] === answer[i]) {
            a++;
        } else if (answer.includes(val[i])) {
            b++;
        }
    }
    if (a === 4) {
        modalBootstrap.show()
    }
    guessInput.value = "";
    appendHistory(a, b, val);
});

startBtn.addEventListener("click", initGame);

showAnsBtn.addEventListener("click", function () {
    showHint(`答案是${answer}`);
})

restartBtn.addEventListener("click",()=>{
    initGame();
})

endGameBtn.addEventListener("click",()=>{
    modalBootstrap.hide();
    initGame();
})

function initGame() {
    answer = generateAns();
    guessHistoryList.innerHTML="";
}

//產4個不重複的數字 用array
function generateAns() {
    const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    numArr.sort(() => getRandomArbitrary(-1, 1));
    return numArr.slice(0, 4).join(''); //string
    //return numArr.slice(0,4);  //array
}

function isValidNumber(input) {
    // 定義正則表達式
    const regex = /^(?!.*(\d).*\1)[0-9]{4}$/;
    // 使用正則表達式檢查輸入
    return regex.test(input);
}

//亂數方法
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function showHint(msg = '') {
    gameMsgToast.querySelector('.toast-body').textContent = msg;
    //另一種Bootstrap提供的方法
    // const toastBootstrap = bootstrap.Toast.getOrCreateInstance(gameMsgToast);

    toastBootstrap.show();
}

function appendHistory(a = 0, b = 0, guessNum = '1234') {
    //guessHistoryList
    // <li class="list-group-item">
    //          <span class="badge bg-danger">0A0B</span> 1234
    //         </li>
    const colorClass = a === 4 ? "bg-success" : "bg-danger";

    guessHistoryList.innerHTML += `<li class="list-group-item">
    <span class="badge ${colorClass}">${a}A${b}B</span>${guessNum}
    </li>`
}