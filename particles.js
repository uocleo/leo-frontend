"use strict";

const FRICTION = 0.94;
const GRAVITY = [0, 9.81];
const WIND = [random (-15, 15), 0];
const MIN_SPARKS = 100;
const MAX_SPARKS = 200;

let canvas = null,
	ctx = null,
	lastTick = 0,
	currTick = 0,
	fireworks = Array (),
	stats = null;

// main entry point
init ();

// -- Particle -----------------------------------------------------------------

function Particle (pos, vel, radius, hue, maxLife)
{
	this.x = pos[0];
	this.y = pos[1];
	this.x1 = pos[0];
	this.y1 = pos[1];
	this.x2 = pos[0];
	this.y2 = pos[1];
	this.x3 = pos[0];
	this.y3 = pos[1];
	this.vx = vel[0];
	this.vy = vel[1];
	this.ax = 0;
	this.ay = 0;
	this.r = radius;
	this.hue = hue;
	this.alpha = 1.0;
	this.life = 0;
	this.maxLife = maxLife;
}

Particle.prototype.isDead = function () {
	if (this.life >= this.maxLife) {
		return true;
	} else {
		return false;
	}
};

Particle.prototype.applyForce = function (delta, force) {
	this.ax += force[0] * delta;
	this.ay += force[1] * delta;
};

Particle.prototype.update = function (friction) {
	this.vx = (this.vx + this.ax) * friction;
	this.vy = (this.vy + this.ay) * friction;
	this.ax = 0;
	this.ay = 0;
	this.x3 = this.x2;
	this.y3 = this.y2;
	this.x2 = this.x1;
	this.y2 = this.y1;
	this.x1 = this.x;
	this.y1 = this.y;
	this.x += this.vx;
	this.y += this.vy;
	this.life++;
};

Particle.prototype.draw = function (trail) {
	ctx.beginPath ();
	let age = 1 - (this.life / this.maxLife);
	let r = ~~(this.r * age);
	let alpha = this.alpha * age;
	let sat = age * 100;
	let lum = age * 50;
	ctx.fillStyle = "hsla(" + this.hue +
		"," + sat +
		"%, " + lum +
		"%, " + alpha + ")";
	ctx.arc (this.x, this.y, r, 0, Math.PI * 2, true);
	ctx.fill ();
	if (trail) {
		ctx.strokeStyle = ctx.fillStyle;
		ctx.moveTo (this.x, this.y);
		ctx.lineTo (this.x1, this.y1);
		ctx.lineTo (this.x2, this.y2);
		ctx.lineTo (this.x3, this.y3);
		ctx.stroke ();
	}
};

// -- Firework -----------------------------------------------------------------

function Firework ()
{
	let pos = [random (0, canvas.width), canvas.height];
	let vel = [random (20, -20), random (-35, -25)];
	this.rocket = new Particle (pos,
		vel,
		4,
		~~(random (0, 360)),
		random (300, 450));
	this.smokeTrails = Array ();
	this.particles = Array ();
	this.exploded = false;
}

Firework.prototype.applyForce = function (delta, friction) {
	if (this.rocket) {
		this.rocket.applyForce (delta, friction);
	}

	if (this.smokeTrails.length > 0) {
		for (var i = this.smokeTrails.length - 1; i >= 0; i--) {
			this.smokeTrails[i].applyForce (delta, friction);
		}
	}

	if (this.exploded) {
		for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].applyForce (delta, friction);
		}
	}
};

Firework.prototype.update = function (friction, triggerHeight, explosionType) {
	let heights = [random (-10, 10),
		random (0, 10),
		random (-10, 0),
		random (5, 15)];
	if (this.rocket) {
		if (this.rocket.vy >= heights[triggerHeight % 4]) {
			for (let i = 0; i < ~~(random (MIN_SPARKS, MAX_SPARKS)); i++) {
				let dir1 = norm (vector (-1, 1));
				let dir2 = dir1;
				let dir3 = dir1;
				dir1[0] += 0.01 * this.rocket.vx;
				dir2[0] += 0.02 * this.rocket.vx;
				dir3[0] += 0.015 * this.rocket.vx;
				let explosions = [scale (dir1,
					random (random (1, 5),
						random (10, 12))),
					scale (dir2,
						random (random (4, 5),
							random (6, 7))),
					scale (dir3,
						random (random (5, 8),
							random (13, 15)))];

				this.particles.push (
					new Particle ([this.rocket.x,               // position
							this.rocket.y],
						explosions[explosionType % 3], // velocity
						2,                            // size/radius
						this.rocket.hue,              // color
						random (75, 125)));           // maxLife
			}
			delete this.rocket;
			this.exploded = true;
			//console.log ("spawned: ", this.particles.length);
		} else {
			this.rocket.update (friction);
			let pos = [this.rocket.x, this.rocket.y];
			let vel = [this.rocket.vx, this.rocket.vy];
			this.smokeTrails.push (new Smoketrail (pos, scale (vel, -0.5)));
		}
	}

	if (this.smokeTrails.length > 0) {
		// check for dead smoketrails and remove them
		for (var i = this.smokeTrails.length - 1; i >= 0; i--) {
			if (this.smokeTrails[i].isDead ()) {
				this.smokeTrails.splice (i, 1);
			}
		}

		// run physics-sim update on the remaining smoketrails
		for (var i = this.smokeTrails.length - 1; i >= 0; i--) {
			this.smokeTrails[i].update (friction);
		}
	}

	if (this.exploded) {
		// check for dead particles and remove them
		for (var i = this.particles.length - 1; i >= 0; i--) {
			if (this.particles[i].isDead ()) {
				this.particles.splice (i, 1);
			}
		}

		// run physics-sim update on the remaining particles
		for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].update (friction);
		}
	}
};

Firework.prototype.draw = function () {
	if (this.rocket) {
		this.rocket.draw ();
	}

	if (this.smokeTrails.length > 0) {
		for (var i = this.smokeTrails.length - 1; i >= 0; i--) {
			this.smokeTrails[i].draw ();
		}
	}

	if (this.exploded) {
		for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].draw (random (0, 1) > 0.5 ? true : false);
		}
	}
};

// -- Smoketrail ---------------------------------------------------------------

function Smoketrail (pos, vel)
{
	this.particles = Array ();

	for (let i = 0; i < 3; i++) {
		this.particles.push (
			new Particle (pos,   		     // position
				vel,               // velocity
				2,                 // size/radius
				64,                // color
				random (15, 35))); // maxLife
	}
}

Smoketrail.prototype.applyForce = function (delta, friction) {
	for (var i = this.particles.length - 1; i >= 0; i--) {
		this.particles[i].applyForce (delta, friction);
	}
};

Smoketrail.prototype.update = function (friction) {
	// check for dead particles and remove them
	for (var i = this.particles.length - 1; i >= 0; i--) {
		if (this.particles[i].isDead ()) {
			this.particles.splice (i, 1);
		}
	}

	// run physics-sim update on the remaining particles
	for (var i = this.particles.length - 1; i >= 0; i--) {
		this.particles[i].update (friction);
	}
};

Smoketrail.prototype.isDead = function () {
	if (this.particles.length == 0) {
		return true;
	} else {
		return false;
	}
};

Smoketrail.prototype.draw = function () {
	for (var i = this.particles.length - 1; i >= 0; i--) {
		this.particles[i].draw ();
	}
};

// -- Utils --------------------------------------------------------------------

function random (min, max) {
	return Math.random () * (max - min) + min;
}

function scale (vec, s)
{
	return [vec[0] * s, vec[1] * s];
}

function mag (vec)
{
	return Math.sqrt (vec[0] * vec[0] + vec[1] * vec[1]);
}

function norm (vec)
{
	return scale (vec, 1 / (mag (vec) || 1));
}

function vector (min, max) {
	return [random (min, max), random (min, max)];
}

function loop (func)
{
	let callback = function (time) {
		requestAnimationFrame (callback);
		let diff = ~~(time - (callback.time || 0)),
			delta = diff / 1000;
		func (delta);
		callback.time = time;
	};

	return callback;
}

function init ()
{
	canvas = document.getElementById ("canvas");
	ctx = canvas.getContext ("2d");
	onWindowResize ();
	stats = new Stats ();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	stats.showPanel (0);
	document.body.appendChild (stats.domElement);
	window.addEventListener ("resize", onWindowResize, false);
}

function onWindowResize ()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function render (delta)
{
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctx.fillRect (0, 0, canvas.width, canvas.height);
	//ctx.clearRect (0, 0, canvas.width, canvas.height);

	stats.update ();

	ctx.globalCompositeOperation = "lighter";
	for (var i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].draw ();
	}
}

// -- simulation driving loopers -----------------------------------------------

//just some debugging output
// let maxParticles = 0;
// loop (function (delta) {
// 	let sum = 0;
// 	for (var i = fireworks.length - 1; i >= 0; i--) {
// 		sum += Object.keys(fireworks[i].particles).length
// 		sum += Object.keys(fireworks[i].smokeTrails).length
// 	}
//
// 	sum += fireworks.length;
//
// 	if (maxParticles < sum) {
// 		maxParticles = sum;
// 	}
//
// 	console.log ("max. # of particles sofar: ", maxParticles);
// })();

// spawn firework-rockets
loop (function (delta) {
	// each frame there's a 2% chance a new firework-rocket is launched
	if (random (0, 1) < 0.02) {
		fireworks.push (new Firework ());
	}
})();

// make sure the simulation is actually drawn
loop (function (delta) {
	render (delta);
})();

// remove finished firework-objects from the simulation
loop (function (delta) {
	for (var i = fireworks.length - 1; i >= 0; i--) {
		if (fireworks[i].done) {
			fireworks.splice (i, 1);
		}
	}
})();

// spin the physics-simulation loop
let explosionType = 0;
let triggerHeight = 0;
loop (function (delta) {
	for (var i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].applyForce (delta, GRAVITY);
		fireworks[i].applyForce (delta, WIND);
		fireworks[i].update (FRICTION, triggerHeight++, explosionType++);
	}
})();
