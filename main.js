const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Player
ASSET_MANAGER.queueDownload("./sprites/player/archer.png");

//enemies
ASSET_MANAGER.queueDownload("./sprites/enemy/red_stone_guardian.png");

//background
ASSET_MANAGER.queueDownload("./sprites/environment/background_sample-shrinked.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);
	new SceneManager(gameEngine);
	gameEngine.start();
});
