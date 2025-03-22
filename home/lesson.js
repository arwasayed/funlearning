var menuIcon = document.getElementById("menu-icon");
var sidebar = document.getElementById("sidebar");
var overlay = document.querySelector(".overlay");

// Toggle sidebar visibility and overlay
menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
});
function startLesson() {
    // Hide the intro section
    const introSection = document.querySelector('.intro');
    introSection.classList.add('hidden');

    // Show the section with class "hidden" that contains .fruit-container-info
    const fruitInfoSection = document.querySelector('.hidden .vehicles-container-info').closest('section');
    if (fruitInfoSection) {
        fruitInfoSection.classList.remove('hidden');
    }
}
function playAudio(vehicle){
    if(vehicle=='bus') {
        var sound = new Audio("resources/pronunciation_en_bus.mp3")
        sound.play();
    }else if(vehicle=='train') {
        var sound = new Audio("resources/pronunciation_en_train.mp3")
        sound.play();
    }else if(vehicle=='plane') {
        var sound = new Audio("resources/pronunciation_en_plane.mp3")
        sound.play();
    }else if(vehicle=='car') {
        var sound = new Audio("resources/pronunciation_en_car.mp3")
        sound.play();
    }else if(vehicle=='bike') {
        var sound = new Audio("resources/pronunciation_en_bike.mp3")
        sound.play();
    }
}
