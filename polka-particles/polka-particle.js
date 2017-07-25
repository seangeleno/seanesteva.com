<<<<<<< HEAD
Vector2=function(a,b){return this.x=a||0,this.y=b||0,this},Vector2.prototype.add=function(a){return this.x+=a.x,this.y+=a.y,this},Vector2.prototype.sub=function(a){return"object"==typeof a&&(this.x-=a.x,this.y-=a.y),"number"==typeof a&&(this.x-=a,this.y-=a),this},Vector2.prototype.mult=function(a){return"object"==typeof a?(this.x*=a.x,this.y*=a.y):"number"==typeof a&&(this.x*=a,this.y*=a),this},Vector2.prototype.div=function(a){return"object"==typeof a?(this.x/=a.x,this.y/=a.y):"number"==typeof a&&(this.x/=a,this.y/=a),this},Vector2.prototype.norm=function(){return this.div(this.mag()),this},Vector2.prototype.setMag=function(a){return this.norm(),this.mult(a),this},Vector2.prototype.limit=function(a){return this.mag()>a?(this.setMag(a),this):this},Vector2.prototype.direction=function(a){return Math.atan2(this.y,this.x)},Vector2.prototype.rotate=function(a){var b=this.direction()+a,c=this.mag();return this.x=Math.cos(b)*c,this.y=Math.sin(b)*c,this},Vector2.prototype.mag=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},Vector2.prototype.angleTo=function(a){var b=Math.atan2(a.x-this.x,a.y-this.y);return b},Vector2.prototype.distanceTo=function(a){return Math.sqrt(Math.pow(a.x-this.x,2)+Math.pow(a.y-this.y,2))},Vector2.prototype.copy=function(){return new Vector2(this.x,this.y)},Vector2.prototype.set=function(){var a=arguments;return 1==a.length?"object"==typeof a[0]?(this.x=a[0].x,this.y=a[0].y):"number"==typeof a[0]&&(this.x=a[0],this.y=a[0]):2==a.length&&(this.x=a[0],this.y=a[1]),this},Vector2.prototype.map=function(a,b,c,d){return a<this.x<b&&c<this.y<d?this:(this.x<a?this.x=a:this,this.x>b?this.x=b:this,this.y<c?this.y=c:this,void(this.y>d?this.y=d:this))},Math.radians=function(a){return a*(Math.PI/180)},Math.degrees=function(a){return a*(180/Math.PI)},random=function(){if(!arguments)return Math.random();var a=arguments;return 1==a.length?Math.random()*a[0]:2==a.length?Math.random()*(Math.max(a[0],a[1])-Math.min(a[0],a[1]))+Math.min(a[0],a[1]):void 0},random=function(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))};
(function() {
	var canvasBody = document.getElementById("canvas"),
		canvas = canvasBody.getContext("2d"),
		w = (canvasBody.width = window.innerWidth),
		h = (canvasBody.height = window.innerHeight),
		pi2 = Math.PI * 2,
		tick = 0,
		opts = {
			canvas: {
				backgroundColor: "#222"
			},
			affRad: 50,
			size: 5,
			spacing: 20,
			color: "#fcfcfc",
			speedLimit: 5,
			showFPS: false,
			populate: function() {
				var spacing = opts.spacing;
				particles = [];
				for (var x = spacing / 2; x < w; x += spacing) {
					for (var y = spacing / 2; y < h; y += spacing) {
						particles.push(new Particle(x, y));
					}
				}
			}
		},
		Colors = [
			"#2ecc71", //green
			"#3498db", //blue
			"#e67e22", //orange
			"#e74c3c", //red
			"#ecf0f1", //white
			"#9b59b6", //purple
			"#2c3e50" //night-blue
		],
		gui = new dat.GUI(),
		particles = [],
		Mouse = new Vector2(w / 2, h / 2),
		Particle = function(X, Y) {
			this.pos = new Vector2(X || 0, Y || 0);
			this.speed = new Vector2();
			this.acc = new Vector2();
			this.color = Colors[Math.floor(Math.random() * Colors.length)];
		};
	Particle.prototype.update = function() {
		this.border();
		this.speed.add(this.acc);
		this.pos.add(this.speed);
		this.acc.set(0);

		return this;
	};
	Particle.prototype.border = function() {
		0 > this.pos.x ? ((this.speed.x *= -1), (this.pos.x = 0)) : undefined;
		w < this.pos.x
			? ((this.speed.x *= -1), (this.pos.x = w - opts.size))
			: undefined;
		0 > this.pos.y ? ((this.speed.y *= -1), (this.pos.y = 0)) : undefined;
		h < this.pos.y
			? ((this.speed.y *= -1), (this.pos.y = h - opts.size))
			: undefined;
	};
	Particle.prototype.force = function(f) {
		var tar = f.copy();
		this.acc.add(tar);
		return this;
	};
	Particle.prototype.runAway = function(t) {
		if (this.pos.distanceTo(t) < opts.affRad) {
			var tar = t.copy();
			tar.sub(this.pos);
			tar.mult(-1);
			var desired = tar.sub(this.speed);
			tar.limit(opts.speedLimit);
			this.force(desired);
		}
		this.speed.limit(opts.speedLimit);
		this.speed.div(1.05);
		return this;
	};
	Particle.prototype.render = function() {
		var size = opts.size;
		canvas.fillStyle = this.color;
		canvas.beginPath();
		canvas.arc(this.pos.x, this.pos.y, opts.size, 0, pi2);
		canvas.fill();
		//canvas.fillRect(this.pos.x, this.pos.y, size, size);
		return this;
	};
	function setup() {
		//SETING UP FOR MOBILE
		if (w < 768) {
			opts.spacing = 11;
			opts.size = 5;
			opts.affRad = 35;
			gui.close();
		}
		opts.populate();

		stats = new Stats();
		stats.showPanel(0);
		gui.add(opts, "size", 0.5, 100);
		gui.add(opts, "spacing", opts.size, 200).onFinishChange(opts.populate);
		gui.add(opts, "affRad", 10, Math.min(w, h) / 2);
		gui.add(opts, "showFPS");
		gui.add(opts, "populate").name("reset()");
		stats.domElement.className = "ST";
		document.body.appendChild(stats.domElement);
		window.requestAnimationFrame(loop);
	}
	function loop() {
		stats.begin();
		canvas.fillStyle = opts.canvas.backgroundColor;
		canvas.fillRect(0, 0, w, h);
		particles.map(function(P) {
			P.runAway(Mouse).update().render();
		});
		opts.showFPS
			? (document.querySelector(".ST").style.display = "block")
			: (document.querySelector(".ST").style.display = "none");
		window.requestAnimationFrame(loop);
		stats.end();
	}
	setup();

	window.addEventListener("resize", function() {
		w = canvasBody.width = window.innerWidth;
		h = canvasBody.height = window.innerHeight;
		opts.populate();
	});
	canvasBody.addEventListener("mousemove", function(e) {
		Mouse.x = e.pageX;
		Mouse.y = e.pageY;
	});
	canvasBody.addEventListener("touchstart", function(e) {
		e.preventDefault();
		var touches = e.changedTouches;
		Mouse.set(touches[0].pageX, touches[0].pageY);
	});
	canvasBody.addEventListener("touchmove", function(e) {
		var touches = e.changedTouches;
		Mouse.set(touches[0].pageX, touches[0].pageY);
	});
	canvasBody.addEventListener("touchend", function(e) {
		Mouse.set(-opts.affRad, -opts.affRad);
	});
})();

=======
(function () {
    const particles;
    const Particle = function (X, Y) {
        this.pos = new Vector2(X || 0, Y || 0);
        this.speed = new Vector2();
        this.acc = new Vector2();
        this.color = Colors[Math.floor(Math.random() * Colors.length)];
    };
    const canvasBody = document.getElementById("canvas"),
        canvas = canvasBody.getContext("2d"),
        w = (canvasBody.width = window.innerWidth),
        h = (canvasBody.height = window.innerHeight),
        pi2 = Math.PI * 2,
        tick = 0,
        opts = {
            canvas: {
                backgroundColor: "#222"
            },
            affRad: 50,
            size: 5,
            spacing: 20,
            color: "#fcfcfc",
            speedLimit: 5,
            showFPS: false,
            populate: function () {
                const spacing = opts.spacing;
                particles = [];
                for (let x = spacing / 2; x < w; x += spacing) {
                    for (let y = spacing / 2; y < h; y += spacing) {
                        particles.push(new Particle(x, y));
                    }
                }
            }
        },
        Colors = [
            "#2ecc71", //green
            "#3498db", //blue
            "#e67e22", //orange
            "#e74c3c", //red
            "#ecf0f1", //white
            "#9b59b6", //purple
            "#2c3e50" //night-blue
        ],
        gui = new dat.GUI();
    particles = [];
    const Mouse = new Vector2(w / 2, h / 2);
    Particle.prototype.update = function () {
        this.border();
        this.speed.add(this.acc);
        this.pos.add(this.speed);
        this.acc.set(0);

        return this;
    };
    Particle.prototype.border = function () {
        0 > this.pos.x ? ((this.speed.x *= -1), (this.pos.x = 0)) : undefined;
        w < this.pos.x
            ? ((this.speed.x *= -1), (this.pos.x = w - opts.size))
            : undefined;
        0 > this.pos.y ? ((this.speed.y *= -1), (this.pos.y = 0)) : undefined;
        h < this.pos.y
            ? ((this.speed.y *= -1), (this.pos.y = h - opts.size))
            : undefined;
    };
    Particle.prototype.force = function (f) {
        const tar = f.copy();
        this.acc.add(tar);
        return this;
    };
    Particle.prototype.runAway = function (t) {
        if (this.pos.distanceTo(t) < opts.affRad) {
            const tar = t.copy();
            tar.sub(this.pos);
            tar.mult(-1);
            const desired = tar.sub(this.speed);
            tar.limit(opts.speedLimit);
            this.force(desired);
        }
        this.speed.limit(opts.speedLimit);
        this.speed.div(1.05);
        return this;
    };
    Particle.prototype.render = function () {
        const size = opts.size;
        canvas.fillStyle = this.color;
        canvas.beginPath();
        canvas.arc(this.pos.x, this.pos.y, opts.size, 0, pi2);
        canvas.fill();
        //canvas.fillRect(this.pos.x, this.pos.y, size, size);
        return this;
    };
    function setup() {
        //SETING UP FOR MOBILE
        if (w < 768) {
            opts.spacing = 11;
            opts.size = 5;
            opts.affRad = 35;
            gui.close();
        }
        opts.populate();

        stats = new Stats();
        stats.showPanel(0);
        gui.add(opts, "size", 0.5, 100);
        gui.add(opts, "spacing", opts.size, 200).onFinishChange(opts.populate);
        gui.add(opts, "affRad", 10, Math.min(w, h) / 2);
        gui.add(opts, "showFPS");
        gui.add(opts, "populate").name("reset()");
        stats.domElement.className = "ST";
        document.body.appendChild(stats.domElement);
        window.requestAnimationFrame(loop);
    }

    function loop() {
        stats.begin();
        canvas.fillStyle = opts.canvas.backgroundColor;
        canvas.fillRect(0, 0, w, h);
        particles.map(function (P) {
            P.runAway(Mouse).update().render();
        });
        opts.showFPS
            ? (document.querySelector(".ST").style.display = "block")
            : (document.querySelector(".ST").style.display = "none");
        window.requestAnimationFrame(loop);
        stats.end();
    }

    setup();

    window.addEventListener("resize", function () {
        w = canvasBody.width = window.innerWidth;
        h = canvasBody.height = window.innerHeight;
        opts.populate();
    });
    canvasBody.addEventListener("mousemove", function (e) {
        Mouse.x = e.pageX;
        Mouse.y = e.pageY;
    });
    canvasBody.addEventListener("touchstart", function (e) {
        e.preventDefault();
        const touches = e.changedTouches;
        Mouse.set(touches[0].pageX, touches[0].pageY);
    });
    canvasBody.addEventListener("touchmove", function (e) {
        const touches = e.changedTouches;
        Mouse.set(touches[0].pageX, touches[0].pageY);
    });
    canvasBody.addEventListener("touchend", function (e) {
        Mouse.set(-opts.affRad, -opts.affRad);
    });
})();
>>>>>>> c8cc585ce3788fa354a3928fe84d9a826427c231
