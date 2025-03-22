var menuIcon = document.getElementById("menu-icon");
var sidebar = document.getElementById("sidebar");
var overlay = document.querySelector(".overlay");

menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
});
// Close sidebar when overlay is clicked
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Close sidebar when a link is clicked
var sidebarLinks = document.querySelectorAll('aside nav ul li a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});


function startLesson() {
    const introSection = document.querySelector('.intro');
    introSection.classList.add('hidden');

    const fruitInfoSection = document.querySelector('.hidden .fruit-container-info').closest('section');
    if (fruitInfoSection) {
        fruitInfoSection.classList.remove('hidden');
    }
}

function startPlay() {
    const introSection = document.querySelector('.intro');
    introSection.classList.add('hidden');

    const lessonSection = document.querySelector('.lesson');
    lessonSection.classList.add('hidden');

    const gameSection = document.querySelector('.game-container');
    gameSection.classList.remove('hidden');
    gameSection.classList.add('show');
}

document.addEventListener("DOMContentLoaded", () => {
    const words = document.querySelectorAll(".word");
    const dropZones = document.querySelectorAll(".drop-zone");
    let score = 0;

    words.forEach(word => {
        word.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", e.target.id);
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            const droppedWordId = e.dataTransfer.getData("text");
            const droppedWord = document.getElementById(droppedWordId);

            if (e.target.dataset.name.toLowerCase() === droppedWord.innerText.toLowerCase()) {
                e.target.classList.add("correct");
                e.target.classList.remove("wrong");
                score++;
                droppedWord.setAttribute("draggable", "false");
                droppedWord.style.opacity = "0.5";
                playSound1('correct');
            } else {
                playSound('wrong');
                e.target.classList.add("wrong");
                e.target.classList.remove("correct");
                playSound1('wrong');
            }
            document.getElementById("score").textContent = `Score: ${score}`;
            if (score === dropZones.length) {
                document.getElementById("score").textContent = `Congratulations! Total Score: ${score}`;
                document.getElementById("retryButton").style.display = "block";
            }
        });
    });

    document.getElementById("retryButton").addEventListener("click", () => {
        document.getElementById("score").textContent = "Score: 0";
        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach((zone) => {
            zone.classList.remove('correct', 'wrong');
        });

        const words = document.querySelectorAll('.word');
        words.forEach((word) => {
            word.style.position = "initial";
            word.style.left = "auto";
            word.style.top = "auto";

            word.classList.remove('inactive');
            word.classList.add('active');
            word.style.opacity = "1";
            word.style.pointerEvents = "auto";
        });
        enableDrag();
        document.getElementById("retryButton").style.display = "inline-block";
        resetGameState();
        score = 0;
    });

    function enableDrag() {
        const words = document.querySelectorAll('.word');
        words.forEach((word) => {
            word.setAttribute('draggable', true);
            word.addEventListener('dragstart', handleDragStart);
        });
    }

    function resetGameState() {
        score = 0;
    }

    function handleDragStart(e) {
        e.dataTransfer.setData("text", e.target.id);
    }
});


function playSound(soundFile) {
    var audio = new Audio(soundFile);
    audio.play();
}


function playSound1(type) {
    const sounds = {
        correct: new Audio('Sound/correct-6033.mp3'),
        wrong: new Audio('Sound/fail-144746.mp3')
    };
    sounds[type].play();
}
