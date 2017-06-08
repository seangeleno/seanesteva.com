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
