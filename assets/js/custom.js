// set default to San Miguel de Tucuman
const map = L.map('map').setView([-26.8083, -65.2176], 13);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '© OpenStreetMap'
	}).addTo(map);

// for automatic detection of location
map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("Te encuentras dentro de este radio.").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

// here there should be some sort of error handling but it's better no to have it really

// global scope
var selectElement = document.getElementById('sel'); // select element on index.html
var obj; // gruposLineas.json
var objParadas; // to be any /assets/json/X.json

// fetch gruposLineas.json
async function fetchgrupoLineas() {
	fetch('../assets/json/gruposLineas.json', { 
		method: 'GET'
	})
	.then(function(response) { return response.json(); })
	.then(function(json) {
		// already parsed, no need for JSON.parse(json)
		obj = json;
		// call dropdown function
		dropdownLineas();
	});
}

fetchgrupoLineas();

// populate our select object
async function dropdownLineas() {
	// urbanos
	const urbanos = obj.grupos.subGrupos[0].subGrupos;
	//console.log(obj.grupos.subGrupos[0].subGrupos);
	//console.log(urbanos.length);

	// interurbanos
	const interurbanos = obj.grupos.subGrupos[1].subGrupos;
	//console.log(obj.grupos.subGrupos[1].subGrupos);
	//console.log(interurbanos.length);

	// rurales
	const rurales = obj.grupos.subGrupos[2].lineas;
	//console.log(obj.grupos.subGrupos[2].lineas);
	//console.log(rurales.length);


	for (var key in Object.values(urbanos)) {
		//console.log("codLinea: ", Object.values(urbanos[key])[2]);
		//console.log("codLinea: ", Object.values(urbanos[key])[2][0]);
		for (var yek in Object.values(urbanos[key])[2]) {
			//console.log("urbanos inception: ", Object.values(urbanos[key])[2][yek].codLinea);
			//console.log("urbanos inception: ", Object.values(urbanos[key])[2][yek].descripcion);
			sel.appendChild(new Option(Object.values(urbanos[key])[2][yek].descripcion, Object.values(urbanos[key])[2][yek].codLinea)).cloneNode(true);
		}

		//console.log("descripcion: " + Object.values(urbanos[key])[1]);
		//sel.appendChild(new Option(Object.values(rurales[key])[1], Object.values(rurales[key])[0])).cloneNode(true);
		//sel.appendChild(new Option(Object.values(rurales[key])[1], Object.values(rurales[key])[0])).cloneNode(true);
	}

	for (var key in Object.values(interurbanos)) {
		for (var yek in Object.values(interurbanos[key])[2]) {
			sel.appendChild(new Option(Object.values(interurbanos[key])[2][yek].descripcion, Object.values(interurbanos[key])[2][yek].codLinea)).cloneNode(true);
		}
	}

	for (var key in Object.values(rurales)) {
		//console.log("codLinea: " + Object.values(rurales[key])[0]);
		//console.log("descripcion: " + Object.values(rurales[key])[1]);
		sel.appendChild(new Option(Object.values(rurales[key])[1], Object.values(rurales[key])[0])).cloneNode(true);
	}
	
	// set default to zero to avoid problems
	sel.selectedIndex = 0;
}

// global scope
var lastclicked;
var busloopId;

// on user selection get the selected value and display the bus stops
selectElement.addEventListener("change", function(event){
	let clickedOption = selectElement.value;
	// only look for stops and buses
	if (clickedOption !== "0") {
		if (lastclicked !== clickedOption) {
			// set lastclicked to avoid a new unnecessary call
			lastclicked = clickedOption;
			// call overlay
			poverlay(clickedOption);
			// call buses' locations
			clearInterval(busloopId);
			buslocation(clickedOption);
		}
	}
});

function poverlay(clickedOption) {
	console.log("clicked option poverlay: ", clickedOption);
	// fetch the gruposLineas.json
	fetch('../assets/json/' + clickedOption + '.json', { 
		method: 'GET'
	})
	.then(function(response) { return response.json(); })
	.then(function(json) {
		// already parsed, no need for JSON.parse(json)
		objParadas = json;
		console.log("paradas fetch json: ", objParadas);
		// call paradas
		paradas();
	});
}

// icons
var paradaIcon = L.icon({
    iconUrl: '../assets/images/rb_parada.png',
    iconSize:     [25, 25] // size of the icon
});
var busIcon = L.icon({
    iconUrl: '../assets/images/rb_bus.png',
    iconSize:     [25, 25] // size of the icon
});
var directionIcon = L.icon({
    iconUrl: '../assets/images/rb_arrow.png',
    iconSize:     [24, 75] // size of the icon
});

// global scope
var layerParadas = L.layerGroup().addTo(map); // rb json with bus stops
var layerPath = L.layerGroup().addTo(map); // layer for polyline the stops
var layerBuses = L.layerGroup().addTo(map); // layer for polyline the stops
var polyline;
const items = []; // array used for the polyline

// get the selected bus stops
function paradas () {
	// remove all the 'paradas' markers
	layerParadas.clearLayers();
	// remove the current bus path
	layerPath.clearLayers();
	// remove buses locations
	layerBuses.clearLayers();
	// show the layergroup choosen
	for (var key in Object.values(objParadas.nodos)) {
		// redbus JSON default values	
		//console.log("latitud: " + Object.values(objParadas.nodos[key])[0]);
		//console.log("longitud: " + Object.values(objParadas.nodos[key])[1]);
		//console.log("parada: " + Object.values(objParadas.nodos[key])[2]);
		//console.log("codigoParada: " + Object.values(objParadas.nodos[key])[3]);
		//console.log("descripcionParada: " + Object.values(objParadas.nodos[key])[4]);
		
		// if parada is true it returns a bus stop
		if (Object.values(objParadas.nodos[key])[2] === true) {
			let latLng = L.latLng([Object.values(objParadas.nodos[key])[0], Object.values(objParadas.nodos[key])[1]]);
			L.marker(latLng, {icon: paradaIcon}).addTo(layerParadas).bindPopup("Parada: " + Object.values(objParadas.nodos[key])[4]);
		}
		// for the bus route it should use all the wavepoints
		let lattemp = parseFloat(Object.values(objParadas.nodos[key])[0]);
		let lngtemp = parseFloat(Object.values(objParadas.nodos[key])[1]);
		// send items to array
		items.push([lattemp, lngtemp]);
	}
	// add the polyline to the its own layer on the map
	polyline = L.polyline(items, {color: 'red'}).addTo(layerPath);
	// clear the array
	items.length = 0;
	// fit to current path
	map.fitBounds(polyline.getBounds());
}

// try to get the current position of the buses
function buslocation(clickedOption) {
	let cbus = clickedOption;
	console.log("hi! buses locations");

	// retrieve current location
	fetch('https://tucuman.miredbus.com.ar/rest/posicionesBuses/' + clickedOption, {
		method: 'GET',
		mode: 'cors'
	})
	.then(function(response) { return response.json(); })
	.then(function(json) {
		// already parsed, no need for JSON.parse(json)
		objBusLoc = json;

		// clean the layer before displaying it again
		layerBuses.clearLayers();
		// display the location of all the buses
		for (var key in Object.values(objBusLoc.posiciones)) {
			//console.log("Interno: " + Object.values(objBusLoc.posiciones[key])[0]);
			//console.log("Latitud: " + Object.values(objBusLoc.posiciones[key])[1]);
			//console.log("Longitud: " + Object.values(objBusLoc.posiciones[key])[2]);
			//console.log("Orientacion: " + Object.values(objBusLoc.posiciones[key])[3]);
			//console.log("Proxima Parada: " + Object.values(objBusLoc.posiciones[key])[4]);
			
			let latLng = L.latLng([Object.values(objBusLoc.posiciones[key])[1], Object.values(objBusLoc.posiciones[key])[2]]);
			L.marker(latLng, {icon: busIcon, zIndexOffset: 9999}).addTo(layerBuses).bindPopup("Interno: " + Object.values(objBusLoc.posiciones[key])[0] + "<br> Próxima parada: " + Object.values(objBusLoc.posiciones[key])[4]);
			// add bus direction
			L.marker(latLng, {rotationAngle: Object.values(objBusLoc.posiciones[key])[3], rotationOrigin: "center", icon: directionIcon, zIndexOffset: 9998}).addTo(layerBuses);
		}
	});
busloopId = setTimeout( () => {buslocation(cbus);}, 15000); // 15 secs is enough, lets be nice
}
