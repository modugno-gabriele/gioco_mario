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
  gravity: 0.1,
  gravitySpeed: 0,
  jumpForce: 3,
  tryX: 0,
  tryY: 0,
  jumpImage: "https://i.ibb.co/XHGBjNz/Screenshot-2025-04-25-114038.png", // URL dell'immagine di salto
  isJumping: false, // Stato per verificare se sta saltando

  update: function() {
    this.gravitySpeed += this.gravity;
    this.tryY = this.y + this.speedY + this.gravitySpeed;
    this.tryX = this.x + this.speedX;

    var collision = this.crashWith(piattaforma);


    this.hitBottom();
    this.contaFrame++;

    // Cambia immagine solo se non sta saltando
    if (!this.isJumping) {
      if (this.contaFrame >= 3) { // Cambia immagine ogni 3 frame
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
    var crash = true;


    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      this.x = this.tryX;
      this.y = this.tryY;
    }
    else
    {
      var collisionX = false;
      var collisionY = false;
   
      if ((myright > otherleft) || (myleft < otherright)) 
      {
         if (mybottom > othertop)
         {
          this.x = this.tryX;
          this.y = othertop -this.height;
          this.gravitySpeed = 0;
         }
      
      }
      if ((mybottom > othertop) && collisionX==true) 
      {
       collisionY = true;
       this.x = this.tryX;
      }

    }
   
      

    if (mybottom > othertop) return "crash_bottom";
    if (mytop < otherbottom) return "crash_top";
    if (myright > otherleft) return "crash_right";
    if (myleft < otherright) return "crash_left";

    
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
    this.gravitySpeed = -this.jumpForce;

    // Cambia immagine quando salta
    this.isJumping = true;
    this.image.src = this.jumpImage;
  }
};
