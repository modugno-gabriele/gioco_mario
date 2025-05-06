document.addEventListener("keydown", function(event) {
  switch (event.key) {
    case "w": // Salta
      if (!Mario.isJumping) {
        Mario.jump();
      }
      break;
    case "a": // Muovi a sinistra
      Mario.speedX = -2;
      break;
    case "d": // Muovi a destra
      Mario.speedX = 2;
      break;
  }
});

document.addEventListener("keyup", function(event) {
  switch (event.key) {
    case "a": // Ferma il movimento a sinistra
    case "d": // Ferma il movimento a destra
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

var Mario = {
  speedX: 0,
  speedY: 0,
  width: 30,
  height: 30,
  x: 0,
  y: 900,
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

    // Array di tutte le piattaforme
    var piattaforme = [piattaforma, piattaforma2, piattaforma3, piattaforma4, piattaforma5];

    // Verifica collisioni verticali
    let collisionVertical = false;
    for (let piattaforma of piattaforme) {
        if (
            this.tryY + this.height > piattaforma.y && // Mario sta cadendo sopra la piattaforma
            this.tryY < piattaforma.y + piattaforma.height && // Mario non è sotto la piattaforma
            this.x + this.width > piattaforma.x && // Mario è sopra la piattaforma (asse X)
            this.x < piattaforma.x + piattaforma.width // Mario è sopra la piattaforma (asse X)
        ) {
            if (this.gravitySpeed > 0) {
                // Collisione dall'alto: Mario atterra sulla piattaforma
                collisionVertical = true;
                this.y = piattaforma.y - this.height; // Posiziona Mario sopra la piattaforma
                this.gravitySpeed = 0; // Ferma la caduta
                this.isJumping = false; // Permetti a Mario di saltare di nuovo
            } else if (this.gravitySpeed < 0) {
                // Collisione dal basso: Mario colpisce la parte inferiore della piattaforma
                collisionVertical = true;
                this.y = piattaforma.y + piattaforma.height; // Posiziona Mario sotto la piattaforma
                this.gravitySpeed = 0; // Ferma il movimento verso l'alto
            }
            break;
        }
    }

    // Se non c'è collisione verticale, aggiorna la posizione verticale
    if (!collisionVertical) {
        this.y = this.tryY;
    }

    // Aggiorna la posizione orizzontale (senza verificare collisioni orizzontali)
    this.x = this.tryX;

    this.hitBottom();
    this.contaFrame++;

    // Cambia immagine solo se non sta saltando
    if (!this.isJumping) {
        if (this.contaFrame >= 7) { // Cambia immagine ogni 7 frame
            this.contaFrame = 0;
            this.actualFrame = (this.actualFrame + 1) % this.imageList.length;
            this.image = this.imageList[this.actualFrame];
        }
    }
  },

  hitBottom: function() {
    var rockbottom = 400 - this.height;
    if (this.y >= rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;

      // Ripristina lo stato di salto e l'immagine animata
      if (this.isJumping) {
        this.isJumping = false;
        this.image = this.imageList[this.actualFrame];
      }
    }
  },

  crashWith: function(otherobj) {
    var myleft = this.tryX;
    var myright = this.tryX + this.width;
    var mytop = this.tryY;
    var mybottom = this.tryY + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;

    // Verifica se c'è una collisione
    if (
        mybottom > othertop &&
        mytop < otherbottom &&
        myright > otherleft &&
        myleft < otherright
    ) {
        // Posiziona Mario sopra la piattaforma
        this.y = othertop - this.height;
        this.gravitySpeed = 0; // Ferma la caduta
        return true;
    }
    return false;
  },

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

        // Cambia immagine quando salta
        this.isJumping = true;
        this.image.src = this.jumpImage;
    }
  }
};
