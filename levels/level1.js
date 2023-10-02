/* 	level1.js */ //console.log("entered level1.js");
/*	Define image element **/
const image = new Image()
image.src = 'img/map1.png'
image.onload = () => {	// called after loading
	initializeLevel();
	animate()
}
//Port appropriate code from index here

/**	function definitions **/
//	Define level Initialization	
function initializeLevel() {
	// Intialization code here
	//console.log('initializeLevel')
	populatePlacementTilesData2D(level1PlacementTilesData);
	populatePlacementTiles();
	
	
}
/**	Variable definitions **/
// Define enemy wave arrays
const wave1 = [
	{ type: "EnemyType1", count: 2 },
];

const wave2 = [
	{ type: "EnemyType1", count: 4 },
	//{ type: "EnemyType2", count: 1 },
];

const wave3 = [
	{ type: "EnemyType1", count: 4 },
	{ type: "EnemyType2", count: 2 },
];

const wave4 = [
	{ type: "EnemyType1", count: 6 },
	{ type: "EnemyType2", count: 2 },
];

const wave5 = [
	{ type: "EnemyType1", count: 6 },
	{ type: "EnemyType2", count: 4 },
];
//console.log('assign waves')
waves = [wave1, wave2, wave3, wave4, wave5]
//console.log(waves)
//
