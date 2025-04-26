function startGame() {
  myGameArea.start();
  Mario.loadImages();
  console.log(piattaforma);
  piattaforma.loadImages();
  console.log(piattaforma2);
  piattaforma2.loadImages();
  console.log(piattaforma3);
  piattaforma3.loadImages();
  piattaforma4.loadImages();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 800;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea
  },

  draw: function(component) {
    this.context.fillStyle = component.color;
    this.context.fillRect(
      component.x,
      component.y,
      component.width,
      component.height
    );
  },

  drawGameObject: function(gameObject) {
    this.context.drawImage(
      gameObject.image,
      gameObject.x,
      gameObject.y,
      gameObject.width,
      gameObject.height
    );
  },

  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

function updateGameArea() {
  myGameArea.clear();
  Mario.update();
  myGameArea.drawGameObject(Mario);
  myGameArea.drawGameObject(piattaforma);
  myGameArea.drawGameObject(piattaforma2);
  myGameArea.drawGameObject(piattaforma3);
  myGameArea.drawGameObject(piattaforma4);
}

function moveup() {
  Mario.jump();
}

function moveleft() {
  Mario.speedX -= 2;
}

function moveright() {
  Mario.speedX = 2;
}

function clearmove() {
  Mario.speedX = 0;
  Mario.speedY = 0;
}
