The index.html now has a button to toggle between having the game screen visible
Next items:
	load screen data from game.html into the index
	Write code that segments by level
	able to load the level specific data. Level 1 on play button
	Each level has the level end code which loads button to go next level
	Each level has game over logic which clears game & returns to start screen


// code to handle start screen into first level
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tower Defense Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Start Screen -->
    <div id="startScreen">
        <h1>Welcome to Tower Defense</h1>
        <button id="playButton">Play</button>
    </div>

    <!-- Game Elements -->
    <div id="game" style="display: none;">
        <canvas id="gameCanvas"></canvas>
        <!-- Other game elements go here -->
    </div>

    <script src="game.js"></script>
</body>
</html>


// Code to handle levels
// Shared variables across levels
let coins = 0;
let hearts = 10;
let currentLevel = 1; // Track the current level

// Define level-specific data
const levelData = {
    1: {
        enemyWaves: [/* ... */],
        towerPlacement: [/* ... */],
    },
    2: {
        enemyWaves: [/* ... */],
        towerPlacement: [/* ... */],
    },
    // Define data for other levels
};

// Function to transition to the next level
function transitionToNextLevel() {
    currentLevel++;
    if (currentLevel <= numLevels) {
        // Clear the current level, load next level data, and initialize
        clearCurrentLevel();
        loadLevelData(currentLevel);
        initializeLevel();
    } else {
        // Game completed, show victory screen or take appropriate action
        showVictoryScreen();
    }
}

// Code definitions for classes
class placementTile {
	constructor ({position = {x: 0, y:0}}) {
		this.position = position
		this.size = 64
		this.color = 'rgba(255, 255, 255, 0.15)'
		this.occupied = false
	}
	
	draw() {
		c.fillStyle = this.color
		c.fillRect(this.position.x, this.position.y, this.size, this.size)
	}
	
	update(mouse) {
		this.draw()
		
		if (
			mouse.x > this.position.x && 
			mouse.x < this.position.x + this.size &&
			mouse.y > this.position.y && 
			mouse.y < this.position.y + this.size
		) {
			this.color = 'white'
		}	else this.color = 'rgba(255, 255, 255, 0.15)'
	}
}

class Enemy {
	constructor({position = {x:0, y:0} }) {
		this.position = position	
		this.width = 100
		this.height = 100
		this.waypointIndex = 0
		this.center = {
			x: this.position.x + this.width /2,
			y: this.position.y + this.width /2
		}
		this.radius = 50
		this.health = 100
		this.velocity = {
			x: 0,
			y: 0
		}
	}
	
	draw() {
		c.fillStyle = 'red'
		//c.fillRect(this.position.x, this.position.y, this.width, this.height)
		c.beginPath()
		c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
		c.fill()
		
		// health bar
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y - 15, this.width, 10)
		
		c.fillStyle = 'green'
		c.fillRect(
			this.position.x, 
			this.position.y - 15, 
			(this.width * this.health) / 100, 
			10
		)
	}
	
	update() {
		this.draw()
	
		const waypoint = waypoints[this.waypointIndex]
		const yDistance = waypoint.y - this.center.y
		const xDistance = waypoint.x - this.center.x
		const angle = Math.atan2(yDistance, xDistance)
		
		const speed = 3
		
		this.velocity.x = Math.cos(angle) * speed
		this.velocity.y = Math.sin(angle) * speed
		
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		
		this.center = {			
			x: this.position.x + this.width /2,
			y: this.position.y + this.width /2			
		}
		
		if (
			Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < 
				Math.abs(this.velocity.x) && 
			Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < 
				Math.abs(this.velocity.y) &&
			this.waypointIndex < waypoints.length -1
		)	{
			this.waypointIndex++
		}
	}
}

class Projectile {
	constructor({position = {x: 0, y: 0}, enemy}) {
		this.position = position
		this.velocity = {
			x: 0,
			y: 0
		}
		this.enemy = enemy
		this.radius = 10
	}
	
	draw() {
		c.beginPath()
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		c.fillStyle = 'orange'
		c.fill()
	}
	
	update() {
		this.draw()
		
		const angle = Math.atan2(
			this.enemy.center.y - this.position.y, 
			this.enemy.center.x - this.position.x
			)
			
		const power = 5
		this.velocity.x = Math.cos(angle) * power
		this.velocity.y = Math.sin(angle) * power
		
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}
}

class Building {
	constructor({position = {x: 0, y: 0 } }) {
		this.position = position
		this.width = 64 * 2
		this.height = 64
		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}
		this.projectiles = []
		this.radius = 250
		this.target
		this.frames = 0
	}
	
	draw() {
		c.fillStyle = 'blue'
		c.fillRect(this.position.x, this.position.y, this.width, 64)
		
		/*c.beginPath()
		c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
		c.fillStyle = 'rgba(0, 0, 255, 0.2)'
		c.fill()*/
	}
	
	update() {
		this.draw()
		if (this.frames % 100 === 0 && this.target) {
			this.projectiles.push(
				new Projectile ({
					position: {
						x: this.center.x,
						y: this.center.y
					},
					enemy: this.target
				})
			)
		}
		
		this.frames++
	}
}