// DOM Elements
const menuIcon = document.getElementById("menu-icon");
const sidebar = document.getElementById("sidebar");
const overlay = document.querySelector(".overlay");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const dotsContainer = document.getElementById("dots-container");

// Resources Object
const resources = {
    images: {
        apple: "apple.jpg",
        banana: "banana.jpg",
        grapes: "grapes.jpg",
        mango: "mango.jpg",
        orange: "orange.jpg",
        pineapple: "pineapple.jpg",
        strawberry: "strawberry.jpg",
        watermelon: "watermelon.jpg",
        success: "congratualtion.jpg", // Success image
        failure: "fail.png", // Failure image
    },
    sounds: {
        success: "correct.mp3", // Success sound
        failure: "cartoon-fail-trumpet.mp3", // Failure sound
    },
};

// Quiz Variables
const imagesArray = [
    { id: 1, name: 'apple', src: resources.images.apple },
    { id: 2, name: 'banana', src: resources.images.banana },
    { id: 3, name: 'grapes', src: resources.images.grapes },
    { id: 4, name: 'mango', src: resources.images.mango },
    { id: 5, name: 'orange', src: resources.images.orange },
    { id: 6, name: 'pineapple', src: resources.images.pineapple },
    { id: 7, name: 'strawberry', src: resources.images.strawberry },
    { id: 8, name: 'watermelon', src: resources.images.watermelon },
];

let score = 0;
let remainingImages = [...imagesArray];
let timer;
let timeLeft = 20;
const totalQuestions = imagesArray.length;
let currentQuestionIndex = 0;

// Toggle sidebar and overlay
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
    document.querySelector('.intro').classList.add('hidden');
    const fruitInfoSection = document.querySelector('.hidden .fruit-container-info').closest('section');
    if (fruitInfoSection) fruitInfoSection.classList.remove('hidden');
}

// Function to start the quiz
function startQuiz() {
    remainingImages = [...imagesArray];
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('score').textContent = score;
    initializeDots();
    displayQuiz();
    startTimer();
}

// Function to start the play
function startPlay() {
    document.querySelector('.lesson').classList.add('hidden');
    document.querySelector('.intro').classList.add('hidden');
    const quizSection = document.querySelector('.hidden1');
    if (quizSection) quizSection.classList.remove('hidden');
    startQuiz();
}

// Function to get a random image from the array
function getRandomImage() {
    if (remainingImages.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * remainingImages.length);
    return remainingImages.splice(randomIndex, 1)[0];
}

// Function to get 3 random incorrect options
function getRandomOptions(correctOption) {
    const options = [];
    while (options.length < 3) {
        const randomOption = imagesArray[Math.floor(Math.random() * imagesArray.length)].name;
        if (randomOption !== correctOption && !options.includes(randomOption)) options.push(randomOption);
    }
    return options;
}

// Function to display the quiz
function displayQuiz() {
    if (remainingImages.length === 0) {
        endQuiz();
        return;
    }

    const randomImage = getRandomImage();
    if (!randomImage) {
        endQuiz();
        return;
    }

    const correctOption = randomImage.name;
    const incorrectOptions = getRandomOptions(correctOption);
    const allOptions = [correctOption, ...incorrectOptions].sort(() => Math.random() - 0.5);

    const imageElement = document.getElementById('image');
    imageElement.src = randomImage.src;
    imageElement.alt = randomImage.name;

    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';
    allOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => handleAnswer(option, correctOption));
        optionsElement.appendChild(optionElement);
    });
}

// Function to handle the user's answer
function handleAnswer(selectedOption, correctOption) {
    clearInterval(timer);

    const dots = document.querySelectorAll(".dot");
    if (selectedOption === correctOption) {
        score++;
        dots[currentQuestionIndex].classList.add("correct");
    } else {
        dots[currentQuestionIndex].classList.add("wrong");
    }

    document.getElementById("score").textContent = score;
    nextQuestion();
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        displayQuiz();
        startTimer();
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);

    // Create the overlay
    const overlay = document.createElement("div");
    overlay.className = "overlay active";

    // Create the image element
    const resultImage = document.createElement("img");
    resultImage.alt = "Result";

    // Create the score element
    const scoreElement = document.createElement("p");
    scoreElement.textContent = `Your final score is: ${score}`;

    // Set the image and sound based on the score
    if (score > totalQuestions / 2) {
        resultImage.src = resources.images.success; // Success image
        const successSound = new Audio(resources.sounds.success); // Success sound
        successSound.play();
    } else {
        resultImage.src = resources.images.failure; // Failure image
        const failureSound = new Audio(resources.sounds.failure); // Failure sound
        failureSound.play();
    }

    // Append the image and score to the overlay
    overlay.appendChild(resultImage);
    overlay.appendChild(scoreElement);

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Add a click event listener to the overlay to make it disappear
    overlay.addEventListener("click", () => {
        overlay.remove(); // Remove the overlay when clicked
    });
}

// Function to initialize dots
function initializeDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalQuestions; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        dotsContainer.appendChild(dot);
    }
}

// Function to start the timer
function startTimer() {
    timeLeft = 20;
    document.getElementById("timer").textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}

// Function to handle time up
function handleTimeUp() {
    const dots = document.querySelectorAll(".dot");
    dots[currentQuestionIndex].classList.add("time-up");
    nextQuestion();
}

// Event listener for the "Next Question" button
nextQuestionBtn.addEventListener("click", displayQuiz);

// Event listener for the "End Game" button
document.getElementById("endGameBtn").addEventListener("click", () => {
    const quizSection = document.querySelector(".hidden1");
    quizSection.classList.add("hidden");

    const resultContainer = document.querySelector(".result-container");
    if (resultContainer) resultContainer.remove();

    document.querySelector(".intro").classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    remainingImages = [...imagesArray];
    initializeDots();
});