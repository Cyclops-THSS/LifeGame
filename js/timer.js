/*global g_controller*/
/*exported g_timer*/
var g_timer = (function () {
	var id = 0, interval = 50, callback;

	function step() {
		g_controller.nextFrame();
		if (g_controller.empty()) {
			clearInterval(id);
			callback();
		}
	}

	function start(cbk) {
		callback = cbk;
		id = setInterval(step, interval);
	}

	function pause() {
		clearInterval(id);
	}

	function stop() {
		clearInterval(id);
		g_controller.clear();
		if (callback)
			callback();
	}

	function setIntv(d) {
		interval = d;
	}

	return {
		test: {
			setIntv: setIntv,
			start: start,
			pause: pause,
			stop: stop
		},
		setInterval: setIntv,
		start: start,
		resume: start,
		pause: pause,
		stop: stop
	};
})();
