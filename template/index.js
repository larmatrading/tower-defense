//index.js

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
// Define level constants
console.log("create index constants")
const enemies = []
const placementTilesData2D = []
const placementTiles = []
// Define mouse pointer
const mouse = {
	x: undefined,
	y: undefined
}
// Define a map of level numbers to their JavaScript file names
const levelScripts = {
    1: 'level1.js',
    // Add more levels here
};

// Function to load a level
function loadLevel(levelNumber) {
	console.log("loadLevel executed")
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
// Hide startScreen, reveal gameScreen
function startGame() {
	console.log("startGame executed")
    const startScreen = document.getElementById("startScreen");
    const gameScreen = document.getElementById("gameScreen");
    
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    // Load the first level (e.g., level 1)
	console.log("call loadLevel")
    loadLevel(1);
/*
    // Start the game loop
	console.log("call animate")
    animate();*/
    
}
function animate(mapImage) {
	// might not need the clear canvas
    // Clear the canvas (you can choose your background color)
    //c.clearRect(0, 0, canvas.width, canvas.height);
	// Draw the image on the canvas
    c.drawImage(mapImage, 0, 0); // You can adjust the
	
	// animate enemies
	enemies.forEach((enemy) => {
		enemy.update();
	})
	// animate tiles
	placementTiles.forEach((tile) => {
		tile.update(mouse);
	})
	

    // Request the next animation frame
    //requestAnimationFrame(animate);	//built in callback Function
	requestAnimationFrame(() => animate(mapImage)); // Pass mapImage to the next frame
	//console.log("animate executed")
}
// Event listeners
// Play Button event listener
document.getElementById('playButton').addEventListener('click', startGame);
// Mouse move event listener
window.addEventListener('mousemove', (event) => {
	mouse.x = event.clientX
	mouse.y = event.clientY
	//console.log(event)
	
	activeTile = null
    for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i];
		if (
			mouse.x > tile.position.x && 
			mouse.x < tile.position.x + tile.size &&
			mouse.y > tile.position.y && 
			mouse.y < tile.position.y + tile.size
		) 	{
			activeTile = tile
			console.log(activeTile)
			break
		}		
	}
})
