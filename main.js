const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

//enemies
ASSET_MANAGER.queueDownload("./sprites/enemy/red_stone_guardian.png");

//background
ASSET_MANAGER.queueDownload("./sprites/environment/background_sample-shrinked.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	
	// Top layer goes first when drawing to canvas
	gameEngine.addEntity(new RedStoneGuardian(gameEngine));
	gameEngine.addEntity(new Background(gameEngine));
	

	gameEngine.init(ctx);

	gameEngine.start();
});
