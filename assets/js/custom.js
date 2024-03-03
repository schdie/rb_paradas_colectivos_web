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

// red bus json
const json = '{"error":0,"grupos":{"codGrupo":"Grupos de Lineas","subGrupos":[{"codGrupo":"Urbano","subGrupos":[{"codGrupo":"Linea 1","subGrupos":null,"lineas":[{"codLinea":"1","descripcion":"Linea 1 - Sal"},{"codLinea":"7","descripcion":"Linea 1 - Mitre"}]},{"codGrupo":"Linea 3","subGrupos":null,"lineas":[{"codLinea":"3","descripcion":"Linea 3 - Lavalle"},{"codLinea":"4","descripcion":"Linea 3 - Piedras"}]},{"codGrupo":"Linea 4","subGrupos":null,"lineas":[{"codLinea":"5","descripcion":"Linea 4 - Colombres"},{"codLinea":"6","descripcion":"Linea 4 - Mercofr"}]},{"codGrupo":"Linea 5","subGrupos":null,"lineas":[{"codLinea":"16","descripcion":"Linea 5 - El Molino"},{"codLinea":"17","descripcion":"Linea 5 - Agrimensor - Balcarce"},{"codLinea":"18","descripcion":"Linea 5 - Oeste - 25 de Mayo"},{"codLinea":"19","descripcion":"Linea 5 - B Oeste x Santiago"}]},{"codGrupo":"Linea 6","subGrupos":null,"lineas":[{"codLinea":"20","descripcion":"Linea 6 - Crisostomo Alvarez - San Alberto"},{"codLinea":"21","descripcion":" Linea 6 Democraci"}]},{"codGrupo":"Linea 7","subGrupos":null,"lineas":[{"codLinea":"22","descripcion":"Linea 7 - O Connor"},{"codLinea":"23","descripcion":"Linea 7 - AGET"}]},{"codGrupo":"Linea 8","subGrupos":null,"lineas":[{"codLinea":"24","descripcion":"Linea 8 - El Bosque"},{"codLinea":"25","descripcion":"Linea 8 - Muñecas-Kennedy"}]},{"codGrupo":"Linea 9","subGrupos":null,"lineas":[{"codLinea":"26","descripcion":"Linea 9 - Bulnes"},{"codLinea":"27","descripcion":"Linea 9 - Viamonte"}]},{"codGrupo":"Linea 10","subGrupos":null,"lineas":[{"codLinea":"28","descripcion":"Linea 10 - Villa Amali"},{"codLinea":"29","descripcion":"Linea 10 - San Cayetano"}]},{"codGrupo":"Linea 11","subGrupos":null,"lineas":[{"codLinea":"400","descripcion":"Linea 11 - 11 de Marzo"},{"codLinea":"401","descripcion":"Linea 11 Villa Angeli"},{"codLinea":"402","descripcion":"Linea 11 - Manantial Sur"}]},{"codGrupo":"Linea 12","subGrupos":null,"lineas":[{"codLinea":"32","descripcion":"Linea 12 Municipal"},{"codLinea":"33","descripcion":"Linea 12 SMATA"}]},{"codGrupo":"Linea 17","subGrupos":null,"lineas":[{"codLinea":"34","descripcion":"Linea 17 - Alem - Uni"},{"codLinea":"35","descripcion":"Linea 17 - Los Chañaritos"},{"codLinea":"36","descripcion":"Linea 17 - Bº Teran - AGEF"},{"codLinea":"37","descripcion":"Linea 17 - Bº Teran - San Lorenzo"},{"codLinea":"38","descripcion":"Linea 17 - Roca - Univer"}]},{"codGrupo":"Linea 18","subGrupos":null,"lineas":[{"codLinea":"39","descripcion":"Linea 18 - Anti-horario"},{"codLinea":"40","descripcion":"Linea 18 - Horario"}]},{"codGrupo":"Linea 19","subGrupos":null,"lineas":[{"codLinea":"41","descripcion":"Linea 19 Anti-horario"},{"codLinea":"42","descripcion":"Linea 19 Horario"}]}],"lineas":null},{"codGrupo":"InterUrbano","subGrupos":[{"codGrupo":"Linea 100","subGrupos":null,"lineas":[{"codLinea":"100","descripcion":"Linea 100 - San Pablo"},{"codLinea":"101","descripcion":"Linea 100 - Esc. Agricultur"},{"codLinea":"102","descripcion":"Linea 100 - Castillo - Sta. Fe"},{"codLinea":"103","descripcion":"Linea 100 - Castillo - Gral. Paz"},{"codLinea":"104","descripcion":"Linea 100 - Avellaned"}]},{"codGrupo":"Linea 101","subGrupos":null,"lineas":[{"codLinea":"107","descripcion":"Linea 101 - Lomas de Tafi"},{"codLinea":"108","descripcion":"Linea 101 - Lomas de Tafi 2"},{"codLinea":"109","descripcion":"Linea 101 - Los Pocitos"},{"codLinea":"110","descripcion":"Linea 101- El Grafico"},{"codLinea":"111","descripcion":"Linea 101- Los Nogales"},{"codLinea":"112","descripcion":"Linea 101- SOEME"}]},{"codGrupo":"Linea 102","subGrupos":null,"lineas":[{"codLinea":"115","descripcion":"Linea 102 - Horco Molle"},{"codLinea":"116","descripcion":"Linea 102 - La Rinconad"},{"codLinea":"117","descripcion":"Linea 102 - Los Pinos"}]},{"codGrupo":"Linea 103","subGrupos":null,"lineas":[{"codLinea":"119","descripcion":"Linea 103 - Manantial - EXP"}]},{"codGrupo":"Linea 105","subGrupos":null,"lineas":[{"codLinea":"121","descripcion":"Linea 105 - Unsta - Las Talitas"}]},{"codGrupo":"Linea 106","subGrupos":null,"lineas":[{"codLinea":"122","descripcion":"Linea 106 -P. Me"},{"codLinea":"123","descripcion":"Linea 106 - Vial 2"}]},{"codGrupo":"Linea 107","subGrupos":null,"lineas":[{"codLinea":"127","descripcion":"Linea 107- El Grafico"},{"codLinea":"128","descripcion":"Linea 107- El Sol"}]},{"codGrupo":"Linea 109","subGrupos":null,"lineas":[{"codLinea":"130","descripcion":"Linea 109-Lomas del Tafí"}]},{"codGrupo":"Linea 110","subGrupos":null,"lineas":[{"codLinea":"133","descripcion":"Linea 110 - Manantial"}]},{"codGrupo":"Linea 118","subGrupos":null,"lineas":[{"codLinea":"134","descripcion":"Linea 118 - APUNT"},{"codLinea":"135","descripcion":"Linea 118- 200 Viviendas"},{"codLinea":"136","descripcion":"Linea 118- La Rinconad"},{"codLinea":"137","descripcion":"Linea 118- Pie del Cerro"},{"codLinea":"138","descripcion":"Linea 118- Zona Sur-Los Pinos"}]},{"codGrupo":"Linea 121","subGrupos":null,"lineas":[{"codLinea":"150","descripcion":"Linea 121 Alderetes-Los Gutierrez"},{"codLinea":"151","descripcion":"Linea 121 hospital del Este"},{"codLinea":"152","descripcion":"Linea 121-Aeropuerto"},{"codLinea":"153","descripcion":"Linea 121 Alderetes-Casco urbano"}]},{"codGrupo":"Linea 122","subGrupos":null,"lineas":[{"codLinea":"155","descripcion":"Linea 122 Alderetes-El Talar"},{"codLinea":"156","descripcion":"Linea 122 Alderetes-La Cienag"},{"codLinea":"157","descripcion":"Linea 122 Alderetes-Los Gutierrez"},{"codLinea":"158","descripcion":"Linea 122-Piedritas"},{"codLinea":"159","descripcion":"Linea 122-Rincon del Este"},{"codLinea":"160","descripcion":"Linea 122-San Jorge"}]},{"codGrupo":"Linea 123","subGrupos":null,"lineas":[{"codLinea":"165","descripcion":"Linea 123- Lasteni"},{"codLinea":"166","descripcion":"Linea 123- Pacará"},{"codLinea":"167","descripcion":"Linea 123- VLasteni"}]},{"codGrupo":"Linea 124","subGrupos":null,"lineas":[{"codLinea":"170","descripcion":"Linea 124 - Alderetes - T"},{"codLinea":"171","descripcion":"Linea 124 - B. Victori"},{"codLinea":"172","descripcion":"Linea 124- Las Piedritas Directo"}]},{"codGrupo":"Linea 125","subGrupos":null,"lineas":[{"codLinea":"175","descripcion":"Linea 125 - Aeropuerto"},{"codLinea":"176","descripcion":"Linea 125- Santo Cristo"}]},{"codGrupo":"Linea 129","subGrupos":null,"lineas":[{"codLinea":"180","descripcion":"Linea 129- Flecha Bus"},{"codLinea":"181","descripcion":"Linea 129- Hospital del Este"}]},{"codGrupo":"Linea 130","subGrupos":null,"lineas":[{"codLinea":"185","descripcion":"Linea 130 - Ruta 9"},{"codLinea":"186","descripcion":"Linea 130 - San Jose"}]},{"codGrupo":"Linea 131","subGrupos":null,"lineas":[{"codLinea":"190","descripcion":"Linea 131- TV Diagonal"},{"codLinea":"191","descripcion":"Linea 131- TV-Karamaneff"},{"codLinea":"192","descripcion":"Linea 131-L. TAFI"}]},{"codGrupo":"Linea 140","subGrupos":null,"lineas":[{"codLinea":"200","descripcion":"Linea 140-TCM-Las Cantinas"}]},{"codGrupo":"Linea 141","subGrupos":null,"lineas":[{"codLinea":"205","descripcion":"Linea 141- Los Aguirres"},{"codLinea":"206","descripcion":"Linea 141- Policial IV"}]},{"codGrupo":"Linea 142","subGrupos":null,"lineas":[{"codLinea":"210","descripcion":"Linea 142 - Lomas de Tafi"}]},{"codGrupo":"Linea 214","subGrupos":null,"lineas":[{"codLinea":"211","descripcion":"Linea 214 - Los Fresnos"}]},{"codGrupo":"Linea 414","subGrupos":null,"lineas":[{"codLinea":"221","descripcion":"Linea 414 - San Andres"}]},{"codGrupo":"El Provincial","subGrupos":null,"lineas":[{"codLinea":"611","descripcion":"El Provincial - Rinconad"},{"codLinea":"612","descripcion":"El Provincial - San Pablo"}]}],"lineas":null},{"codGrupo":"Rural","subGrupos":null,"lineas":[{"codLinea":"299","descripcion":"San Javier"},{"codLinea":"300","descripcion":"Tucuman - Los Perez"},{"codLinea":"301","descripcion":"Tucuman - El Sunchal"},{"codLinea":"302","descripcion":"Tucuman - El Diamante"},{"codLinea":"303","descripcion":"Tucuman - Cruz de  Arrib"},{"codLinea":"304","descripcion":"Tucuman - Cañete"},{"codLinea":"305","descripcion":"Tucuman - Cañada Alzogaray"},{"codLinea":"306","descripcion":"Tucuman  - La Mar"},{"codLinea":"307","descripcion":"Santa Rosa de Leales"},{"codLinea":"308","descripcion":"Los Sueldos"}]}],"lineas":null}}';
const obj = JSON.parse(json);

// urbanos
const urbanos = obj.grupos.subGrupos[0].subGrupos;
console.log(obj.grupos.subGrupos[0].subGrupos);
console.log(urbanos.length);

// interurbanos
const interurbanos = obj.grupos.subGrupos[1].subGrupos;
console.log(obj.grupos.subGrupos[1].subGrupos);
console.log(interurbanos.length);

// rurales
const rurales = obj.grupos.subGrupos[2].lineas;
console.log(obj.grupos.subGrupos[2].lineas);
console.log(rurales.length);

for (var key in Object.values(urbanos)) {
	//console.log("codLinea: ", Object.values(urbanos[key])[2]);
	//console.log("codLinea: ", Object.values(urbanos[key])[2][0]);
	for (var yek in Object.values(urbanos[key])[2]) {
		console.log("urbanos inception: ", Object.values(urbanos[key])[2][yek].codLinea);
		console.log("urbanos inception: ", Object.values(urbanos[key])[2][yek].descripcion);
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

// on user selection get the selected value and display the bus stops
var selectElement = document.getElementById('sel');

selectElement.addEventListener("click", function(event){
	let clickedOption = selectElement.value;
	console.log(clickedOption);
});