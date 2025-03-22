var counter = 0;
var wordLength;
var letterElem;
var flag;
var examPassed = 0;
var undoFlag;
var examCompletedFlag = { 1: false, 2: false, 3: false, 4: false, 5: false };
var exam = 1;

(function () {
    showExam(1);
})()

function showExam(ex) {
    exam = ex;
    document.querySelectorAll(".exam").forEach(exam => { exam.classList.remove("active") })
    document.getElementById(`exam${exam}`).classList.add("active");
    counter = 0;
    flag = true;
    if (exam == 1 || exam == 3) wordLength = 3;
    else if (exam == 2 || exam == 4) wordLength = 5;
    else if (exam == 5) wordLength = 4;
}

function drag(div) {
    letterElem = div;
}

function putLetter(divElem, flag) {
    divElem.appendChild(letterElem);
    if (undoFlag != true) {
        divElem.style.backgroundColor = "#FFFAE6";
        letterElem.style.border = "none";
        var letter = letterElem.getAttribute('id');
        if (divElem.getAttribute('id') != `letter${letter}`) flag = false;
        letterElem.setAttribute('draggable', 'false');
        ++counter;
        if (counter == wordLength) {
            if (flag == true) correctName();
            else wrongName();
        }
    }
}

function drop(divElem) {
    var letter = letterElem.getAttribute('id');
    if (divElem.getAttribute('id') == `letter${letter}`) {
        putLetter(divElem, true);
    } else {
        putLetter(divElem, false);
    }
    divElem.setAttribute('ondrop', '');
}

function play(str) {
    if (str == "correct") document.getElementById("correct").play();
    if (str == "fail") document.getElementById("fail").play();
    if (str == 'bus') {
        var sound = new Audio("resources/pronunciation_en_bus.mp3")
        sound.play();
    } else if (str == 'train') {
        var sound = new Audio("resources/pronunciation_en_train.mp3")
        sound.play();
    } else if (str == 'plane') {
        var sound = new Audio("resources/pronunciation_en_plane.mp3")
        sound.play();
    } else if (str == 'car') {
        var sound = new Audio("resources/pronunciation_en_car.mp3")
        sound.play();
    } else if (str == 'bike') {
        var sound = new Audio("resources/pronunciation_en_bike.mp3")
        sound.play();
    }

}

function correctName() {
    document.querySelectorAll('.exam.active .letter').forEach(letter => { letter.classList.add('correct') });
    document.querySelector('.exam.active .name').classList.add('highlighted');
    play("correct");
    examPassed++;
    examCompletedFlag[exam] = true;
    document.getElementById(`btn${exam}`).style.backgroundColor = "green";
    endExam();
}

function wrongName() {
    document.querySelectorAll('.exam.active .letter').forEach(letter => { letter.classList.add('correct') });
    document.querySelector('.exam.active .name').classList.add('wrongHighlighted');
    examPassed++;
    examCompletedFlag[exam] = true;
    play("fail");
    document.getElementById(`btn${exam}`).style.backgroundColor = "red";
    endExam();
}

function endExam() {
    if (examPassed == 5) {
        setTimeout(function () {
            var sound = new Audio("resources/happy-ending-94451.mp3");
            sound.play();
        }, 2000);
        document.getElementById("message").style.display = "block";

    }
}

function undo() {
    if (examCompletedFlag[exam] == true) return;
    else {
        undoFlag = true;
        var lettersDiv = document.getElementById(`letters${exam}`);
        
        document.querySelectorAll('.exam.active .Alpha').forEach(letter => {
            letter.setAttribute('draggable', 'true');
            letter.style.border = "inset";
            var originalContainer = lettersDiv.querySelector(`#${letter.id}`);            
            if (originalContainer) {
                originalContainer.appendChild(letter);
            }
        });
        
        document.querySelectorAll('.exam.active .letter').forEach(letterArea => {
            letterArea.innerHTML = "";
            letterArea.style.backgroundColor = "rgba(193, 192, 192, 0.5)";
            letterArea.setAttribute('ondrop', 'drop(this)');
            letterArea.setAttribute('ondragover', 'event.preventDefault();');
        });
        counter = 0;
        flag = true;
        undoFlag = false;
    }
}

var menuIcon = document.getElementById("menu-icon");
var sidebar = document.getElementById("sidebar");
var overlay = document.querySelector(".overlay");

// Toggle sidebar visibility and overlay
menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
});