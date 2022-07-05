let gameState = {}


const config = {
	type: Phaser.AUTO,
	width: 1152,
	height: 580,
	backgroundColor: 0xc4bdbc,
	physics: {
		default: 'matter',
		matter: {
			debug: false,
			gravity: { y: 0.3},
		},
		arcade: {
			gravity: {y: 200}
		}
	},
	scene: [BattleScene]

}

let game = new Phaser.Game(config)