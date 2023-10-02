//level1.js
// JavaScript function to return to the start screen
function returnToStart() {
    // Navigate to the start screen (replace 'index.html' with the actual URL)
	window.location.href = 'index.html';
}

// JavaScript function to confirm quitting the game
function confirmQuit() {
	const confirmation = window.confirm("Are you sure you want to quit the game and lose your progress?");
	if (confirmation) {
		// If the player confirms, navigate to the start screen (index.html)
		window.location.href = "index.html"; // Replace with the actual start screen URL
	}
}

// Define enemy wave arrays
const wave1 = [
	{ type: "EnemyType1", count: 20 },
];

const wave2 = [
	{ type: "EnemyType1", count: 3 },
	{ type: "EnemyType2", count: 1 },
];

const wave3 = [
	{ type: "EnemyType1", count: 4 },
	{ type: "EnemyType2", count: 2 },
];

const wave4 = [
	{ type: "EnemyType1", count: 4 },
	{ type: "EnemyType2", count: 4 },
];

const wave5 = [
	{ type: "EnemyType1", count: 4 },
	{ type: "EnemyType2", count: 6 },
];

// Add more waves as needed

// You can use these wave arrays in your game logic
// For example, you can spawn enemies based on these wave arrays in your JavaScript code.
	
// Example usage from level-1.html:
// Call spawnEnemies with a wave array
console.log("This is the value of wave1:", wave1);
console.log("Type of wave1:", typeof wave1);

spawnEnemies(wave1);
	
	
<script src="scripts/waypoints.js"></script>
<script src="scripts/placementTilesData.js"></script>
<script src="scripts/classes/Sprite.js"></script>
<script src="scripts/classes/Building.js"></script>
<script src="scripts/classes/Enemy.js"></script>
<script src="scripts/classes/PlacementTile.js"></script>
<script src="scripts/classes/Projectile.js"></script>
<script src="scripts/index.js"></script>