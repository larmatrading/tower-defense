# tower-defense
Buildings
	Select Buildings on click
Goals:
One working level
	Buildings
	Economy
	Screens
Enemies
	Fix orc2 sprite
	Move enemy creation into a factory
HTML
	Move to styles 
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
	Start screen
	Game over
	Level end
	Quit screen
	Scale to window
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

// Git commands
git init
git add .
git commit -m "Ported functionality to level"
git push

// Buildings codeclass BuildingFactory {
  constructor() {
    this.buildings = [];
  }

  createBuilding(type, position) {
    let building;
    switch (type) {
      case 'Tower1':
        building = new Tower1(position);
        break;
      case 'Tower2':
        building = new Tower2(position);
        break;
      // Add more building types as needed
      default:
        // Handle unknown building types or add more cases
        break;
    }
    this.buildings.push(building);
    return building;
  }
}

// Define building types
class Tower1 extends Building {
  constructor(position) {
    super({
      position,
      imageSrc: './img/tower1.png',
      // Other properties specific to Tower1
    });
  }
}

class Tower2 extends Building {
  constructor(position) {
    super({
      position,
      imageSrc: './img/tower2.png',
      // Other properties specific to Tower2
    });
  }
}

// Example usage:
const buildingFactory = new BuildingFactory();
const tower1 = buildingFactory.createBuilding('Tower1', { x: 100, y: 100 });
const tower2 = buildingFactory.createBuilding('Tower2', { x: 200, y: 200 });

// Now you have two buildings of different types in the game.

		spawnBuilding("BuildingType1", {
		  x: activeTile.position.x,
		  y: activeTile.position.y
		});


