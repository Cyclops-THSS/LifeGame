/*global mocha, chai, describe, it, before, g_renderer, g_timer, g_controller*/
mocha.setup('bdd');
var assert = chai.assert;
describe('render unit', function () {
	var test = g_renderer.test;
	it('have function resizeCanvas', function () {
		assert.isFunction(test.resizeCanvas);
	});
	it('have function setDimension with 1 parameter', function () {
		assert.isFunction(test.setDimension);
		assert.equal(test.setDimension.length, 1);
	});
	it('have function drawGridlines', function () {
		assert.isFunction(test.drawGridlines);
	});
	it('have function clear', function () {
		assert.isFunction(test.clear);
	});
	it('have function fillCell with 3 parameters', function () {
		assert.isFunction(test.fillCell);
		assert.equal(test.fillCell.length, 3);
	});
	it('have function render with 1 parameter', function () {
		assert.isFunction(test.render);
		assert.equal(test.render.length, 1);
	});
});
describe('logic unit', function () {
	var test = g_controller.test;
	describe('data storage', function () {
		it('have function resize with 1 parameter', function () {
			assert.isFunction(test.resize);
			assert.equal(test.resize.length, 1);
		});
		it('can resize data correctly (eg. 100*100)', function () {
			test.resize(100);
			assert.equal(test.data().length, 100);
			assert.equal(test.data()[0].length, 100);
		});
	});
	describe('elements accessing', function () {
		before(function () {
			test.assign([
				[1, 2, 3],
				[2, 3, 4],
				[3, 4, 5]
			]);
		});
		it('have function get with 2 parameters', function () {
			assert.isFunction(test.get);
			assert.equal(test.get.length, 2);
		});
		it('\'get\' can access value correctly', function () {
			assert.equal(test.get(1, 1), 3);
			assert.equal(test.get(0, 2), 3);
			assert.equal(test.get(2, 2), 5);
		});
		it('\'get\' will not crash when accessing out-of-range element', function () {
			assert.equal(test.get(-1, 0), 3);
			assert.equal(test.get(0, -1), 3);
			assert.equal(test.get(3, 0), 1);
			assert.equal(test.get(0, 3), 1);
		});
		it('have function sum with 2 parameters', function () {
			assert.isFunction(test.sum);
			assert.equal(test.sum.length, 2);
		});
		it('\'sum\' can return right value', function () {
			assert.equal(test.sum(1, 1), 24);
			assert.equal(test.sum(0, 0), 26);
			assert.equal(test.sum(2, 2), 22);
		});
		it('have function random with 1 parameter', function () {
			assert.isFunction(test.random);
			assert.equal(test.random.length, 1);
		});
		it('have function fill with 1 parameter', function () {
			assert.isFunction(test.fill);
			assert.equal(test.fill.length, 1);
		});
		it('\'fill\' can fill data correctly (eg. all to zero)', function () {
			test.fill(function () {
				return 0;
			});
			assert.deepEqual(test.data(), [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			]);
		});
		it('have function empty', function() {
			assert.isFunction(test.empty);
		});
		it('\'empty\' should return true when all the elements equal 0', function() {
			assert.strictEqual(test.empty(), true);
		});
	});
	describe('gaming logic', function () {
		before(function () {
			test.assign([
				[0, 1, 0, 0],
				[1, 1, 1, 0],
				[0, 1, 0, 0],
				[0, 0, 0, 0]
			]);
		});
		it('have function next with 2 parameters', function () {
			assert.isFunction(test.next);
			assert.equal(test.next.length, 2);
		});
		it('\'next\' can make right decision', function () {
			assert.equal(test.next(0, 0), 1);
			assert.equal(test.next(1, 1), 0);
		});
		it('have function update', function () {
			assert.isFunction(test.update);
		});
		it('\'update\' can update as rule implies', function () {
			test.update();
			assert.deepEqual(test.data(), [
				[1, 1, 1, 0],
				[1, 0, 1, 0],
				[1, 1, 1, 0],
				[0, 0, 0, 0]
			]);
		});
	});
});
describe('timer unit', function () {
	var test = g_timer.test;
	it('have function setIntv with 1 parameter', function () {
		assert.isFunction(test.setIntv);
		assert.equal(test.setIntv.length, 1);
	});
	it('have function start with 1 parameter', function() {
		assert.isFunction(test.start);
		assert.equal(test.start.length, 1);
	});
	it('have function pause', function() {
		assert.isFunction(test.pause);
	});
	it('have function stop', function() {
		assert.isFunction(test.stop);
	});
});
mocha.run();
