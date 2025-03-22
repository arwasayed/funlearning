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

// Function to start the lesson
function startLesson() {
    // Hide the intro section
    const introSection = document.querySelector('.intro');
    introSection.classList.add('hidden');

    // Show the lesson section
    const lessonSection = document.querySelector('.lesson');
    lessonSection.classList.remove('hidden');
}
function playAudio(audioId) {
    const audioElement = document.getElementById(audioId);
    if (audioElement) {
        audioElement.play();
    }
}
// Function to start the game
function startPlay() {
    // Hide the intro and lesson sections
    const introSection = document.querySelector('.intro');
    const lessonSection = document.querySelector('.lesson');
    introSection.classList.add('hidden');
    lessonSection.classList.add('hidden');

    // Show the game section
    const gameSection = document.querySelector('.hidden1');
    gameSection.classList.remove('hidden');

    // Initialize the game
    initializeGame();
}

// Function to initialize the game
function initializeGame() {
    const itemImages = document.querySelectorAll(".item-image");
    const background = document.querySelector(".background");
    const countdownElement = document.getElementById("countdown");
    const scoreElement = document.getElementById("score");
    let timeLeft = 60;
    let score = 0;
    const totalItems = itemImages.length;
    const foundItems = new Set(); // Track found items

    // Function to generate random positions for the images
    function getRandomPosition() {
        const backgroundRect = background.getBoundingClientRect();
        const maxX = backgroundRect.width - 200; // Subtract image width (100px)
        const maxY = backgroundRect.height - 200; // Subtract image height (100px)

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        return { x: randomX, y: randomY };
    }

    // Function to position images randomly
    function positionImagesRandomly() {
        itemImages.forEach(image => {
            const { x, y } = getRandomPosition();
            image.style.position = "absolute";
            image.style.left = `${x}px`;
            image.style.top = `${y}px`;
        });
    }

    // Function to format the time as MM:SS
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    var scoreSound = document.getElementById("scoreSound");
    var timerEndSound = document.getElementById("timerEndSound");

    // Function to update the timer
    function updateTimer() {
        countdownElement.textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerEndSound.play();
            alert("Time's up! Game over.");
        }
        timeLeft--;
    }

    // Start the timer
    let timerInterval = setInterval(updateTimer, 1000);



    // Position images randomly at the start of the game
    positionImagesRandomly();

    // Add click event listeners to the images
    itemImages.forEach(image => {
        image.addEventListener("click", function () {
            const itemId = image.id;
            const listItem = document.getElementById(itemId);

            // Check if the item has already been found
            if (listItem && !foundItems.has(itemId)) {
                foundItems.add(itemId);
                listItem.classList.add("line-through");
                score++;
                scoreElement.textContent = `${score}/${totalItems}`;

                // Check if all items have been found
                if (score === totalItems) {
                    scoreSound.play();
                    clearInterval(timerInterval);
                    alert("Congratulations! You found all the items!");
                }
            }
        });
    });
}

// Add event listeners to buttons
document.getElementById("startLessonBtn").addEventListener("click", startLesson);
document.getElementById("startPlayBtn").addEventListener("click", startPlay);