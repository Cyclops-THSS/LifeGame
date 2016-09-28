/*global $, g_controller, g_renderer, g_timer*/
$(document).ready(function () {
	// init with default value
	var starting = true,
		paused = false,
		picking = false;
	g_controller.initDim($('#dimension').val());
	g_timer.setInterval(1000 / $('#iter').val());
	// init over
	$('#dimension').change(function () {
		g_timer.stop();
		g_controller.initDim(this.value);
	});
	$('#iter').change(function () {
		g_timer.pause();
		g_timer.setInterval(1000 / this.value);
		if (!starting && !paused) {
			g_timer.start();
		}
	});
	$('#start').click(function () {
		if (starting) {
			g_timer.start(function () {
				starting = true;
				$('#start').html('开始');
				$('#stop').prop('class', 'col s6 waves-effect waves-light btn disabled');
			});
			starting = false;
			$('#start').html('暂停');
		} else {
			if (paused)
				g_timer.resume();
			else
				g_timer.pause();
			paused = !paused;
			$('#start').html(paused ? '继续' : '暂停');
		}
		if (picking) {
			picking = false;
		}
		$('#stop').prop('class', 'col s6 waves-effect waves-light btn');
		$('#initmode').html('初始化模式');
	});
	$('#stop').click(function () {
		starting = true;
		g_timer.stop();
		$('#start').html('开始');
		$('#stop').prop('class', 'col s6 waves-effect waves-light btn disabled');
	});
	$('#randomize').click(function () {
		g_controller.initRate($('#ratio').val());
		picking = false;
		$('#initmode').html('初始化模式');
	});
	$('#choose').click(function () {
		picking = true;
		$('#initmode').html('点选中');
	});
	$('.canvas').click(function (e) {
		if (!picking)
			return;
		var rect = this.getBoundingClientRect(),
			j = Math.floor((e.clientX - rect.left) / g_renderer.sep()),
			i = Math.floor((e.clientY - rect.top) / g_renderer.sep());
		g_controller.activate(i, j);
	});
});
