// not really necesary but useful to avoid cached versions when combined with changes in the index.html file
console.log("rbt v7 startup!");

// set the map to San Miguel de Tucuman
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

map.on('locationfound', onLocationFound); // is more efficient not handle the errors in this case

// icons
var paradaIcon = L.icon({
    iconUrl: 'assets/images/rb_parada.png',
    iconSize:     [25, 25] // size of the icon
});
var busIcon = L.icon({
    iconUrl: 'assets/images/rb_bus.png',
    iconSize:     [25, 25] // size of the icon
});
var directionIcon = L.icon({
    iconUrl: 'assets/images/rb_arrow.png',
    iconSize:     [24, 75] // size of the icon
});

// global scope
var selectElement = document.getElementById('sel'); // select element on webpage
var checkboxRutas = document.getElementById('chkrut'); // checkbox for showing all routes on webpage
var checkboxLimp = document.getElementById('chklimp'); // checkbox cleanup everything on webpage
var checkboxRealtime = document.getElementById('chkrealtime'); // checkbox for updating in real time the buses locations
var checkboxAllBuses = document.getElementById('chkallbuses'); // checkbox to show all the buses at the same time
var obj; // the json gruposLineas.json
var objParadas; // to be any /assets/json/X.json
var corsProxy = "https://corsproxy.0x2f.dev/?"; // our very own cors proxy, needed to "improve" security
//var corsProxy = ""; // for local testing

// fetch gruposLineas.json
async function fetchgrupoLineas() {
	const response = await fetch('assets/json/gruposLineas.json', { 
		method: 'GET',
		header: {
			'Accept': 'application/json',
		},
		mode: 'cors'
	});
    obj = await response.json();
		dropdownLineas();
}

fetchgrupoLineas();

// populate our select object
async function dropdownLineas() {
	// urbanos
	const urbanos = obj.grupos.subGrupos[0].subGrupos;
	// interurbanos
	const interurbanos = obj.grupos.subGrupos[1].subGrupos;
	// rurales
	const rurales = obj.grupos.subGrupos[2].lineas;

	for (var key in Object.values(urbanos)) { // urbanos loop
		for (var yek in Object.values(urbanos[key])[2]) {
			sel.appendChild(new Option(Object.values(urbanos[key])[2][yek].descripcion, Object.values(urbanos[key])[2][yek].codLinea)).cloneNode(true);
		}
	}

	for (var key in Object.values(interurbanos)) { // interurbanos loop
		for (var yek in Object.values(interurbanos[key])[2]) {
			sel.appendChild(new Option(Object.values(interurbanos[key])[2][yek].descripcion, Object.values(interurbanos[key])[2][yek].codLinea)).cloneNode(true);
		}
	}

	for (var key in Object.values(rurales)) { // rurales loop
		sel.appendChild(new Option(Object.values(rurales[key])[1], Object.values(rurales[key])[0])).cloneNode(true);
	}
	
	// set default to zero to avoid problems
	sel.selectedIndex = 0;
}

// global scope
var lastclicked;
var busloopId;
var busName;

// on user selection get the selected value and display the bus stops
selectElement.addEventListener("change", function(event){
	let clickedOption = selectElement.value;
	busName = selectElement.options[selectElement.selectedIndex].text;
	//console.log("selectElement: ", selectElement.options[selectElement.selectedIndex].text);
	checkboxRutas.checked = false; // set the checkbox for all the routes off
	checkboxAllBuses.checked = false; // set the checkbox to show all the buses off
	// only look for stops and buses
	if (clickedOption !== "0") {
		if (lastclicked !== clickedOption) {
			// set lastclicked to avoid a new unnecessary call
			lastclicked = clickedOption;
			// call overlay
			poverlay(clickedOption);
			// call buses' locations
			//clearInterval(busloopId); --- BUS LAYER WON'T BE CLEAN
			buslocation(clickedOption, busName);
		}
	}
});

// overlay to show the bus stops for the currently selected bus line
function poverlay(clickedOption) {
	//console.log("clicked option poverlay: ", clickedOption);
	// fetch the gruposLineas.json
	fetch('assets/json/' + clickedOption + '.json', { 
		method: 'GET',
		mode: 'cors'
	})
	.then(function(response) { return response.json(); })
	.then(function(json) {
		// already parsed, no need for JSON.parse(json)
		objParadas = json;
		//console.log("paradas fetch json: ", objParadas);
		// call paradas
		paradas();
	});
}

// global scope
var layerParadas = L.layerGroup().addTo(map); // polyline layer for the bus stops
var layerPath = L.layerGroup().addTo(map); // polyline layer for the indidual routes
var layerBuses = L.layerGroup().addTo(map); // polyline layer for the buses
var layerAllRoutes = L.featureGroup(); // layer reserved for all the routes at the same time
var layerAllBuses = L.featureGroup(); // layer reserved for all the buses at the same time
var polyline; // just a polyline
const items = []; // array used for the polyline

// get the selected bus stops
function paradas () {
	let ranColor = "#000000";
	if (checkboxLimp.checked === true) { // only if the checkbox is selected
		// clear all the 'paradas' markers
		layerParadas.clearLayers();
		// clear the current bus path
		layerPath.clearLayers();
		// clear buses locations
		//layerBuses.clearLayers();
		// remove layerAllRoutes
		layerAllRoutes.remove();
		// remove layerAllbuses
		layerAllBuses.remove();
	}
	
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
	// random color for the bus path
	ranColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	// the above code has issues so here's a hacky patch
	if (ranColor.length < 7) {
		//console.log("random color was not 6 digits");
		ranColor = "#773322";
	}
	// add the polyline to the its own layer on the map
	polyline = L.polyline(items, {color: ranColor,
																weight: 7,
																opacity: 1,
																smoothFactor: 1}).bindPopup(selectElement.options[selectElement.selectedIndex].text).addTo(layerPath);
	// clear the array
	items.length = 0;
	// fit to current path
	map.fitBounds(polyline.getBounds());
}

// shows all the possible routes at the same time
function retrieveAllRoutes () {
	let r = 0;
	let z = 0;
	// remove all the 'paradas' markers
	//layerParadas.clearLayers();
	for (let i = 1; i < selectElement.length; i++) { 	
		// our index is our guide
		selectElement.selectedIndex = i;
		// fetch the gruposLineas.json
		fetch('assets/json/' + selectElement.options[selectElement.selectedIndex].value + '.json', { 
			method: 'GET'
		})
		.then(function(response) { return response.json(); })
		.then(function(json) {
			// already parsed, no need for JSON.parse(json)
			objParadas = json;
			//console.log("retrieveAllRoutes: ", objParadas);
			
			// show the layergroup choosen
			for (var key in Object.values(objParadas.nodos)) {
				// for the bus route it should use all the wavepoints
				let lattemp = parseFloat(Object.values(objParadas.nodos[key])[0]);
				let lngtemp = parseFloat(Object.values(objParadas.nodos[key])[1]);
				// send items to array
				items.push([lattemp, lngtemp]);
			}
			// random color part 1
			if (r < 255) {
				r = r + 6 + i;
			} else {
				r = 3 + i;
			}
			// random color part 2
			if (z < 255) {
				z = z + 3 + i;
			} else {
				z = 2 + i;
			}
			let linecolor = 'rgb(' + r +', ' + z +', 100)';
			// add the polyline to the its own layer on the map
			polyline = L.polyline(items, {color: linecolor,
																		//fillColor: 'black',
																		//dashArray: '9',
																		weight: 7,
																		opacity: 0.9,
																		//fillOpacity: 0.9,
																		smoothFactor: 1}).bindPopup(selectElement.options[i].text).addTo(layerAllRoutes);	
			// clear the array
			items.length = 0;
			// fit to current path but only when we are in the last element
			if (i === selectElement.length - 1) {
				map.fitBounds(polyline.getBounds());
			}
		});
	}
	// finally we add the layer to the map
	layerAllRoutes.addTo(map);
}

// shows all the current buses locations at the same time
function retrieveAllBuses () {
	Array.from(selectElement.options).forEach(function(value) {
		// get each the current buses from each available line
		fetch(corsProxy + 'https://tucuman.miredbus.com.ar/rest/posicionesBuses/' + value.value, {
			method: 'GET',
			header: {
				'Origin': 'https://rbt.0x2f.dev',
				'Accept': 'application/json',
			},
			mode: 'cors'
		})
		.then(function(response) { return response.json(); })
		.then(function(json) {
			// already parsed, no need for JSON.parse(json)
			objBusLoc = json;
			
			// display the location of all the buses
			for (var key in Object.values(objBusLoc.posiciones)) {
				let latLng = L.latLng([Object.values(objBusLoc.posiciones[key])[1], Object.values(objBusLoc.posiciones[key])[2]]);
				L.marker(latLng, {icon: busIcon, zIndexOffset: 9999}).addTo(layerAllBuses).bindPopup("Colectivo: " + value.text + "<br> Interno: " + Object.values(objBusLoc.posiciones[key])[0] + "<br> Próxima parada: " + Object.values(objBusLoc.posiciones[key])[4]);
				// add bus direction
				L.marker(latLng, {rotationAngle: Object.values(objBusLoc.posiciones[key])[3], rotationOrigin: "center", icon: directionIcon, zIndexOffset: 9998}).addTo(layerAllBuses);
			}
		});
	//console.log("Retrieving all buses location index: ", value.value);
	});
	// finally we add the layer to the map
	layerAllBuses.addTo(map);
}

// try to get the current position of the buses for a specific line number
function buslocation(clickedOption, busName) {
	clearTimeout(busloopId); // clear loop
	layerBuses.clearLayers(); // clear bus layer

	let cbus = clickedOption;
	let bNam = busName;

	// retrieve current location
	fetch(corsProxy + 'https://tucuman.miredbus.com.ar/rest/posicionesBuses/' + clickedOption, {
		method: 'GET',
		header: {
			'Origin': 'https://rbt.0x2f.dev',
			'Accept': 'application/json',
		},
		mode: 'cors'
	})
	.then(function(response) { return response.json(); })
	.then(function(json) {
		// already parsed, no need for JSON.parse(json)
		objBusLoc = json;
		
		// display the location of all the buses
		for (var key in Object.values(objBusLoc.posiciones)) {
			
			let latLng = L.latLng([Object.values(objBusLoc.posiciones[key])[1], Object.values(objBusLoc.posiciones[key])[2]]);
			L.marker(latLng, {icon: busIcon, zIndexOffset: 9999}).addTo(layerBuses).bindPopup("Colectivo: " + busName + "<br> Interno: " + Object.values(objBusLoc.posiciones[key])[0] + "<br> Próxima parada: " + Object.values(objBusLoc.posiciones[key])[4]);
			// add bus direction
			L.marker(latLng, {rotationAngle: Object.values(objBusLoc.posiciones[key])[3], rotationOrigin: "center", icon: directionIcon, zIndexOffset: 9998}).addTo(layerBuses);
		}
	});
	// update location only if the checkbox is selected
	if (checkboxRealtime.checked === true) {
		busloopId = setTimeout( () => {buslocation(cbus, bNam);}, 15000); // 15 secs is enough
		console.log("Real time update complete.");
	}
}

// CHECKBOX: update the buses locations in real time
checkboxRealtime.addEventListener("click", function(event){
	if (checkboxRealtime.checked === true) {
		// refresh the buses if already selected
		if (lastclicked && lastclicked != 0) {
			buslocation(lastclicked, busName);
		}
	} else {
		// clear loop
		clearTimeout(busloopId);
		console.log("Real time update stopped.");
	}
});

// CHECKBOX: show all routes at the same time
checkboxRutas.addEventListener("click", function(event){
	if (checkboxRutas.checked === true) {
		// layers cleanup
		layerParadas.clearLayers();
		layerPath.clearLayers();
		layerBuses.clearLayers();
		layerAllRoutes.remove();
		// clear busloopId just in case
		clearTimeout(busloopId);
		// call our function if we didn't already
		if (layerAllRoutes.getLayers().length === 0) {
			retrieveAllRoutes();
		} else {
			layerAllRoutes.addTo(map);
		}
	} else {
		// layers cleanup
		layerParadas.clearLayers();
		layerPath.clearLayers();
		layerBuses.clearLayers();
		layerAllRoutes.remove();
		// clear busloopId just in case
		clearTimeout(busloopId);
	}
});

// CHECKBOX: show all buses at the same time
checkboxAllBuses.addEventListener("click", function(event){
	if (checkboxAllBuses.checked === true) {
		// layers cleanup
		layerParadas.clearLayers();
		layerPath.clearLayers();
		layerBuses.clearLayers();
		layerAllBuses.remove();
		// clear busloopId just in case
		clearTimeout(busloopId);
		if (layerAllBuses.getLayers().length === 0) {
			retrieveAllBuses();
		} else {
			layerAllBuses.addTo(map);
		}
	} else {
		// layers cleanup
		layerParadas.clearLayers();
		layerPath.clearLayers();
		layerBuses.clearLayers();
		layerAllBuses.remove();
		// clear busloopId just in case
		clearTimeout(busloopId);		
	}
});
