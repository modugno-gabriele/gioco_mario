document.addEventListener("keydown", function(event) {
  switch (event.key) {
    case "w": 
      if (!Mario.isJumping) {
        Mario.jump();
      }
      break;
    case "a": 
      Mario.speedX = -2;
      break;
    case "d": 
      Mario.speedX = 2;
      break;
  }
});

document.addEventListener("keyup", function(event) {
  switch (event.key) {
    case "a": 
    case "d": 
      Mario.speedX = 0;
      break;
  }
});
var running = [
  "https://i.ibb.co/Dfzz7BCk/Mario0.png",
  "https://i.ibb.co/SwYP2dvM/Screenshot-2025-04-25-113943.png",
  "https://i.ibb.co/Lsvz8BK/Screenshot-2025-04-25-114015.png",
  "https://i.ibb.co/MyJMFjHX/Screenshot-2025-04-25-114031.png"
];


const Mario = {
  speedX: 0,
  speedY: 0,
  width: 30,
  height: 30,
  x: 0,
  y: 700,
  imageList: [],
  contaFrame: 0, //contatore
  actualFrame: 0, 
  gravity: 0.10,
  gravitySpeed: 0,
  jumpForce: 5,
  tryX: 0,
  tryY: 0,
  jumpImage: "https://i.ibb.co/XHGBjNz/Screenshot-2025-04-25-114038.png", 
  isJumping: false, // Stato per verificare se sta saltando
 
  update: function() {
    this.gravitySpeed += this.gravity;
    this.tryY = this.y + this.speedY + this.gravitySpeed;
    this.tryX = this.x + this.speedX;

    
    var piattaforme = [piattaforma, piattaforma2, piattaforma3, piattaforma4, piattaforma5];

    
    let collisionVertical = false;
    for (let piattaforma of piattaforme) {
        if (
            this.tryY + this.height > piattaforma.y && // Mario sta cadendo sopra la piattaforma
            this.tryY < piattaforma.y + piattaforma.height && // Mario non è sotto la piattaforma
            this.x + this.width > piattaforma.x && // Mario è sopra la piattaforma (asse X)
            this.x < piattaforma.x + piattaforma.width) // Mario è sopra la piattaforma (asse X)
        { if (this.gravitySpeed > 0) {
              collisionVertical = true;
              this.y = piattaforma.y - this.height; // Posiziona Mario sopra la piattaforma
              this.gravitySpeed = 0; 
              this.isJumping = false;}
        else if (this.gravitySpeed < 0) {
                // Collisione dal basso: Mario colpisce la parte inferiore della piattaforma
                collisionVertical = true;
                this.y = piattaforma.y + piattaforma.height; // Posiziona Mario sotto la piattaforma
                this.gravitySpeed = 0;} // Ferma il movimento verso l'alto
        break;}
        
    }

    // Se non c'è collisione verticale, aggiorna la posizione verticale
    if (!collisionVertical) {
        this.y = this.tryY;
    }

    // Aggiorna la posizione orizzontale (senza verificare collisioni orizzontali)
    this.x = this.tryX;

    // Limita Mario ai confini della canvas
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > 800) this.x = 800 - this.width;
    if (this.y < 0) this.y = 0;

    this.hitBottom();
    this.contaFrame++;

    if (!this.isJumping) {
        if (this.contaFrame >= 4) { 
            this.contaFrame = 0;
            this.actualFrame = (this.actualFrame + 1) % this.imageList.length;
            this.image = this.imageList[this.actualFrame];
        }
    }
  },

  hitBottom: function() {
    var rockbottom = 600 - this.height;
    if (this.y >= rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;

      if (this.isJumping) {
        this.isJumping = false;
        this.image = this.imageList[this.actualFrame];
      }
    }
  },

 /* 
  crashWith: function(otherobj) {
    var myleft = this.tryX;
    var myright = this.tryX + this.width;
    var mytop = this.tryY;
    var mybottom = this.tryY + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;

    
    if (
        mybottom > othertop &&
        mytop < otherbottom &&
        myright > otherleft &&
        myleft < otherright
    ) {

        this.y = othertop - this.height;
        this.gravitySpeed = 0; 
        return true;
    }
    return false;
  },*/

  loadImages: function() {
    this.image = new Image(this.width, this.height);
    this.image.src = "https://i.ibb.co/mrp8W892/mario0.png";

    for (imgPath of running) {
      var img = new Image(this.width, this.height);
      img.src = imgPath;
      this.imageList.push(img);
    }
    this.image = this.imageList[this.actualFrame];
  },

  jump: function() {
    if (!this.isJumping) {
        this.gravitySpeed = -this.jumpForce;

        this.isJumping = true;
        this.image.src = this.jumpImage;
    }
  }
};
