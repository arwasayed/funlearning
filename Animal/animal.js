function playSound1(soundFile) {
    var audio = new Audio(soundFile);
    audio.play();
}


var menuIcon = document.getElementById("menu-icon");
var sidebar = document.getElementById("sidebar");
var overlay = document.querySelector(".overlay");

menuIcon.addEventListener('click', function () {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Close sidebar when overlay is clicked
overlay.addEventListener('click', function () {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Close sidebar when a link is clicked
var sidebarLinks = document.querySelectorAll('aside nav ul li a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});
function startLesson() {
    // Hide the intro section
    const introSection = document.querySelector('.intro');
    introSection.classList.add('hidden');

    // Show the section with class "hidden" that contains .fruit-container-info
    const fruitInfoSection = document.querySelector('.hidden .animal-container-info').closest('section');
    if (fruitInfoSection) {
        fruitInfoSection.classList.remove('hidden');
    }
}
function startPlay() {
    // Hide the intro section
    const gameSection = document.querySelector('.lesson');
    gameSection.classList.add('hidden');

    // Hide the intro section
    const introSection = document.querySelector('.intro');
    introSection.classList.add('hidden');

    // Show the section with class "hidden" that contains .fruit-container-info
    const fruitgameSection = document.querySelector('.hidden .game').closest('section');
    if (fruitgameSection) {
        fruitgameSection.classList.remove('hidden');
    }
}

document.getElementById('startPlayBtn').addEventListener('click', function () {
    window.location.href = 'index.html';
});

