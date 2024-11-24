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

// here there should be an error handle but it's better no to have it really

// red bus json
//const json = '{"error":0,"grupos":{"codGrupo":"Grupos de Lineas","subGrupos":[{"codGrupo":"Urbano","subGrupos":[{"codGrupo":"Linea 1","subGrupos":null,"lineas":[{"codLinea":"1","descripcion":"Linea 1 - Sal"},{"codLinea":"7","descripcion":"Linea 1 - Mitre"}]},{"codGrupo":"Linea 3","subGrupos":null,"lineas":[{"codLinea":"3","descripcion":"Linea 3 - Lavalle"},{"codLinea":"4","descripcion":"Linea 3 - Piedras"}]},{"codGrupo":"Linea 4","subGrupos":null,"lineas":[{"codLinea":"5","descripcion":"Linea 4 - Colombres"},{"codLinea":"6","descripcion":"Linea 4 - Mercofr"}]},{"codGrupo":"Linea 5","subGrupos":null,"lineas":[{"codLinea":"16","descripcion":"Linea 5 - El Molino"},{"codLinea":"17","descripcion":"Linea 5 - Agrimensor - Balcarce"},{"codLinea":"18","descripcion":"Linea 5 - Oeste - 25 de Mayo"},{"codLinea":"19","descripcion":"Linea 5 - B Oeste x Santiago"}]},{"codGrupo":"Linea 6","subGrupos":null,"lineas":[{"codLinea":"20","descripcion":"Linea 6 - Crisostomo Alvarez - San Alberto"},{"codLinea":"21","descripcion":" Linea 6 - Democraci"}]},{"codGrupo":"Linea 7","subGrupos":null,"lineas":[{"codLinea":"22","descripcion":"Linea 7 - O Connor"},{"codLinea":"23","descripcion":"Linea 7 - AGET"}]},{"codGrupo":"Linea 8","subGrupos":null,"lineas":[{"codLinea":"24","descripcion":"Linea 8 - El Bosque"},{"codLinea":"25","descripcion":"Linea 8 - Muñecas-Kennedy"}]},{"codGrupo":"Linea 9","subGrupos":null,"lineas":[{"codLinea":"26","descripcion":"Linea 9 - Bulnes"},{"codLinea":"27","descripcion":"Linea 9 - Viamonte"}]},{"codGrupo":"Linea 10","subGrupos":null,"lineas":[{"codLinea":"28","descripcion":"Linea 10 - Villa Amali"},{"codLinea":"29","descripcion":"Linea 10 - San Cayetano"}]},{"codGrupo":"Linea 11","subGrupos":null,"lineas":[{"codLinea":"400","descripcion":"Linea 11 - 11 de Marzo"},{"codLinea":"401","descripcion":"Linea 11 - Villa Angeli"},{"codLinea":"402","descripcion":"Linea 11 - Manantial Sur"}]},{"codGrupo":"Linea 12","subGrupos":null,"lineas":[{"codLinea":"32","descripcion":"Linea 12 - Municipal"},{"codLinea":"33","descripcion":"Linea 12 - SMATA"}]},{"codGrupo":"Linea 17","subGrupos":null,"lineas":[{"codLinea":"34","descripcion":"Linea 17 - Alem - Uni"},{"codLinea":"35","descripcion":"Linea 17 - Los Chañaritos"},{"codLinea":"36","descripcion":"Linea 17 - Bº Teran - AGEF"},{"codLinea":"37","descripcion":"Linea 17 - Bº Teran - San Lorenzo"},{"codLinea":"38","descripcion":"Linea 17 - Roca - Univer"}]},{"codGrupo":"Linea 18","subGrupos":null,"lineas":[{"codLinea":"39","descripcion":"Linea 18 - Anti-horario"},{"codLinea":"40","descripcion":"Linea 18 - Horario"}]},{"codGrupo":"Linea 19","subGrupos":null,"lineas":[{"codLinea":"41","descripcion":"Linea 19 - Anti-horario"},{"codLinea":"42","descripcion":"Linea 19 - Horario"}]}],"lineas":null},{"codGrupo":"InterUrbano","subGrupos":[{"codGrupo":"Linea 100","subGrupos":null,"lineas":[{"codLinea":"100","descripcion":"Linea 100 - San Pablo"},{"codLinea":"101","descripcion":"Linea 100 - Esc. Agricultur"},{"codLinea":"102","descripcion":"Linea 100 - Castillo - Sta. Fe"},{"codLinea":"103","descripcion":"Linea 100 - Castillo - Gral. Paz"},{"codLinea":"104","descripcion":"Linea 100 - Avellaned"}]},{"codGrupo":"Linea 101","subGrupos":null,"lineas":[{"codLinea":"107","descripcion":"Linea 101 - Lomas de Tafi"},{"codLinea":"108","descripcion":"Linea 101 - Lomas de Tafi 2"},{"codLinea":"109","descripcion":"Linea 101 - Los Pocitos"},{"codLinea":"110","descripcion":"Linea 101 - El Grafico"},{"codLinea":"111","descripcion":"Linea 101 - Los Nogales"},{"codLinea":"112","descripcion":"Linea 101 - SOEME"}]},{"codGrupo":"Linea 102","subGrupos":null,"lineas":[{"codLinea":"115","descripcion":"Linea 102 - Horco Molle"},{"codLinea":"116","descripcion":"Linea 102 - La Rinconad"},{"codLinea":"117","descripcion":"Linea 102 - Los Pinos"}]},{"codGrupo":"Linea 103","subGrupos":null,"lineas":[{"codLinea":"119","descripcion":"Linea 103 - Manantial - EXP"}]},{"codGrupo":"Linea 105","subGrupos":null,"lineas":[{"codLinea":"121","descripcion":"Linea 105 - Unsta - Las Talitas"}]},{"codGrupo":"Linea 106","subGrupos":null,"lineas":[{"codLinea":"122","descripcion":"Linea 106 - P. Me"},{"codLinea":"123","descripcion":"Linea 106 - Vial 2"}]},{"codGrupo":"Linea 107","subGrupos":null,"lineas":[{"codLinea":"127","descripcion":"Linea 107 - El Grafico"},{"codLinea":"128","descripcion":"Linea 107 - El Sol"}]},{"codGrupo":"Linea 109","subGrupos":null,"lineas":[{"codLinea":"130","descripcion":"Linea 109 - Lomas del Tafí"}]},{"codGrupo":"Linea 110","subGrupos":null,"lineas":[{"codLinea":"133","descripcion":"Linea 110 - Manantial"}]},{"codGrupo":"Linea 118","subGrupos":null,"lineas":[{"codLinea":"134","descripcion":"Linea 118 - APUNT"},{"codLinea":"135","descripcion":"Linea 118 - 200 Viviendas"},{"codLinea":"136","descripcion":"Linea 118 - La Rinconad"},{"codLinea":"137","descripcion":"Linea 118 - Pie del Cerro"},{"codLinea":"138","descripcion":"Linea 118 - Zona Sur-Los Pinos"}]},{"codGrupo":"Linea 121","subGrupos":null,"lineas":[{"codLinea":"150","descripcion":"Linea 121 - Alderetes-Los Gutierrez"},{"codLinea":"151","descripcion":"Linea 121 - Hospital del Este"},{"codLinea":"152","descripcion":"Linea 121 - Aeropuerto"},{"codLinea":"153","descripcion":"Linea 121 - Alderetes-Casco urbano"}]},{"codGrupo":"Linea 122","subGrupos":null,"lineas":[{"codLinea":"155","descripcion":"Linea 122 - Alderetes-El Talar"},{"codLinea":"156","descripcion":"Linea 122 - Alderetes-La Cienag"},{"codLinea":"157","descripcion":"Linea 122 - Alderetes-Los Gutierrez"},{"codLinea":"158","descripcion":"Linea 122 - Piedritas"},{"codLinea":"159","descripcion":"Linea 122 - Rincon del Este"},{"codLinea":"160","descripcion":"Linea 122 - San Jorge"}]},{"codGrupo":"Linea 123","subGrupos":null,"lineas":[{"codLinea":"165","descripcion":"Linea 123 - Lasteni"},{"codLinea":"166","descripcion":"Linea 123 - Pacará"},{"codLinea":"167","descripcion":"Linea 123 - VLasteni"}]},{"codGrupo":"Linea 124","subGrupos":null,"lineas":[{"codLinea":"170","descripcion":"Linea 124 - Alderetes - T"},{"codLinea":"171","descripcion":"Linea 124 - B. Victori"},{"codLinea":"172","descripcion":"Linea 124 - Las Piedritas Directo"}]},{"codGrupo":"Linea 125","subGrupos":null,"lineas":[{"codLinea":"175","descripcion":"Linea 125 - Aeropuerto"},{"codLinea":"176","descripcion":"Linea 125 - Santo Cristo"}]},{"codGrupo":"Linea 129","subGrupos":null,"lineas":[{"codLinea":"180","descripcion":"Linea 129 - Flecha Bus"},{"codLinea":"181","descripcion":"Linea 129 - Hospital del Este"}]},{"codGrupo":"Linea 130","subGrupos":null,"lineas":[{"codLinea":"185","descripcion":"Linea 130 - Ruta 9"},{"codLinea":"186","descripcion":"Linea 130 - San Jose"}]},{"codGrupo":"Linea 131","subGrupos":null,"lineas":[{"codLinea":"190","descripcion":"Linea 131 - TV Diagonal"},{"codLinea":"191","descripcion":"Linea 131- TV-Karamaneff"},{"codLinea":"192","descripcion":"Linea 131 - L. TAFI"}]},{"codGrupo":"Linea 140","subGrupos":null,"lineas":[{"codLinea":"200","descripcion":"Linea 140 - TCM-Las Cantinas"}]},{"codGrupo":"Linea 141","subGrupos":null,"lineas":[{"codLinea":"205","descripcion":"Linea 141 - Los Aguirres"},{"codLinea":"206","descripcion":"Linea 141 - Policial IV"}]},{"codGrupo":"Linea 142","subGrupos":null,"lineas":[{"codLinea":"210","descripcion":"Linea 142 - Lomas de Tafi"}]},{"codGrupo":"Linea 214","subGrupos":null,"lineas":[{"codLinea":"211","descripcion":"Linea 214 - Los Fresnos"}]},{"codGrupo":"Linea 414","subGrupos":null,"lineas":[{"codLinea":"221","descripcion":"Linea 414 - San Andres"}]},{"codGrupo":"El Provincial","subGrupos":null,"lineas":[{"codLinea":"611","descripcion":"El Provincial - Rinconad"},{"codLinea":"612","descripcion":"El Provincial - San Pablo"}]}],"lineas":null},{"codGrupo":"Rural","subGrupos":null,"lineas":[{"codLinea":"299","descripcion":"San Javier"},{"codLinea":"300","descripcion":"Tucuman - Los Perez"},{"codLinea":"301","descripcion":"Tucuman - El Sunchal"},{"codLinea":"302","descripcion":"Tucuman - El Diamante"},{"codLinea":"303","descripcion":"Tucuman - Cruz de  Arrib"},{"codLinea":"304","descripcion":"Tucuman - Cañete"},{"codLinea":"305","descripcion":"Tucuman - Cañada Alzogaray"},{"codLinea":"306","descripcion":"Tucuman  - La Mar"},{"codLinea":"307","descripcion":"Santa Rosa de Leales"},{"codLinea":"308","descripcion":"Los Sueldos"}]}],"lineas":null}}';
//const obj = JSON.parse(json);

// global scope
var selectElement = document.getElementById('sel'); // select element on webpage
var checkboxRutas = document.getElementById('chkrut'); // checkbox for showing all routes on webpage
var checkboxLimp = document.getElementById('chklimp'); // checkbox cleanup everything on webpage
var obj; // the json gruposLineas.json
var objParadas; // to be any /assets/json/X.json

// fetch gruposLineas.json
async function fetchgrupoLineas() {
	const response = await fetch('assets/json/gruposLineas.json', { 
		method: 'GET',
		header: {
			'Origin': 'https://tucuman.miredbus.com.ar',
			'Accept': 'application/json',
		},
		mode: 'cors'
	});
    obj = await response.json();
    console.log(obj);
    // call dropdown function
		dropdownLineas();
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
	let busName = selectElement.options[selectElement.selectedIndex].text;
	console.log("selectElement: ", selectElement.options[selectElement.selectedIndex].text);
	checkboxRutas.checked = false; // set the checkbox for all the routes off
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

function poverlay(clickedOption) {
	console.log("clicked option poverlay: ", clickedOption);
	// fetch the gruposLineas.json
	fetch('assets/json/' + clickedOption + '.json', { 
		method: 'GET',
		mode: 'cors'
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

// red bus json
//const json = '{"error":0,"nodos":[{"latitud":-26.7874985333509520,"longitud":-65.2291004384784800,"parada":true,"codigoParada":"necochea y rep del libano","descripcionParada":"Inicio de Recorrido"},{"latitud":-26.7864621499466580,"longitud":-65.2289086262055400,"parada":true,"codigoParada":"necochea y los ceibos","descripcionParada":"Necochea y Los Ceibos"},{"latitud":-26.7851062244411580,"longitud":-65.2287384447856800,"parada":true,"codigoParada":"necochea y av mercedes sosa","descripcionParada":" Necochea y Av. Mercedes Sosa"},{"latitud":-26.7855287742361800,"longitud":-65.2264888721015000,"parada":true,"codigoParada":"av mercedes sosa y castelli","descripcionParada":"Av. Mercedes Sosa y Castelli"},{"latitud":-26.7860253713850700,"longitud":-65.2238369935883200,"parada":true,"codigoParada":"av mercedes sosa y republica del libano","descripcionParada":"Av. Mercedes Sosa y Rep�blica del L�bano"},{"latitud":-26.7872581430982530,"longitud":-65.2240852599587600,"parada":true,"codigoParada":"republica del libano y los ceibos","descripcionParada":"Rep�blica del L�bano y Los Ceibos"},{"latitud":-26.7871353240923970,"longitud":-65.2247867762052200,"parada":true,"codigoParada":"los ceibos y bulnes","descripcionParada":"Los Ceibos y Bulnes"},{"latitud":-26.7883846505313270,"longitud":-65.2251523677829100,"parada":true,"codigoParada":"bulnes y rep del libano","descripcionParada":"Bulnes y Rep�blica del Libano"},{"latitud":-26.7882555308647630,"longitud":-65.2260060143925200,"parada":true,"codigoParada":"rep del libano y castelli","descripcionParada":"Rep�blica del L�bano y Castelli"},{"latitud":-26.7887658482870780,"longitud":-65.2262294850748100,"parada":true,"codigoParada":"av fco de aguirre y diagonal","descripcionParada":" Av. Fco de Aguirre y Diagonal"},{"latitud":-26.7891375106907080,"longitud":-65.2247665220623400,"parada":true,"codigoParada":"av fco de aguirre y calle sn ","descripcionParada":"Av. Fco de Aguirre y Castelli"},{"latitud":-26.7894422629456630,"longitud":-65.2230707091075700,"parada":true,"codigoParada":"supermercado vea","descripcionParada":"Av. Fco de Aguirre (VEA) y Saavedra"},{"latitud":-26.7895939104418800,"longitud":-65.2225149858719000,"parada":false,"codigoParada":"","descripcionParada":" PC: (IDA) Av. F. de Aguirre y Ej. del Norte"},{"latitud":-26.7899760836765960,"longitud":-65.2208944720366300,"parada":true,"codigoParada":"av fco de aguirre y j j paso","descripcionParada":"(Ida)Av. Fco de Aguirre y J.J Paso"},{"latitud":-26.7902635903997400,"longitud":-65.2196335030161500,"parada":true,"codigoParada":"av fco de aguirre y thames","descripcionParada":"(Vuelta) Av. F. de Aguirre y Thames"},{"latitud":-26.7905729940425300,"longitud":-65.2182908171055400,"parada":true,"codigoParada":"av fco de aguirre y alberti","descripcionParada":"(Vuelta) Av. F. de Aguirre y  Alberti"},{"latitud":-26.7907513057833420,"longitud":-65.2175154811751300,"parada":true,"codigoParada":"av fco de aguirre y paso de los andes","descripcionParada":"(Vuelta) Av. F. de Aguirre y  P. de los Andes"},{"latitud":-26.7912487994220250,"longitud":-65.2151400768229800,"parada":true,"codigoParada":"av fco de aguirre y san miguel","descripcionParada":"(Vuelta) Av. F. de Aguirre y San Miguel"},{"latitud":-26.7917086700856970,"longitud":-65.2127831989017700,"parada":true,"codigoParada":"av fco de aguirre y lucas cordoba","descripcionParada":"(Vuelta) Av. F. de Aguirre y L. C�rdoba"},{"latitud":-26.7921997745956020,"longitud":-65.2103429506158700,"parada":true,"codigoParada":"av fco de aguirre y republica del libano","descripcionParada":"(Ida)Av. Fco de Aguirre y Rep�blica del L�bano"},{"latitud":-26.7939404473463330,"longitud":-65.2108005254992200,"parada":true,"codigoParada":"av rep de libano y juan cruz varela","descripcionParada":" Av. Rep. de L�bano y Juan Cruz Varela"},{"latitud":-26.7946490882676930,"longitud":-65.2109268968195700,"parada":false,"codigoParada":null,"descripcionParada":"*"},{"latitud":-26.7953982598819350,"longitud":-65.2106347908307800,"parada":false,"codigoParada":null,"descripcionParada":" Av. Rep. de Libano y E Castelar"},{"latitud":-26.7967110335855240,"longitud":-65.2109031996804900,"parada":true,"codigoParada":"av rep de libano y cazarreta","descripcionParada":" Av. Rep. de Libano y Chazarreta"},{"latitud":-26.7986703051348800,"longitud":-65.2113392094550900,"parada":true,"codigoParada":"av rep de libano y don orione","descripcionParada":"Av. Rep. de L�bano y Don Orione"},{"latitud":-26.8006660797891240,"longitud":-65.2119341254763900,"parada":true,"codigoParada":"av rep de libano y mejico","descripcionParada":"Av. Rep. Libano y Mejico"},{"latitud":-26.8023097539171100,"longitud":-65.2122516252650400,"parada":true,"codigoParada":"av rep libano y venezuela","descripcionParada":"Av. Rep. Libano y Venezuela"},{"latitud":-26.8039001134619250,"longitud":-65.2126054387415800,"parada":true,"codigoParada":"av rep de libano y colombia","descripcionParada":"Av. Rep. de L�bano y Colombia"},{"latitud":-26.8065253928551300,"longitud":-65.2131933075872600,"parada":true,"codigoParada":"av rep de libano y paraguay","descripcionParada":"Av. Rep. de Libano y Paraguay"},{"latitud":-26.8089008921717600,"longitud":-65.2137515481818800,"parada":true,"codigoParada":"av rep libano y bolivia","descripcionParada":"Av. Rep. Libano y Bolivia"},{"latitud":-26.8107307129891130,"longitud":-65.2142322985820900,"parada":true,"codigoParada":"av rep libano y chile","descripcionParada":"Av. Rep. Libano y Chile"},{"latitud":-26.8120608725767440,"longitud":-65.2145348572042300,"parada":true,"codigoParada":"av rep libano y uruguay","descripcionParada":"Av. Rep. Libano y Uruguay"},{"latitud":-26.8143192443756180,"longitud":-65.2150478328344300,"parada":true,"codigoParada":"av rep libano y  espana","descripcionParada":"Av. Rep. Libano y  Espa�a"},{"latitud":-26.8153873111679030,"longitud":-65.2153836074904100,"parada":true,"codigoParada":"av rep libano y plazoleta mitre","descripcionParada":"Av. Rep. Libano y Plazoleta Mitre"},{"latitud":-26.8160950503476880,"longitud":-65.2155622972021000,"parada":false,"codigoParada":"","descripcionParada":"Plazoleta Mitre"},{"latitud":-26.8165417512116980,"longitud":-65.2133360633899600,"parada":true,"codigoParada":"av sarmiento y suipacha","descripcionParada":"Av. Sarmiento y Suipacha"},{"latitud":-26.8176098507313550,"longitud":-65.2076912507006900,"parada":false,"codigoParada":"","descripcionParada":"Av. Sarmiento"},{"latitud":-26.8182018664113070,"longitud":-65.2079860249001800,"parada":true,"codigoParada":"av salta y santa fe","descripcionParada":"Av. Salta 876"},{"latitud":-26.8208683894843200,"longitud":-65.2086266015878000,"parada":true,"codigoParada":"av salta y corrientes","descripcionParada":"Av. Salta y Corrientes"},{"latitud":-26.8236169919427000,"longitud":-65.2093741846543800,"parada":true,"codigoParada":"salta y san juan","descripcionParada":"Salta y San Juan"},{"latitud":-26.8253136665311370,"longitud":-65.2099531548571900,"parada":true,"codigoParada":"salta y cordoba","descripcionParada":"Salta y Cordoba"},{"latitud":-26.8281816273430070,"longitud":-65.2106335599227300,"parada":true,"codigoParada":"salta y san martin","descripcionParada":"PC: Salta y San Martin"},{"latitud":-26.8291961614515060,"longitud":-65.2107924806270900,"parada":false,"codigoParada":null,"descripcionParada":"Salta y 24 de Septiembre"},{"latitud":-26.8304194428099160,"longitud":-65.2111025098324900,"parada":true,"codigoParada":"jujuy y crisostomo alvarez","descripcionParada":"Jujuy y Cris�stomo Alvarez"},{"latitud":-26.8335759143379460,"longitud":-65.2119130681164300,"parada":true,"codigoParada":"jujuy y las piedras","descripcionParada":"Jujuy y Piedras"},{"latitud":-26.8369514869283560,"longitud":-65.2127282192405300,"parada":true,"codigoParada":"jujuy y lavalle","descripcionParada":"Jujuy y Lavalle"},{"latitud":-26.8400195394500470,"longitud":-65.2134699888529000,"parada":true,"codigoParada":"jujuy y rondeau","descripcionParada":"Jujuy y Rondeau"},{"latitud":-26.8418118286717870,"longitud":-65.2139506669995400,"parada":false,"codigoParada":"","descripcionParada":"Jujuy y Av. Roca"},{"latitud":-26.8421604805509000,"longitud":-65.2137943655790300,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8432503101154650,"longitud":-65.2141342771174700,"parada":true,"codigoParada":"jujuy y alsina","descripcionParada":"Jujuy y Alsina"},{"latitud":-26.8449824048000740,"longitud":-65.2146147803074700,"parada":true,"codigoParada":"jujuy y la plata","descripcionParada":" Jujuy y La Plata"},{"latitud":-26.8474061081648720,"longitud":-65.2151463717733300,"parada":false,"codigoParada":null,"descripcionParada":null},{"latitud":-26.8475260843557900,"longitud":-65.2146458426947600,"parada":true,"codigoParada":"independencia y jujuy","descripcionParada":"Independencia y Jujuy"},{"latitud":-26.8479459442989740,"longitud":-65.2124467292969600,"parada":true,"codigoParada":" av independencia y chacabuco","descripcionParada":" Av. Independencia y Chacabuco"},{"latitud":-26.8480315094764740,"longitud":-65.2120871855253000,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8493212397382240,"longitud":-65.2125092734796100,"parada":true,"codigoParada":"chacabuco y larrea","descripcionParada":"Chacabuco y Larrea"},{"latitud":-26.8506010260133700,"longitud":-65.2126948279361300,"parada":true,"codigoParada":"chacabuco y matheu","descripcionParada":"Chacabuco y Matheu"},{"latitud":-26.8509030723755480,"longitud":-65.2127642082403300,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8512729871265950,"longitud":-65.2113410621289000,"parada":true,"codigoParada":"matheu y buenos aires","descripcionParada":"Matheu y Buenos Aires"},{"latitud":-26.8516638955765860,"longitud":-65.2096781056078100,"parada":true,"codigoParada":" matheu y 9 de julio","descripcionParada":" Matheu y 9 de Julio"},{"latitud":-26.8529649165571340,"longitud":-65.2099615521593100,"parada":true,"codigoParada":"9 de julio y f garcia","descripcionParada":"9 de Julio y F. Garcia"},{"latitud":-26.8542146009279750,"longitud":-65.2102865225312200,"parada":true,"codigoParada":"9 de julio y malabia","descripcionParada":"9 de Julio y Malabia"},{"latitud":-26.8553715689644650,"longitud":-65.2105104741522700,"parada":true,"codigoParada":"9 de julio y lavaisse","descripcionParada":"9 de Julio y Lavaisse"},{"latitud":-26.8566945395858000,"longitud":-65.2108205033576700,"parada":true,"codigoParada":"9 de julio e inca garcilazo","descripcionParada":"9 de Julio e Inca Garcilazo"},{"latitud":-26.8580566486538040,"longitud":-65.2111736440242600,"parada":true,"codigoParada":"9 de julio y a vespucio","descripcionParada":" 9 de Julio y Av. Americo Vespucio"},{"latitud":-26.8605910694689170,"longitud":-65.2117980435318400,"parada":true,"codigoParada":"j j olleros y 9 de julio","descripcionParada":" PC: J. J. Olleros y 9 de Julio"},{"latitud":-26.8607519944709800,"longitud":-65.2102959540262500,"parada":true,"codigoParada":"j j olleros y congreso","descripcionParada":"J. J. Olleros y Congreso"},{"latitud":-26.8612285096092370,"longitud":-65.2083797494194900,"parada":true,"codigoParada":"j j olleros y las heras","descripcionParada":"J. J. Olleros y Las Heras"},{"latitud":-26.8615245340819760,"longitud":-65.2069527515620100,"parada":true,"codigoParada":"j j olleros y moreno","descripcionParada":"J. J. Olleros y Moreno"},{"latitud":-26.8593205000698000,"longitud":-65.2062433650558000,"parada":true,"codigoParada":"moreno y a vespucio","descripcionParada":"Moreno y A. Vespucio"},{"latitud":-26.8579256646344540,"longitud":-65.2057723409714900,"parada":true,"codigoParada":"moreno e inca garcilazo","descripcionParada":"Moreno e Inca Garcilazo"},{"latitud":-26.8580563314991460,"longitud":-65.2042588555349500,"parada":true,"codigoParada":"marina alfaro e inca garcilazo","descripcionParada":"Marina Alfaro e Inca Garcilazo"},{"latitud":-26.8569911443183750,"longitud":-65.2040004999817300,"parada":true,"codigoParada":"marina alfaro y lavaisse","descripcionParada":"Marina Alfaro y Lavaisse"},{"latitud":-26.8557208161879720,"longitud":-65.2031934165407400,"parada":true,"codigoParada":"marina alfaro y malabia","descripcionParada":"Marina Alfaro y Malabia"},{"latitud":-26.8549091308223000,"longitud":-65.2029813304666400,"parada":true,"codigoParada":"marina alfaro y f garcia","descripcionParada":" Marina Alfaro y F. Garcia"},{"latitud":-26.8544992383853830,"longitud":-65.2044268883278600,"parada":true,"codigoParada":"f garcia y moreno","descripcionParada":"F. Garcia y Moreno"},{"latitud":-26.8542584985502940,"longitud":-65.2053964043633800,"parada":true,"codigoParada":" f garcia y entre rios","descripcionParada":" F. Garcia y Entre Rios"},{"latitud":-26.8528339745598320,"longitud":-65.2051220737236000,"parada":true,"codigoParada":"entre rios y matheu","descripcionParada":"Entre R�os y Matheu"},{"latitud":-26.8514909634843340,"longitud":-65.2046999857693100,"parada":true,"codigoParada":"entre rios y larrea","descripcionParada":"Entre R�os y Larrea"},{"latitud":-26.8500696962701900,"longitud":-65.2044794728765400,"parada":true,"codigoParada":"entre rios e independencia","descripcionParada":"Entre Rios e Independencia"},{"latitud":-26.8484267148575200,"longitud":-65.2041096790050600,"parada":true,"codigoParada":"entre rios y florida","descripcionParada":"Entre Rios y Florida"},{"latitud":-26.8472763828607200,"longitud":-65.2038950478327000,"parada":true,"codigoParada":" entre rios y la plata","descripcionParada":"Entre Rios y La Plata"},{"latitud":-26.8455604302375120,"longitud":-65.2034052639827500,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8446901588671840,"longitud":-65.2032363850486100,"parada":true,"codigoParada":"entre rios y av gral. roca","descripcionParada":"Entre Rios y Av. Gral. Roca"},{"latitud":-26.8420386111280640,"longitud":-65.2026777104671400,"parada":true,"codigoParada":"entre rios y bolivar","descripcionParada":"Entre Rios y Bolivar"},{"latitud":-26.8396104469221230,"longitud":-65.2020227786151900,"parada":true,"codigoParada":"entre rios y lamadrid","descripcionParada":"Entre Rios y Lamadrid"},{"latitud":-26.8367680846448950,"longitud":-65.2013638291790300,"parada":true,"codigoParada":"entre rios y las piedras","descripcionParada":" Entre Rios y Las Piedras"},{"latitud":-26.8346432713790720,"longitud":-65.2008768065221300,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8344648121015370,"longitud":-65.2017058983800100,"parada":false,"codigoParada":null,"descripcionParada":" San Lorenzo y Las Heras"},{"latitud":-26.8337814335004160,"longitud":-65.2046232131434900,"parada":true,"codigoParada":"san lorenzo y 9 de julio","descripcionParada":" San Lorenzo y 9 de Julio"},{"latitud":-26.8332748907125880,"longitud":-65.2069712469564700,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8325231746770180,"longitud":-65.2067531715004100,"parada":true,"codigoParada":"buenos aires y crisostomo alvarez","descripcionParada":"Buenos Aires y Crisostomo Alvarez"},{"latitud":-26.8319756007238400,"longitud":-65.2066613033123900,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8328045216016840,"longitud":-65.2028501113952900,"parada":true,"codigoParada":"crisostomo alvarez y las heras","descripcionParada":"Cris�stomo Alvarez y Las Heras"},{"latitud":-26.8333111034819400,"longitud":-65.2006087059921700,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8324136126205880,"longitud":-65.2003734770978400,"parada":true,"codigoParada":"entre rios y 24 de septiembre","descripcionParada":"Entre Rios y 24 de Septiembre"},{"latitud":-26.8305597671926960,"longitud":-65.1999445772626700,"parada":false,"codigoParada":"","descripcionParada":"PC: Monteagudo y San Martin"},{"latitud":-26.8297758784618100,"longitud":-65.1997860797491500,"parada":true,"codigoParada":"monteagudo y mendoza","descripcionParada":"Monteagudo y Mendoza"},{"latitud":-26.8277780358163300,"longitud":-65.1992918079352400,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8265035206527040,"longitud":-65.1990206214660200,"parada":true,"codigoParada":"monteagudo y san juan","descripcionParada":"Monteagudo y San Juan"},{"latitud":-26.8251071505455270,"longitud":-65.1986765583678500,"parada":false,"codigoParada":"","descripcionParada":"Monteagudo y Santiago del Estero"},{"latitud":-26.8245400024170400,"longitud":-65.2015898651990500,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8243836600724100,"longitud":-65.2023885048992300,"parada":true,"codigoParada":"santiago y 25 de mayo","descripcionParada":"Santiago y 25 de Mayo"},{"latitud":-26.8236933344884600,"longitud":-65.2050792976134400,"parada":true,"codigoParada":"santiago y munecas","descripcionParada":"Santiago y Mu�ecas"},{"latitud":-26.8228367343685040,"longitud":-65.2089125161937300,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8221979901758760,"longitud":-65.2088679949449100,"parada":true,"codigoParada":"av salta y corrientes ","descripcionParada":"Av. Salta y Corrientes (Vuelta)"},{"latitud":-26.8190594888838270,"longitud":-65.2080073790394000,"parada":true,"codigoParada":"av salta y santa fe","descripcionParada":"Av. Salta 876"},{"latitud":-26.8175817121099240,"longitud":-65.2076974181238400,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8163309395567460,"longitud":-65.2074518193532800,"parada":true,"codigoParada":"av rep de siria y espana","descripcionParada":"Av. Rep. de Siria y Espa�a"},{"latitud":-26.8137482561613080,"longitud":-65.2068571926701600,"parada":true,"codigoParada":"av rep de siria y uruguay","descripcionParada":"(Vuelta) Av. Rep. de Siria y Uruguay"},{"latitud":-26.8122561292320200,"longitud":-65.2063959939410200,"parada":true,"codigoParada":"av rep de siria y chile","descripcionParada":"(Vuelta) Av. Rep. de Siria y Chile"},{"latitud":-26.8108267099878100,"longitud":-65.2059556447083100,"parada":true,"codigoParada":"av rep de siria y bolivia","descripcionParada":"(Vuelta) Av. Rep. de Siria y  Bolivia"},{"latitud":-26.8082554860765470,"longitud":-65.2052130020115200,"parada":true,"codigoParada":"av rep de siria y paraguay","descripcionParada":"(Vuelta) Av. Rep. de Siria y Paraguay"},{"latitud":-26.8060891201519840,"longitud":-65.2045714021130500,"parada":true,"codigoParada":"av rep de siria y ecuador","descripcionParada":"(Vuelta) Av. Rep. de Siria y Ecuador"},{"latitud":-26.8041787854726000,"longitud":-65.2040596671596000,"parada":true,"codigoParada":"av rep de siria y venezuela","descripcionParada":"(Vuelta) Av. Rep. de Siria y Venezuela"},{"latitud":-26.8023527649090000,"longitud":-65.2035683247459600,"parada":true,"codigoParada":"av rep de siria y mejico","descripcionParada":"(Vuelta) Av. Rep. de Siria y Mejico"},{"latitud":-26.8017251872861380,"longitud":-65.2034590661991000,"parada":false,"codigoParada":"","descripcionParada":"Av. Republica de Siria y M�xico"},{"latitud":-26.8006378004104630,"longitud":-65.2032261640904400,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.8001139389650600,"longitud":-65.2033526825581000,"parada":false,"codigoParada":null,"descripcionParada":" Av. Republica de Siria y Delfin Gallo"},{"latitud":-26.7992481506738830,"longitud":-65.2036619499234700,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.7961545309955120,"longitud":-65.2044614916107000,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.7948879153445780,"longitud":-65.2040928817853600,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.7952389487997780,"longitud":-65.2025249317579500,"parada":true,"codigoParada":"av. rep. de siria y madrid","descripcionParada":"Av. Rep. de Siria y Madrid"},{"latitud":-26.7937287528668050,"longitud":-65.2022202439427600,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.7936523071194480,"longitud":-65.2024925413257400,"parada":true,"codigoParada":"av f de aguirre y av rep de siria","descripcionParada":"(Vuelta) Av. F. de Aguirre y Av. Rep. de Siria"},{"latitud":-26.7925209148311400,"longitud":-65.2081313330846700,"parada":true,"codigoParada":"av f de aguirre y suipacha","descripcionParada":"Av. Fco de Aguirre y Suipacha"},{"latitud":-26.7920307734143600,"longitud":-65.2102118905231700,"parada":true,"codigoParada":"av f de aguirre y rep del libano","descripcionParada":"(Vuelta) Av. F. de Aguirre y Rep. del L�bano"},{"latitud":-26.7916559514882400,"longitud":-65.2124517015597400,"parada":true,"codigoParada":"av f de aguirre y lucas cordoba","descripcionParada":"(Vuelta) Av. F. de Aguirre y L. C�rdoba"},{"latitud":-26.7913458599026900,"longitud":-65.2138449653381500,"parada":true,"codigoParada":"av f de aguirre y asuncion","descripcionParada":"(Vuelta) Av. F. de Aguirre y Asuncion"},{"latitud":-26.7911615600081740,"longitud":-65.2149531192674900,"parada":true,"codigoParada":"av f de aguirre y san miguel","descripcionParada":"(Vuelta) Av. F. de Aguirre y San Miguel"},{"latitud":-26.7906835747947700,"longitud":-65.2172334318813800,"parada":true,"codigoParada":"av f de aguirre y paso de los andes","descripcionParada":"(Vuelta) Av. F. de Aguirre y  P. de los Andes"},{"latitud":-26.7899119004045900,"longitud":-65.2204937735438100,"parada":true,"codigoParada":"av f de aguirre y j j paso","descripcionParada":"(Vuelta) Av. F. de Aguirre y J.J. Paso"},{"latitud":-26.7894938791729620,"longitud":-65.2224851035388400,"parada":false,"codigoParada":"","descripcionParada":"PC: (Vuelta) Av. F. de Aguirre y Ej. del Norte"},{"latitud":-26.7903700049114130,"longitud":-65.2227546037186400,"parada":true,"codigoParada":"av ejercito del norte y madrid","descripcionParada":"Av. Ejercito del Norte y Madrid"},{"latitud":-26.7922711730412180,"longitud":-65.2232701114925800,"parada":true,"codigoParada":"av ejercito del norte y diagonal","descripcionParada":"Av. Ejercito del Norte y Diagonal"},{"latitud":-26.7924712482074500,"longitud":-65.2233342790972700,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.7900791869354150,"longitud":-65.2252930778127500,"parada":true,"codigoParada":"diagonal y madrid","descripcionParada":" Diagonal y Madrid"},{"latitud":-26.7889133795090150,"longitud":-65.2263993833595000,"parada":true,"codigoParada":"av. fco de aguirre y diagonal","descripcionParada":" Av. Fco de Aguirre y Diagonal"},{"latitud":-26.7882362706528560,"longitud":-65.2262217719839700,"parada":false,"codigoParada":"","descripcionParada":" "},{"latitud":-26.7877366488362500,"longitud":-65.2286147171054300,"parada":false,"codigoParada":"","descripcionParada":"Necochea (final de Recorrido)"}]}';
//const nobj = JSON.parse(json);
//console.log("nobj: ", nobj.nodos);

// global scope
var layerParadas = L.layerGroup().addTo(map); // polyline layer for the bus stops
var layerPath = L.layerGroup().addTo(map); // polyline layer for the indidual routes
var layerBuses = L.layerGroup().addTo(map); // polyline layer for the buses
var layerAllRoutes = L.featureGroup();
var polyline;
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
		layerBuses.clearLayers();
		// remove layerAllRoutes
		layerAllRoutes.remove();
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
	//
	ranColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	//console.log("paradas ranColor: ", ranColor);
	//console.log("paradas ranColor length: ", ranColor.length);
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
																		weight: 5,
																		opacity: 0.7,
																		smoothFactor: 1}).bindPopup(selectElement.options[i].text).addTo(layerAllRoutes);	
			// clear the array
			items.length = 0;
			// fit to current path
			map.fitBounds(polyline.getBounds());
		});
	}
	layerAllRoutes.addTo(map);
}

// show all routes at the same time
checkboxRutas.addEventListener("click", function(event){
	if (checkboxRutas.checked === true) {
		// cleanup
		layerParadas.clearLayers();
		layerPath.clearLayers();
		layerBuses.clearLayers();
		layerAllRoutes.remove();
		// call our function if we didn't already
		if (layerAllRoutes.getLayers().length === 0) {
			retrieveAllRoutes();
		} else {
			layerAllRoutes.addTo(map);
		}
		//retrieveAllRoutes();
	} else {
		// cleanup
		layerParadas.clearLayers();
		layerPath.clearLayers();
		layerBuses.clearLayers();
		layerAllRoutes.remove();
	}
});

// try to get the current position of the buses
function buslocation(clickedOption, busName) {
	// clear loop
	clearTimeout(busloopId);
		
	if (checkboxLimp.checked === true) { // only if the checkbox is selected
		layerParadas.clearLayers();
		console.log("inside checboxlimp so should be true!");
	}
	
	let cbus = clickedOption;
	console.log("hi! buses locations");

	// retrieve current location
	fetch('https://tucuman.miredbus.com.ar/rest/posicionesBuses/' + clickedOption, {
		method: 'GET',
		header: {
			'Origin': 'https://tucuman.miredbus.com.ar',
			'Accept': 'application/json',
		},
		mode: 'cors'
	})
	.then(function(response) { return response.json(); })
	.then(function(json) {
		// already parsed, no need for JSON.parse(json)
		objBusLoc = json;

		// clean the layer before displaying it again 
		// better no for advanced
		//layerBuses.clearLayers();
		
		// display the location of all the buses
		for (var key in Object.values(objBusLoc.posiciones)) {
			//console.log("Interno: " + Object.values(objBusLoc.posiciones[key])[0]);
			//console.log("Latitud: " + Object.values(objBusLoc.posiciones[key])[1]);
			//console.log("Longitud: " + Object.values(objBusLoc.posiciones[key])[2]);
			//console.log("Orientacion: " + Object.values(objBusLoc.posiciones[key])[3]);
			//console.log("Proxima Parada: " + Object.values(objBusLoc.posiciones[key])[4]);
			
			let latLng = L.latLng([Object.values(objBusLoc.posiciones[key])[1], Object.values(objBusLoc.posiciones[key])[2]]);
			L.marker(latLng, {icon: busIcon, zIndexOffset: 9999}).addTo(layerBuses).bindPopup("Colectivo: " + busName + "<br> Interno: " + Object.values(objBusLoc.posiciones[key])[0] + "<br> Próxima parada: " + Object.values(objBusLoc.posiciones[key])[4]);
			// add bus direction
			L.marker(latLng, {rotationAngle: Object.values(objBusLoc.posiciones[key])[3], rotationOrigin: "center", icon: directionIcon, zIndexOffset: 9998}).addTo(layerBuses);
		}
	});
//busloopId = setTimeout( () => {buslocation(cbus);}, 15000); // 15 secs is enough, lets be nice --- NO UPDATES
}
