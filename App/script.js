const carousel = document.getElementById("carousel");
const nav = document.getElementById("navbar");
const navElements = document.getElementById("nav-element");
const slides = carousel.children.length;
let index = 0;

function showSlide(i) {
    index = (i + slides) % slides;
    carousel.style.transform = `translateX(-${index * 100}%)`;
}
function nextSlide() { showSlide(index + 1); }

nav.addEventListener("click", () => {
    navElements.classList.remove("hidden");
    nav.classList.add("hidden");
});

setInterval(nextSlide, 4000);

const reveals = document.querySelectorAll('.reveal');
function showReveals() { for (const r of reveals) { const rect = r.getBoundingClientRect(); if (rect.top < window.innerHeight - 80) r.classList.add('show'); } }
window.addEventListener('scroll', showReveals);
window.addEventListener('load', () => { showReveals(); });

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
