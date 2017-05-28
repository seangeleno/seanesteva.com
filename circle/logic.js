console.log("Mario Bros was here!");
var c = document.getElementById('c'),
	ctx = c.getContext('2d');

// Duration in ms
var dur = 30000;
// Parts duration in [0,1] (e.g. .65 = 65% of the animation in the square to circle transition, and 35% in the circle to square transition)
var split = .65;
// Radius in px (also half the square side length)
var size = 180;

// Set up the canvas
ctx.fillStyle = '#ccc';
// Coordinates relative to the center
ctx.translate(c.width * .5, c.height * .5);

// Scale down easing during the square to circle transition
function scaleEasing(t) {
	return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
}
// Corners easing during the circle to square transition
function circleEasing(t) {
	var sep = .3, vsep = .25;
	if(t < sep) {
		return ((t /= sep) * t * t * t) * vsep;
	} else t = (t - sep) / (1 - sep);
	return vsep + (1 - vsep) * (Math.sin(-13 * (t + 1) * Math.PI*.5) * Math.pow(2, -10 * t) + 1);
}

// Draw a square centered around a point
function fillRect(px, py, s, scale) {
	if(scale !== 0 && !scale) scale = 1; // Not specified == 1
	if(scale !== 1) {
		s *= scale; px *= scale; py *= scale;
	}
	ctx.fillRect(px - s, py - s, 2 * s, 2 * s);
}
var withSquares = (function() {
	function getDelay(n) { return (1 - 1 / (n + 1)); }
	function recurs(size, v, limit, p, q, n) {
		// Compute the size of the current square
		var factors = q ? [32,-16,-16,64] : [0,0,-4,40];
		var div = q ? 16 : 10;
		var delta = [q*p, q*q, p*p, 1].reduce((t, v, i) => t + v * factors[i], 0);
		var s = (Math.sqrt(delta) - 4 * (p + q)) / div, fs = s;
		
		// Compute the actual drawn size (progressively gets bigger)
		var x = (p + s), y = q && (q + s);
		var d = Math.sqrt(x * x + y * y);
		var delay = getDelay(n);
		var dur = getDelay(n + 4) - delay;
		var w = Math.max(v - delay, 0) / (dur) * Math.SQRT2;
		if(d > w) fs *= w / d;
		
		// ctx.fillStyle = 'hsl('+ (n * 47) +', 75%, 60%)';
		// Draw the 4 or 8 corresponding squares
		for(var i = 0, l = (q ? 0b1000 : 0b100); i < l; i++) {
			var args = [
				(p + fs) * ((i >> 1) & 1 ? 1 : -1),
				q && ((q + fs) * ((i >> 2) & 1 ? 1 : -1))
			];
			fillRect(args[i & 1], args[1 - (i & 1)], fs, size);
		}
		// If the square is big enough, continue
		if(s > limit) {
			recurs(size, v, limit, p + 2 * s, q, n + 1);
			recurs(size, v, limit, p, q ? q + 2 * s : s, n + 1);
		}
	}
	return function(size, v, limit) {
		fillRect(0, 0, 1, size);
		recurs(size, v, limit, 1, 0, 0);
	};
})();
function fillCircle(px, py, s) {
	ctx.beginPath();
	ctx.arc(px, py, s, 0, 2 * Math.PI, false);
	ctx.fill();
}
function withCircles(size, v) {
	fillCircle(0, 0, size);
	ctx.beginPath();
	for(var i = 0; i < 8; i++) {
		var a = i * Math.PI * .25;
		var d = size * (i & 1 ? 1 + v * (Math.SQRT2 - 1) : 1);
		ctx.lineTo(d * Math.cos(a), d * Math.sin(a));
	}
	ctx.fill();
}

function draw() {
	ctx.clearRect(-.5 * c.width, -.5 * c.height, c.width, c.height);
	var t = (Date.now() % dur) / dur;
	if(t <= split) {
		t = t / split;
		var scale = 1 + scaleEasing(t) * (1 / Math.SQRT2 - 1);
		var v = (Math.cos(t * Math.PI) + 1) * .5;
		withSquares(size * scale, (1 - v), .01);
		var limit = .7;
		if(t > limit) {
			var op = (t - limit) / (1 - limit);
			ctx.globalAlpha = op;
			fillCircle(0, 0, Math.SQRT2 * size * scale);
			ctx.globalAlpha = 1;
		}
	} else {
		t = (t - split) / (1 - split);
		var progress = circleEasing(t);
		withCircles(size, progress, .01);
	}
	requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
