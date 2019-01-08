let drawing = false;
let tools = [ 'brush', 'pencil', 'eraser', 'rainbow' ];
let color, activeTool;

const random = (range) => Math.floor(Math.random() * range);

const randomColor = () => 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';

const getElement = (id) => document.getElementById(id);

const updateCurrentColor = selectedColor =>{
	color = selectedColor;
	changeBackgroundColor('current-color', color);
}

const changeBackgroundColor = function (id, color) {
	let element = getElement(id);
	element.setAttribute('style', 'background-color: ' + color);
};

const chooseRandomColor = function () {
	let interval = setInterval(function () {
		updateCurrentColor( randomColor() );
		if(activeTool != 'rainbow') {
			clearInterval(interval);
		}
	}, 100);
};

const createBoard = function () {
	let max = 140;
	let table = `<table
	class=canvas
	onclick='startTool(event.target)'
	onmousemove='draw(event.target)'>
	<tbody>`;
	for(let x = 0; x < max; x++){
		table += '<tr>';
		for(let y = 0; y < max; y++){
			let id = x + ',' + y;
			table += '<td id=' + id +	'></td>';
		}
		table += '</tr>';
	}
	table += '</tbody></table>';
	return table;
};

window.onload = function () {
	document.getElementById('board_container').innerHTML += createBoard();
	selectTool('pencil');
	updateCurrentColor('black');
};

const updateColorByValue = function (id) {
	let selectedColor = getElement(id).value;
	updateCurrentColor(selectedColor);
};

const startTool = function (pixel) {
	startOrStopDrawing();
	if(activeTool == 'brush')	
		fill(pixel);
};

const fill = function (pixel) {
	let oldColor = getElement(pixel.id).style.backgroundColor;	
	fillRegion(pixel, oldColor);
	drawing = false;
};

const startOrStopDrawing = function () {
	drawing = !drawing;
};

const draw = function (pixel) {
	if(pixel.id == "" || !drawing)	return ;
	changeBackgroundColor(pixel.id, color);
};

const fillRegion = function (pixel, oldColor) {
	let pixelColor = getElement(pixel.id).style.backgroundColor;
	if(pixelColor != oldColor) return ;
	draw(pixel);
	return getAdjuscentPixels(pixel.id).forEach(point => fillRegion(point, oldColor));
};

const getAdjuscentPixels = function (id) {
	let [x,y] = id.split(',').map(element => +element);
	let adjuscentIds = [[x+1, y], [x-1, y], [x,y+1], [x,y-1]].map(list => list.join(','));
	return adjuscentIds.map(getElement);
};

const selectTool = function (selectedTool) {
	tools.forEach( tool => getElement(tool).style.border = '0px');
	activeTool = selectedTool;
	getElement(activeTool).setAttribute('style', 'border: 2px solid red');
};
