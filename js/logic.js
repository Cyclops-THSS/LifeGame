/*global g_renderer*/
/*exported g_controller*/
var g_controller = (function () {
	var data;

	function resize(d) {
		if (d <= 0)
			return;
		data = undefined;
		data = new Array(d);
		for (var i = 0; i < d; i++) {
			data[i] = new Array(d);
			for (var j = 0; j < d; j++)
				data[i][j] = 0;
		}
	}

	function get(i, j) {
		function toPositive(a) {
			return a < 0 ? (Math.floor(-a / data.length) + 1) * data.length + a : a;
		}
		i = toPositive(i);
		j = toPositive(j);
		return data[i % data.length][j % data[0].length];
	}

	function sum(x, y) {
		var sum = 0;
		for (var i = -1; i <= 1; ++i)
			for (var j = -1; j <= 1; ++j)
				if (i !== 0 || j !== 0)
					sum += get(x + i, y + j);
		return sum;
	}

	function next(i, j) {
		var v = sum(i, j);
		return v === 3 ? 1 : (v === 2 ? data[i][j] : 0);
	}

	function update() {
		var _tmp = data.map(function (a) {
			return a.slice();
		});
		for (var i = 0; i < _tmp.length; i++)
			for (var j = 0; j < _tmp[i].length; j++)
				_tmp[i][j] = next(i, j);
		data = _tmp;
	}

	function fill(gen) {
		for (var i = 0; i < data.length; i++)
			for (var j = 0; j < data[i].length; j++)
				data[i][j] = gen();
	}

	function random(r) {
		return Math.random() < r ? 1 : 0;
	}

	function empty() {
		for (var i = 0; i < data.length; i++)
			for (var j = 0; j < data[i].length; j++)
				if (data[i][j])
					return false;
		return true;
	}

	return {
		test: {
			data: function () {
				return data;
			},
			resize: resize,
			get: get,
			assign: function (d) {
				data = d;
			},
			update: update,
			next: next,
			sum: sum,
			random: random,
			fill: fill,
			empty: empty
		},
		nextFrame: function () {
			update();
			g_renderer.do(data);
		},
		initData: function (d) {
			data = d;
			g_renderer.do(data);
		},
		initRate: function (r) {
			fill(function () {
				return random(r);
			});
			g_renderer.do(data);
		},
		initDim: function (d) {
			resize(d);
			g_renderer.do(data);
		},
		clear: function () {
			fill(function () {
				return 0;
			});
			g_renderer.do(data);
		},
		empty: empty,
		activate: function(i, j) {
			data[i][j] = 1;
			g_renderer.fillCell(i, j, 'black');
		}
	};
}());
