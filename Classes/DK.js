import {sprites} from "./sprites.js"

let img = new Image()
img.src = './DK_sprites.png'

let img2 = new Image()
img2.src = './mario_and_luigi_sprites.png'

export class DK {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.loop = [
		[132, 45],
		[334, 45],
		[384, 45],
		[334, 45],
		[384, 45],
		[181, 50],
		[618, 45],
		[280, 50]
		]
		this.loopIndex = 0
        this.isThrowing = false
        this.throwInterval = 2000       
        this.throwTimer = 0             // Accumula il tempo passato  
        this.visible = false
        this.timeSinceLastFrameChange = 0
        this.timeBetweenFrames = 800
        this.canThrow = true
	}

	drawDK(ctx) {	
		/* Stationary barrels */
		ctx.drawImage(img2, 59.5, 109, 15, 16, 150, 88, 50, 50)
		ctx.drawImage(img2, 59.5, 109, 15, 16, 150, 40, 50, 50)
		ctx.drawImage(img2, 59.5, 109, 15, 16, 195, 88, 50, 50)
		ctx.drawImage(img2, 59.5, 109, 15, 16, 195, 40, 50, 50)

		/* Pauline */
		ctx.drawImage(img2, 18, 243, 20, 22, 510, 5, 50, 50)
	}



	drawFrame(frameData) {
		const x = frameData[0]
    	const width = frameData[1]
        this.sprites.drawSpriteDK(x, 50, width, 38, this.x, this.y, 140, 144)

        if (x == 280 && !this.hasThrown) {
            // Start timer and set isThrowing to true
            this.isThrowing = true
            this.throwingTimer = setTimeout(() => {
                this.isThrowing = false
            }, this.throwingDelay)
            this.hasThrown = true
            this.thrownTimer = setTimeout(() => {
                this.hasThrown = false
            }, this.thrownDelay)
        }
          
        else {
            // Reset timer and set isThrowing to false
            clearTimeout(this.throwingTimer)
            this.isThrowing = false
        }
	}

	step(ctx, elapsed) {
        this.sprites = new sprites(ctx)
        this.throwTimer += elapsed
        if (this.throwTimer >= this.throwInterval) {
            this.throwTimer = 0
            this.isThrowing = true
            this.canThrow = true // Permetti il lancio di un nuovo barile
        }
        this.timeSinceLastFrameChange += elapsed
        if (this.timeSinceLastFrameChange >= this.timeBetweenFrames) {
            this.timeSinceLastFrameChange = 0
            this.loopIndex++
            if (this.loopIndex >= this.loop.length) {
                this.loopIndex = 0
            }
        }
        const frameData = this.loop[this.loopIndex]
        this.drawFrame(frameData)
	}

    update(ctx, elapsed) {
        this.step(ctx, elapsed)
        this.drawDK(ctx)
        this.drawHelp(ctx)
    }
}