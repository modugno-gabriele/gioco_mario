let img = new Image()
img.src = './mario_and_luigi_sprites.png'

export class piattaforma {
    constructor(x, y, w) {
        this.x = x
        this.y = y
        this.w = w
    }

    drawpiattaforma(ctx) {
        const spriteX = 152
        const spriteY = 154
        const spriteWidth = 9
        const spriteHeight = 8
        
        for (let i = 0; i < this.w; i++) { //disegna tanti segmenti quanti specificati
            const x = this.x + i * 15 // ogni blocco è spaziato di 15 pixel a destra del precedente.
            ctx.drawImage(img, spriteX, spriteY, spriteWidth, spriteHeight, x, this.y, 20, 24)
        }
    }
}


