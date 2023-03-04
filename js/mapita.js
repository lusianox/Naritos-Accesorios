var map = L.map('mapita').setView([-34.6460067,-58.5939652], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// - - - MARCADOR EN EL MAPA - - -
var marcador1 = L.circleMarker(L.latLng(-34.6460067,-58.5939652),{
    radius: 10,
    fillColor: "red",
    color: "red",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6,
}).addTo(map);

var marcador2 = L.circleMarker(L.latLng(-34.6416215,-58.56054),{
    radius: 10,
    fillColor: "red",
    color: "red",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6,
}).addTo(map);

var marcador3 = L.circleMarker(L.latLng(-34.666626,-58.5502247),{
    radius: 10,
    fillColor: "red",
    color: "red",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6,
}).addTo(map);

var marcador4 = L.circleMarker(L.latLng(-34.6848089,-58.5573727),{
    radius: 10,
    fillColor: "red",
    color: "red",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6,
}).addTo(map);

var marcador5 = L.circleMarker(L.latLng(-34.6775445,-58.5610044),{
    radius: 10,
    fillColor: "red",
    color: "red",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6,
}).addTo(map);

// Definir una función que muestre u oculte el elemento "mapita" según corresponda
function actualizarMapita() {
    // Obtener el elemento aside
    const asideElement = document.querySelector('aside');
  
    // Obtener el elemento div con el ID "mapita"
    const mapitaElement = document.querySelector('#mapita');
  
    if (asideElement.classList.contains('aside-visible')) {
      // Si el elemento aside tiene la clase "aside-visible", ocultar el elemento "mapita"
      mapitaElement.style.display = 'none';
    } else {
      // Si el elemento aside no tiene la clase "aside-visible", mostrar el elemento "mapita"
      mapitaElement.style.display = 'block';
    }
  }
  
  // Ejecutar la función "actualizarMapita" cada segundo
  setInterval(actualizarMapita, 1000);
  