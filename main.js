let random_color_clicked = true;
let color;
let drawing = false;

const random = (range) => Math.floor(Math.random() * range);

const randomColor = () => 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';

const updateCurrentColor = selectedColor =>{
	color = selectedColor;
	changeBackgroundColor('current-color', color);
}

const changeBackgroundColor = function (id, color) {
	let element = document.getElementById(id);
	element.setAttribute('style', 'background-color: ' + color);
};

const chooseRandomColor = function () {
	random_color_clicked = !random_color_clicked;
	let interval = setInterval(function () {
		color = randomColor();
		updateCurrentColor(color);
		if(random_color_clicked) {
			clearInterval(interval);
		}
	}, 100);
};

const createBoard = function () {
	let max = 140;
	let table = `<table
	class=canvas
	onclick='sratrOrStopDrawing()'
	onmousemove='draw(event.target)'>
	<tbody>`;
	let id = 0;
	for(let x = 0; x < max; x++){
		table += '<tr>';
		for(let y = 0; y < max; y++){
			table += '<td id='+ (id++) +	'></td>';
		}
		table += '</tr>';
	}
	table += '</tbody></table>';
	return table;
};

window.onload = function () {
	document.getElementById('board_container').innerHTML += createBoard();
};

const sratrOrStopDrawing = function () {
	drawing = !drawing;
};

const draw = function (pixel) {
	if(pixel.id != "" && drawing){
		changeBackgroundColor(pixel.id, color);
	}
};

const updateColorByValue = function (id) {
	let selectedColor = document.getElementById(id).value;
	updateCurrentColor(selectedColor);
};
