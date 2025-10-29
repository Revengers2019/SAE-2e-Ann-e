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

/*CSS ETHAN*/

// Initialisation de la carte
const map = L.map('map').setView([46.6, 2.2], 6);

// Fond de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Exemple de fédérations (à remplacer par les vraies données)
const federations = [
  { name: "FAGE Paris", coords: [48.8566, 2.3522] },
  { name: "FAGE Lyon", coords: [45.764, 4.8357] },
  { name: "FAGE Lille", coords: [50.6292, 3.0573] },
  { name: "FAGE Strasbourg", coords: [48.5734, 7.7521] },
  { name: "FAGE Marseille", coords: [43.2965, 5.3698] },
  { name: "FAGE Nantes", coords: [47.2184, -1.5536] },
  { name: "FAGE Bordeaux", coords: [44.8378, -0.5792] },
  { name: "FAGE Grenoble", coords: [45.1885, 5.7245] },
  { name: "FAGE Rennes", coords: [48.1173, -1.6778] },
  { name: "FAGE Clermont-Ferrand", coords: [45.7772, 3.0870] },
];

// Clusters de marqueurs
const markers = L.markerClusterGroup();

federations.forEach(fed => {
  const marker = L.marker(fed.coords);
  marker.bindPopup(`<b>${fed.name}</b>`);
  markers.addLayer(marker);
});

map.addLayer(markers);

// Fonction pour réinitialiser la vue
function resetMap() {
  map.setView([46.6, 2.2], 6);
}


/*CSS ETHAN*/
