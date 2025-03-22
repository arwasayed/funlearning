var menuIcon = document.querySelector('header i.fa-bars');
var sidebar = document.querySelector('aside');
var overlay = document.querySelector('.overlay');

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