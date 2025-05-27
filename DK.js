const DK = {
  width: 100,
  height: 80,
  x: 50, // Posizione iniziale sull'asse X
  y: 10, // Posizione iniziale sull'asse Y
  imageList: [],
  contaFrame: 0, // Contatore per l'animazione
  actualFrame: 0, // Frame attuale
  image: null, // Immagine corrente

  loadImages: function() {
    const spritePaths = [
      "https://i.ibb.co/23Kp9vxQ/dk1.png",
      "https://i.ibb.co/Gfn4N5B7/dk2.png",
      "https://i.ibb.co/sdfXcLzg/dk3.png"
    ];

    for (let imgPath of spritePaths) {
      const img = new Image(this.width, this.height);
      img.src = imgPath;
      this.imageList.push(img);
    }
    this.image = this.imageList[this.actualFrame];
  },

  update: function() {
    this.contaFrame++;
    if (this.contaFrame >= 13) { // Cambia frame ogni 4 aggiornamenti
      this.contaFrame = 0;
      this.actualFrame = (this.actualFrame + 1) % this.imageList.length;
      this.image = this.imageList[this.actualFrame];
    }
  },

  draw: function(context) {
    if (this.image) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
};

// Esempio di utilizzo
DK.loadImages();

// Nel ciclo di gioco, chiama StaticObject.update() e StaticObject.draw(context)