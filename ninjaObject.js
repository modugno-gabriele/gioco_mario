var running = [
  "https://i.ibb.co/mrp8W892/mario0.png",
  "https://i.ibb.co/jvnP8hqK/Run-2.png",
  "https://i.ibb.co/WvpTgw99/Run-3.png",
  "https://i.ibb.co/5gQC2H4d/Run-4.png",
  "https://i.ibb.co/s9zbF1Lw/Run-5.png",
  "https://i.ibb.co/xq3vQ7YH/Run-6.png",
  "https://i.ibb.co/8nt1C4wS/Run-7.png",
  "https://i.ibb.co/8nMT5Ph0/Run-8.png",
];

var ninjaObject = {
  speedX: 0,
  speedY: 0,
  width: 60,
  height: 60,
  x: 0,
  y: 800,
  imageList: [],
  contaFrame: 0,
  actualFrame: 0,
  gravity: 0.05,
  gravitySpeed: 0,
  bounce: 0,
  jumpForce: 2,
  tryX: 0,
  tryY: 0,

  update: function() {
    this.gravitySpeed += this.gravity;
    this.tryY = this.y + this.speedY + this.gravitySpeed;
    this.tryX = this.x + this.speedX;

    var collision = this.crashWith(bushObject);
  
    this.hitBottom();
    this.contaFrame++;
    if (this.contaFrame == 3) {
      this.contaFrame = 0;
      this.actualFrame = (1 + this.actualFrame) % this.imageList.length;
      this.image = this.imageList[this.actualFrame];
    }
  },

  hitBottom: function() {
    var rockbottom = 270 - this.height;
    if (this.y >= rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;
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

  jump() {
    this.gravitySpeed = -this.jumpForce;
  }
};
