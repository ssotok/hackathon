var player1 = prompt("Enter the name of player 1:");
var player2 = prompt("Enter the name of player 2:");

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/redRaccoon.png";

// Mario image
var marioReady = false;
var marioImage = new Image();
marioImage.onload = function () {
	marioReady = true;
};
marioImage.src = "images/blueRaccoon.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/bananaPeel.png";

// Hazard image
var hazardReady = false;
var hazardImage = new Image();
hazardImage.onload = function() {
	hazardReady = true;
};
hazardImage.src = "images/hazard.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};

var mario = {
	speed: 256 // movement in pixels per second
};

var monster = {};
var player1Caught = 0;
var player2Caught = 0;

var hazard = {};
var hazard2 = {};
var hazard3 = {};
var hazard4 = {};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = (canvas.width / 2) + 16;
	hero.y = canvas.height / 2;
	
	mario.x = (canvas.width / 2) - 16;
	mario.y = (canvas.height / 2);

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	
	//Throw the hazards somewhere on the screen randomly
	hazard.x = 32 + (Math.random() * (canvas.width - 64));
	hazard.y = 32 + (Math.random() * (canvas.width - 64));
	hazard2.x = 32 + (Math.random() * (canvas.width - 64));
	hazard2.y = 32 + (Math.random() * (canvas.width - 64));
	hazard3.x = 32 + (Math.random() * (canvas.width - 64));
	hazard3.y = 32 + (Math.random() * (canvas.width - 64));
	hazard4.x = 32 + (Math.random() * (canvas.width - 64));
	hazard4.y = 32 + (Math.random() * (canvas.width - 64));		
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}
	
	if (87 in keysDown) { // Player holding up
		mario.y -= mario.speed * modifier;
	}
	if (83 in keysDown) { // Player holding down
		mario.y += mario.speed * modifier;
	}
	if (65 in keysDown) { // Player holding left
		mario.x -= mario.speed * modifier;
	}
	if (68 in keysDown) { // Player holding right
		mario.x += mario.speed * modifier;
	}	

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++player1Caught;
		hero.speed += 50;
		reset();
	}

	if (
		mario.x <= (monster.x + 32)
		&& monster.x <= (mario.x + 32)
		&& mario.y <= (monster.y + 32)
		&& monster.y <= (mario.y + 32)
	) {
		++player2Caught;
		mario.speed += 50;
		reset();
	}
	
	// have you hit a hazard
	if (
		(hero.x <= (hazard.x + 128)
		&& hazard.x <= (hero.x + 32)
		&& hero.y <= (hazard.y + 64)
		&& hazard.y <= (hero.y + 32)) ||
		(hero.x <= (hazard2.x + 128)
		&& hazard2.x <= (hero.x + 32)
		&& hero.y <= (hazard2.y + 64)
		&& hazard2.y <= (hero.y + 32)) ||
		(hero.x <= (hazard3.x + 128)
		&& hazard3.x <= (hero.x + 32)
		&& hero.y <= (hazard3.y + 64)
		&& hazard3.y <= (hero.y + 32)) ||
		(hero.x <= (hazard4.x + 128)
		&& hazard4.x <= (hero.x + 32)
		&& hero.y <= (hazard4.y + 64)
		&& hazard4.y <= (hero.y + 32))
	)
	{
		hero.speed = 64;
	}
	else {
		hero.speed = 256;
	}
	
	// have you hit a hazard
	if (
		(mario.x <= (hazard.x + 128)
		&& hazard.x <= (mario.x + 32)
		&& mario.y <= (hazard.y + 64)
		&& hazard.y <= (mario.y + 32)) ||
		(mario.x <= (hazard2.x + 128)
		&& hazard2.x <= (mario.x + 32)
		&& mario.y <= (hazard2.y + 64)
		&& hazard2.y <= (mario.y + 32)) ||
		(mario.x <= (hazard3.x + 128)
		&& hazard3.x <= (mario.x + 32)
		&& mario.y <= (hazard3.y + 64)
		&& hazard3.y <= (mario.y + 32)) ||
		(mario.x <= (hazard4.x + 128)
		&& hazard4.x <= (mario.x + 32)
		&& mario.y <= (hazard4.y + 64)
		&& hazard4.y <= (mario.y + 32))
	)
	{
		mario.speed = 64;
	}
	else {
		mario.speed = 256;
	}			
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (hazardReady) {
		ctx.drawImage(hazardImage, hazard.x, hazard.y);
		ctx.drawImage(hazardImage, hazard2.x, hazard2.y);
		ctx.drawImage(hazardImage, hazard3.x, hazard3.y);
		ctx.drawImage(hazardImage, hazard4.x, hazard4.y);		
	}
	
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(player1 + "'s Score: " + player1Caught, 32, 31);
	ctx.fillText(player2 + "'s Score: " + player2Caught, 32, 420);		

	

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	
	if (marioReady) {
	   ctx.drawImage(marioImage, mario.x, mario.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}



};


// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();