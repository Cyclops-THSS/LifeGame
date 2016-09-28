/*global $, console*/
/*exported g_renderer*/
var g_renderer = (function () {
	var ctx, side, sep, dimension,
		color = {
			'black': '#000000',
			'white': '#FFFFFF'
		};

	function resizeCanvas() {
		side = Math.min($('#canvas-container').width(), $('#canvas-container').height()) * 0.9;
		$('.canvas')[0].width = $('.canvas')[0].height = side;
		sep = side / dimension;
		clear();
	}

	$(window).on('resize', resizeCanvas);
	$(document).ready(function () {
		ctx = $('.canvas')[0].getContext('2d');
		resizeCanvas();
	});

	function setDimension(dim) {
		if (dim === dimension) {
			return;
		}
		dimension = dim;
		sep = side / dim;
	}

	function clear() {
		ctx.fillStyle = color.white;
		ctx.fillRect(0, 0, side, side);
		drawGridlines();
	}

	function drawGridlines() {
		ctx.setLineDash([5]);
		for (var i = 1; i < dimension; i++) {
			ctx.beginPath();
			ctx.moveTo(0, i * sep);
			ctx.lineTo(side, i * sep);
			ctx.moveTo(i * sep, 0);
			ctx.lineTo(i * sep, side);
			ctx.stroke();
		}
	}

	function fillCell(i, j, c) {
		if (c === 'white')
			return;
		ctx.fillStyle = color[c];
		ctx.fillRect(j * sep, i * sep, sep, sep);
	}

	function render(d) {
		setDimension(d.length);
		clear();
		for (var i = 0; i < d.length; i++)
			for (var j = 0; j < d[i].length; j++)
				fillCell(i, j, d[i][j] ? 'black' : 'white');
	}

	return {
		test: {
			resizeCanvas: resizeCanvas,
			setDimension: setDimension,
			clear: clear,
			drawGridlines: drawGridlines,
			fillCell: fillCell,
			render: render
		},
		do: render,
		sep: function () {
			return sep;
		},
		fillCell: fillCell
	};
}());
