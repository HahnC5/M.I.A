const game = new Phaser.Game(config)

function create() {
	let circle1 = this.add.circle(50,100,90,0xFFF070);
}

const config = {
	type: Phaser.AUTO,
	width: 450,
	height: 600,
	scene: {
		create
	}
}
