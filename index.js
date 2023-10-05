/* 	index.js **/
/*	Define canvas element **/
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 768

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

/*	Variable definitions **/
//	Tile placement definitions
let waves = []
let activeTile = undefined
let hearts = 10
let coins = 1000
const placementTilesData2D = []
const placementTiles = []
const enemies = []	// Enemies Array
const buildings = []
const explosions = []
const mouse = {
	x: undefined,
	y: undefined
}
/*	function definitions **/
// Load level scripts dynamically
// Function to load a level
function loadLevel(levelNumber) {
	//console.log("loadLevel executed")
    // Remove any existing level script
    const existingScript = document.querySelector('.level-script');
    if (existingScript) {
        existingScript.remove();
    }
    // Create a new script element for the level
    const script = document.createElement('script');
    script.src = `levels/level${levelNumber}.js`;
    script.className = 'level-script'; // Add a class to identify level scripts
    document.body.appendChild(script);
}
// Populate placementTilesData2D
function populatePlacementTilesData2D(placementTilesData) {
  // Clear placementTilesData2D
  placementTilesData2D.length = 0;
  for (let i = 0; i < placementTilesData.length; i += 20) {
    placementTilesData2D.push(placementTilesData.slice(i, i + 20));
  }
}
// Function to populate placementTiles
function populatePlacementTiles() {
  // Clear placementTiles
  placementTiles.length = 0;
  placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 14) {
        // add building placement tile here
        placementTiles.push(
          new placementTile({
            position: {
              x: x * 64,
              y: y * 64,
            },
          })
        );
      }
    });
  });
}
//	handle enemy spawning
function spawnWave(wave) {
  let xOffset = 150
  wave.forEach((enemyInfo) => {
    for (let i = 0; i < enemyInfo.count; i++) {
      spawnEnemy(enemyInfo.type, xOffset);
	  xOffset += 150;
    }
  });
}
function spawnEnemy(enemyType, xOffset) {
  switch (enemyType) {
    case "EnemyType1":
		enemies.push(
			new EnemyType1({
				position: { x: waypoints[0].x -xOffset, y: waypoints[0].y }
			})
		);
      break;
    case "EnemyType2":
      enemies.push(
			new EnemyType2({
				position: { x: waypoints[0].x -xOffset, y: waypoints[0].y }
			})
      );
      break;
    // Add more cases for other enemy types as needed
    default:
      // Handle unknown enemy types or add more cases
      break;
  }
}
//	handle building spawning
function spawnBuilding(buildingType, position) {
  switch (buildingType) {
    case "BuildingType1":
      buildings.push(new BuildingType1({ position }));
      break;
    case "BuildingType2":
      buildings.push(new BuildingType2({ position }));
      break;
    // Add more cases for other building types as needed
    default:
      // Handle unknown building types or add more cases
      break;
  }
}
/** start of old code **/
function animate() {
	const animationId = requestAnimationFrame(animate)
	c.drawImage(image, 0, 0)
	// enemy animation
	for (let i = enemies.length - 1; i >= 0; i--) {
		const enemy = enemies[i]
		enemy.update()
		if (enemy.position.x > canvas.width) {
			hearts -= 1
			enemies.splice(i, 1)
			// next line may be unneeded
			document.querySelector('#hearts').innerHTML = hearts;
			if (hearts === 0) {
				cancelAnimationFrame(animationId)
				document.querySelector('#gameOver').style.display = 'flex'
			}
		}
	}	
	for (let i = explosions.length - 1; i >= 0; i--) {
		const explosion = explosions[i]
		explosion.draw()
		explosion.update()
		if (explosion.frames.current >= explosion.frames.max - 1) {
			explosions.splice(i, 1)
		}		
	}
	// tracking total amount of enemies
	if (enemies.length === 0) {		
		if (waves.length === 0){
			console.log('no more waves')
			cancelAnimationFrame(animationId);
			document.querySelector('#gameOver').style.display = 'flex'
		} else {
			spawnWave(waves.shift());
		}
	}
	placementTiles.forEach(tile => {
		tile.update(mouse)
	})
	
	buildings.forEach((building) => {
		building.update()
		building.target = null
		const validEnemies = enemies.filter(enemy => {
			const xDifference = enemy.center.x - building.center.x
			const yDifference = enemy.center.y - building.center.y			
			const distance = Math.hypot(xDifference, yDifference)
			return distance < enemy.radius + building.radius
		})
		building.target = validEnemies[0]
		
		for (let i = building.projectiles.length - 1; i >= 0; i--) {
			const projectile = building.projectiles[i]
		
			projectile.update()
			
			const xDifference = projectile.enemy.center.x - projectile.position.x
			const yDifference = projectile.enemy.center.y - projectile.position.y			
			const distance = Math.hypot(xDifference, yDifference)
			// this is when a projectile hits an enemy
			if (distance < projectile.enemy.radius + projectile.radius) {
				// enemy health and enemy removal
				projectile.enemy.health -= 20
				if (projectile.enemy.health <= 0) {
					const enemyIndex = enemies.findIndex((enemy) => {
						return projectile.enemy === enemy
					})					
					if (enemyIndex > -1) {
						enemies.splice(enemyIndex, 1)
						coins += 25
						document.querySelector('#coins').innerHTML = coins
					}
				}
				explosions.push(
					new Sprite({
						position: { x: projectile.position.x, y: projectile.position.y}, 
						imageSrc: './img/explosion.png', 
						frames: { max: 4},
						offset: { x: 0, y: 0}					
					})
				)
				building.projectiles.splice(i, 1)
			}
		}
	})
}

// building creation handled here
canvas.addEventListener('click', (event) => {
	if (activeTile && !activeTile.isOccupied && coins - 50 >= 0) {
		coins -= 50
		document.querySelector('#coins').innerHTML = coins
		spawnBuilding("BuildingType1", {
		  x: activeTile.position.x,
		  y: activeTile.position.y
		});
		/*
		buildings.push(
			new Building({
				position: {
					x: activeTile.position.x,
					y: activeTile.position.y
				}
			})
		)*/
		activeTile.isOccupied = true
		buildings.sort((a, b) => {
			return a.position.y - b.position.y
		})
	}
})

window.addEventListener('mousemove', (event) => {
	mouse.x = event.clientX
	mouse.y = event.clientY
	
	activeTile = null
	for (let i = 0; i < placementTiles.length; i++) {
		const tile = placementTiles[i]
		if (
			mouse.x > tile.position.x && 
			mouse.x < tile.position.x + tile.size &&
			mouse.y > tile.position.y && 
			mouse.y < tile.position.y + tile.size
		) 	{
			activeTile = tile
			break
		}		
	}	
})

/** End of old code **/

// Example usage: Load level 1
loadLevel(1);
//console.log(waves)