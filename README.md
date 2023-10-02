# tower-defense
Key points
	Have level 1 load the scene

	Index.js loads level1
	Level1 draws the canvas
	Level1 starts the animation loop
	animation loops spawns enemies
	When last wave completes, theres a pause then game over
Rebuilding:
	Define enemy waves with type and count
	spawn function to iterate over waves
	spawn appropriate enemies and offset of let
	
Goals:
One working level
	Buildings
	Economy
	Screens
Enemies
	Fix orc2 sprite
Buildings
	Multiple Buildings
	Select Buildings on click
	Separate characteristics
	Ability to upgrade
	Selling towers
Economy
	Starting Gold
	Gold per enemy
	Interest per end of level/wave
Screens
	Start
	Game over
	Level end
	Quit
Long term
	Technology trees
	Tower upgrades
	Consider enemies that damage towers
	Implementing tower repair
index.js -> Logic to handle levels
	Variable to hold wave arrays.
	check if enemies array is empty
		check if Waves array is empty
			end Level (Game Over)
		call Spawn Function on wave
	

Long term -> Level transition logic
	Trigger to check for wave completion
	On last wave eliminated, levle end
	On level end
		stat screen
		next level button
		increment level tracker

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
}
// Placeholder for old code
