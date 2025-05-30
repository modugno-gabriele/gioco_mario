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
            [181, 50],
            [618, 45],
            [280, 50]
        ]
        this.loopIndex = 0
        this.throwInterval = 4000       
        this.throwTimer = 0             // Accumula il tempo passato  
        this.timeSinceLastFrameChange = 0
        this.timeBetweenFrames = 800
        this.canThrow = false           
    }

    drawDK(ctx) {	
        ctx.drawImage(img2, 59.5, 109, 15, 16, 150, 88, 50, 50)
        ctx.drawImage(img2, 59.5, 109, 15, 16, 150, 40, 50, 50)
        ctx.drawImage(img2, 59.5, 109, 15, 16, 195, 88, 50, 50)
        ctx.drawImage(img2, 59.5, 109, 15, 16, 195, 40, 50, 50)

        ctx.drawImage(img2, 18, 243, 20, 22, 510, 5, 50, 50)
    }

    drawFrame(frameData) {  
        const x = frameData[0]
        const width = frameData[1]
        this.sprites.drawSpriteDK(x, 50, width, 38, this.x, this.y, 140, 144)
    }

    step(ctx, elapsed) {
        this.sprites = new sprites(ctx)
        this.throwTimer += elapsed
        if (this.throwTimer >= this.throwInterval) {
            this.throwTimer = 0
            this.canThrow = true 
        } else {
            this.canThrow = false
        }
        this.timeSinceLastFrameChange += elapsed
        if (this.timeSinceLastFrameChange >= this.timeBetweenFrames) {
            this.timeSinceLastFrameChange = 0
            this.loopIndex++
            if (this.loopIndex >= this.loop.length) {
                this.loopIndex = 0
            }
        }
        const frameData = this.loop[this.loopIndex] //fotogramma
        this.drawFrame(frameData)
    }

    update(ctx, elapsed) {
        this.step(ctx, elapsed)
        this.drawDK(ctx)
    }
}