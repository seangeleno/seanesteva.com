var t = 0, dim = 400
		c = document.querySelector("canvas"),	 
		$ = c.getContext('2d');
		c.width = c.height = dim;

function draw() {
		var foo, r;
		foo =  2 * Math.PI * Math.sin(t);
		$.fillStyle = 'hsla(210,84.6%,51.8%,.1)';
		$.fillRect(0, 0, c.width, c.height);

		for (var i=0; i<dim; ++i) {
				r = dim * Math.sin(i * foo);
				$.fillStyle = "#ffa500";
				$.beginPath();
				$.arc(Math.tan(i) * r + (c.width / 2), 
				Math.cos(i) * r + (c.height / 2), 1.5, 0, Math.PI * 2);
				$.fill();
		 }
		 
t += 0.000005;	
	
};

function run() {
		window.requestAnimationFrame(run);
		draw();
}

run();
