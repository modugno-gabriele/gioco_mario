function startGame() {
  myGameArea.start();
  ninjaObject.loadImages();
  console.log(bushObject);
  bushObject.loadImages();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
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
  ninjaObject.update();
  myGameArea.drawGameObject(ninjaObject);
  myGameArea.drawGameObject(bushObject);
}

function moveup() {
  ninjaObject.jump();
}

function movedown() {
  ninjaObject.speedY = 2;
}

function moveleft() {
  ninjaObject.speedX -= 2;
}

function moveright() {
  ninjaObject.speedX = 2;
}

function clearmove() {
  ninjaObject.speedX = 0;
  ninjaObject.speedY = 0;
}
