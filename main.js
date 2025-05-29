import {Mario} from "./Classes/Mario.js" 
import {DK} from "./Classes/DK.js"
import {Barrel} from "./Classes/Barrel.js"
import {piattaforma} from "./Classes/piattaforma.js"
import {scala} from "./Classes/scala.js"

const canvas = document.getElementById("Canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

let gameState = "title"
let character = "Mario"

let sprites = new Image()
sprites.src = './mario_luigi_sprites2.png'



class Game {
    
    constructor(width, height) {
        this.width = width
        this.height = height
        this.mario = new Mario(200, 608, 35, 52)
        this.dk = new DK(250, -5)
        this.barrels = []
        this.vite = 3

        this.choose = (event) => {
            if (event.key === "enter") {
                character = "Mario"
                ctx.clearRect(200, 600, 85, 30)
                ctx.fillStyle = "red"
                ctx.fillText("Mario", 632, 420)
            } 
        }

        this.piattaforme = [
            new piattaforma(122, 138, 8),
            new piattaforma(245, 138, 8),
            new piattaforma(368, 138, 8),
            new piattaforma(491, 138, 8),
            new piattaforma(614, 138, 9), 
            
            new piattaforma(120, 660, 42),
            new piattaforma(752, 660, 8),
            new piattaforma(875, 660, 8),
            new piattaforma(998, 660, 8),
            new piattaforma(1121, 660, 8),
            new piattaforma(1244, 660, 8),

            new piattaforma(1121, 573, 8),
            new piattaforma(998, 572, 8),
            new piattaforma(875, 569, 8),
            new piattaforma(752, 566, 8),
            new piattaforma(629, 563, 8),
            new piattaforma(506, 561, 8),
            new piattaforma(383, 561, 8),
            new piattaforma(260, 561, 8),
            new piattaforma(182, 561, 5),

            new piattaforma(260, 475, 8),
            new piattaforma(383, 475, 8),
            new piattaforma(506, 473, 8),
            new piattaforma(629, 468, 8),
            new piattaforma(752, 463, 8),
            new piattaforma(875, 458, 8),
            new piattaforma(998, 453, 8),
            new piattaforma(1121, 448, 8),
            new piattaforma(1244, 443, 5),    

            new piattaforma(1121, 375, 8),
            new piattaforma(998, 370, 8),
            new piattaforma(875, 365, 8),
            new piattaforma(752, 360, 8),
            new piattaforma(629, 355, 8),
            new piattaforma(506, 350, 8),
            new piattaforma(383, 349, 8),
            new piattaforma(260, 348, 8),
            new piattaforma(182, 347, 5),

            new piattaforma(260, 262, 8),
            new piattaforma(383, 260, 8),
            new piattaforma(506, 258, 8),
            new piattaforma(629, 253, 8),
            new piattaforma(752, 248, 8),
            new piattaforma(875, 243, 8),
            new piattaforma(998, 238, 8),
            new piattaforma(1121, 233, 8),
            new piattaforma(1244, 228, 5),

            new piattaforma(1121, 158, 8),
            new piattaforma(998, 153, 8),
            new piattaforma(875, 148, 8),
            new piattaforma(752, 143, 8),

            new piattaforma(500, 57, 25),

            new piattaforma(408, 80, 6),
        ]

        this.scala = [
            new scala(1215, 623, 3), 
            new scala(350, 524, 4),
            new scala(1125, 413, 2),
            new scala(300, 310, 4),
            new scala(1125, 196, 2),

            new scala(760, 428, 4),
            new scala(845, 110, 3),
            new scala(410, 100, 7),
            new scala(470, 100, 7),
        ]
    }

    draw(ctx) { 
        for(const scala of this.scala) {
            scala.drawscala(ctx)
        }

        for(const piattaforma of this.piattaforme) {
            piattaforma.drawpiattaforma(ctx)
        }
    }

    updateMario(elapsed) {  //aggiorna posizione e statotenendo conto del tempo trascorso, delle piattaforme, delle scale
        this.mario.update(ctx, this.piattaforme, this.scala, character, elapsed)
    }

    updateBarrels(elapsed) {
        if (this.dk.canThrow) {
            this.barrels.push(new Barrel(this.dk.x + 40, this.dk.y + 100, 30, 30))
            this.dk.canThrow = false
        }

        for(const barrel of this.barrels) {
            barrel.update(ctx, this.piattaforme, this.mario, elapsed)
        }
    }

    updateDK(elapsed) {
        this.dk.update(ctx, elapsed)
    }

    resetGame() {
        this.mario.x = 200
        this.mario.y = 608

        this.barrels = []
    }

    loseLife() {
        for (let i = 0; i < this.barrels.length; i++) {
            if (this.barrels[i].dead) {
                this.vite -= 1
                this.resetGame()
            }
        }

        if (this.mario.y > this.height) {
            this.vite -= 1
            this.resetGame()
        }
    }

    playervite() {
        ctx.fillStyle = 'white'
        const text = `vite: ${this.vite}`
        const textWidth = ctx.measureText(text).width
        const x = canvas.width - textWidth - 10 
        ctx.fillText(text, x + 30, 20)
    }

    gameOver() {
        if (this.vite < 0) {
            gameState = "title"
        }

        else if (this.mario.y + this.mario.height == 57) {
            gameState = "title"
        }
    }

    showTitleScreen() {
        this.vite = 3
        this.resetGame()

        const img = new Image()
        img.src = './dk_title.png'

        img.onload = () => {
            const x = (this.width - 700) / 2
            ctx.drawImage(img, x, 10, 700, 400)            
        }
        
        ctx.fillStyle = 'white'
        ctx.font = '20px "premi invio per iniziare", Arial'
        ctx.textAlign = "center"
        ctx.fillText("premi invio per iniziare", this.width / 2, 500)
       
        // Add event listener for enter key press to start the game
        document.addEventListener("keydown", this.startSelect)
    }

    startSelect = (event) => {
        if (event.key === "Enter" && gameState === "title") {
            document.removeEventListener("keydown", this.startSelect)
            gameState = "character"
            this.characterSelect()
        }
    }

    characterSelect() {

        ctx.clearRect(0, 0, this.width, this.height)

        ctx.fillStyle = 'white'
        ctx.textAlign = "center"
        ctx.fillText("Aiuta Mario a salvare la principessa!!! (premi invio per continuare)", this.width / 2, 200)

        ctx.drawImage(sprites, 38, 17, 15, 18, 822, 300, 60, 90)
     

        ctx.fillStyle = 'red'
        ctx.fillText("Mario", 852, 420)
        
        document.addEventListener("keydown", this.choose)

        document.addEventListener("keydown", (event) => this.startGame(event))
    }

    startGame(event) {
        if (event.key === "Enter" && gameState === "character") {

            // Remove event listener
            document.removeEventListener("keydown", (event) => this.startGame(event))
            document.removeEventListener("keydown", this.choose)
            
            gameState = "game"

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Call the update function to start the game loop
            update()
        }
    }

}

    
const game = new Game(canvas.width, canvas.height)

let previous
    
function update(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (gameState == "game") {

        const elapsed = timestamp - previous || 0
        previous = timestamp
        
        game.draw(ctx)
        game.playervite()
        game.loseLife()
        game.gameOver()
        requestAnimationFrame(update)
        
        

            game.updateMario(elapsed)
            game.updateBarrels(elapsed)
            game.updateDK(elapsed)
        

      
    }

    else if (gameState == "title") {
        game.showTitleScreen()
    }
}

requestAnimationFrame(update)