//CONTROLS
let keySpace
var slimeDelay = 1000
const slimeDirections = ['left', 'right']
var currentDirection

class BattleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'BattleScene' })
	}

	preload() {
		this.load.image('background', './Sprites/Background.png')
		this.load.image('exampleSword', './Sprites/SwordExample.png')
		this.load.image('chainSprite', './Sprites/SwordChainSprite.png')
		this.load.spritesheet('slime', './Sprites/MiniWorldSprites/Characters/Monsters/Slimes/Slime.png', { frameWidth: 16, frameHeight: 16 })
		//SLIME FRAME WIDTH: 16px HEIGHT: 16px
	}

	create() {
		const background = this.add.image(576, 336, 'background').setScale(3)
		background.setDepth(0)
		//set canvas boundary
		this.matter.world.setBounds()

		this.add.text(250, 0, "Once upon a time, there was a tree in a field with a beautiful mountain range.  \nThe tree grew lonely, so it used its sap to make a lovely little slime.  \nThe slime and the tree had many fun times together, until one day, a spiteful sword came \nfloating by.  Because slaying slimes was its duty, the sword cut down the \nslime without hesitation.  The tree was so angry it could not vanquish the evil sword, \nit crashed the game out of spite.  However, maybe the tree would have been better off \ntelling the developer how to make event listeners on sprites go away after they are destroyed.  \nMaybe one day...", { color: '#000'})
		//controls
		keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

		//collision groups
		let noDrag = this.matter.world.nextGroup()
		let canDrag = this.matter.world.nextGroup()

		//generate sword
		gameState.sword = this.matter.add.image(200, 200, 'exampleSword', null,  {ignoreGravity: true}).setScale(2).setCollisionGroup(canDrag)
		gameState.sword.setMass(.8).setVelocity(2)

		this.matter.add.mouseSpring({ length: 1, stiffness: 1 , collisionFilter: { group: canDrag }})

		let y = 376
		let prev = gameState.sword

		//sword chain generator
		for (let i = 0; i < 3; i++) {
			let ball = this.matter.add.image(200, y, 'chainSprite', null, {shape: 'circle', mass: 10, ignoreGravity: true}).setScale(.03).setCollisionGroup(canDrag)
			ball.setFixedRotation()

			if (i === 0) {
				this.matter.add.joint(prev, ball, 35, 1, {pointA: {x: 0, y: 85}, stiffness: 1, damping: 0.1})
			} else {
				this.matter.add.joint(prev, ball, 35, 1, {stiffness: 1, damping: 0.1})
			}

			prev = ball

			y += 10
		}

		//ANIMATIONS

		this.anims.create({
			key: 'frontJump',
			frames: this.anims.generateFrameNumbers('slime', { frames: [0, 1, 2, 3, 4, 5, 0]}),
			frameRate: 8,
			repeat: -1,
			repeatDelay: slimeDelay// i don't think this actually works
		})

		gameState.slime = this.matter.add.sprite(600, 400, 'slime').setScale(6).setCollisionGroup(noDrag).setMass(0.1).setAngle(0)
		gameState.slime.setBody({
			type: 'rectangle',
			width: 55,
			height: 45,
		})

		gameState.slime.play('frontJump')

		gameState.slime.on('animationrepeat', function() {
			currentDirection = slimeDirections[Math.floor(Math.random()*2)]
			gameState.slime.setVelocityY(-2)
		})

		//this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
			//console.log(`${bodyA} collided with ${bodyB}!`)
			//gameState.slime.destroy()
		//})  FOR GENERAL COLLISIONS

		gameState.sword.setOnCollideWith(gameState.slime, function() {
			gameState.slime.destroy()
		})
		//FOR SPECIFIC COLLISIONS
	}

	update() {
		//console.log(gameState.slime)
		gameState.slime.angle = 0
		slimeDelay = Math.floor(Math.random()*4000)
		let slimeDirection = Math.floor(Math.random()*2)  //0 for left, 1 for right
		//console.log(gameState.slime.anims.getProgress()) //1 when not in animation
		if (gameState.slime.anims.getProgress() < 1) {
			if (currentDirection === 'left') {
				gameState.slime.x -= 1
			} else {
				gameState.slime.x += 1
			}
		}
	}


}
