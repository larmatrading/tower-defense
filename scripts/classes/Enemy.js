//console.log("entered Enemy.js")
class Enemy extends Sprite {
	constructor({position = {x:0, y:0}, imageSrc = 'img/default.png' }) {
		super({
			position, 
			//imageSrc: 'img/orc2.png',			
			//when i define these in subclasses
			imageSrc, // Image source is passed as a parameter
			frames: { max: 7 }
			//frames -> defined in sublcass 
		});
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
		super.draw()
		
		// health bar
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y - 15, this.width, 10)
		
		c.fillStyle = 'green'
		c.fillRect(
			this.position.x, 
			this.position.y - 15, 
			(this.width * (this.health / this.maxHealth)), 
			10
		)
	}
	
	update() {
		this.draw()
		super.update()
	
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

class EnemyType1 extends Enemy {
	constructor({ position }) {
		super({ 
			position,
			imageSrc: 'img/orc1.png',
			frames: {
				max: 7
			}
		}); // Enemy attributes
		this.radius = 50;
		this.health = 100;
		this.maxHealth = 100;
		this.speed = 4; // You can define movement speed here
	}
}

class EnemyType2 extends Enemy {
	constructor({ position }) {
		super({ 
			position,
			imageSrc: 'img/orc2.png',
			frames: {
				max: 7
			}
		}); // Enemy attributes
		this.radius = 50;
		this.health = 150;
		this.maxHealth = 150;
		this.speed = 3; 
	}
}
