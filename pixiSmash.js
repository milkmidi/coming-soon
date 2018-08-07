var Observable = Rx.Observable;
const DECAY = 0.9;
const GRAVITY = 1;
var offsetX = 0;
class Particle extends PIXI.Sprite {
  constructor(baseTexture, x, y, size) {
    const texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, size, size));
    super(texture);
    this.lock = true;
    this.vx = 0;
    this.vy = 0;
    this.onFloor= false;
    this.offsetX = 0;
  }
  setBasePosition(x, y) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
  }
  smash(vx, vy) {
    this.vx = vx;
    this.vy = vy;
    this.lock = false;
  }
  tick() {
    if (this.lock) {
      return;
    }
    const {innerWidth, innerHeight} = window;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.vx * (Math.PI / 180);
    this.alpha = 0.75;

    if (this.onFloor) {
      this.vx *= DECAY;
      if (Math.abs(this.vx) < 0.5) {
        this.lock = true;
        setTimeout(() => {
          TweenMax.to(this, 0.3, {
            x: this.baseX,
            y: this.baseY,
            rotation: 0,
            alpha: 1,
            onComplete: () => {
              this.onFloor = false;
            },
          });
        }, 1600);
      }
    } else {
      this.vy += GRAVITY;
      if (Math.abs(this.vy) < 0.5 && this.y >= innerHeight - 10) {
        this.onFloor = true;
        this.vy = 0;
        this.y = innerHeight;
      }
    }
    if (this.x < 0) {
      this.vx *= -0.5;
    } else if (this.x > innerWidth) {
      this.x = innerWidth;
      this.vx *= -0.5;
    }
    if (this.y > innerHeight) {
      this.y = innerHeight;
      this.vy *= -0.5;
    }
  }
}

class App {
  constructor(view) {
    this.view = view;
    this.objectsArr = [];
    const img = new Image();
    img.src = './img/coming-soon-512.png'
    img.onload = () => {
      this.init(view, img);
    };
  }
  onTick = () => {
    this.objectsArr.forEach((p) => {
      p.tick();
    });
  }
  init(view, img) {
    const { innerWidth, innerHeight } = window;
    const app = new PIXI.Application(innerWidth, innerHeight, {
      antialias: true,
      transparent: false,
      view,
      forceCanvas: false,
      roundPixels: true,
    });
    this.app = app;
    this.app.ticker.add(this.onTick);


    const IMAGE_WIDTH = img.width;
    const IMAGE_HEIGHT = img.height;
    const CUBE_SIZE = 4;

    const C = IMAGE_WIDTH / CUBE_SIZE;
    const R = IMAGE_HEIGHT / CUBE_SIZE;
    const COUNT = R * C;
    const OFFSET_X = (innerWidth - IMAGE_WIDTH) / 2;

    const sprites = new PIXI.particles.ParticleContainer(COUNT, {
      scale: false,
      position: true,
      rotation: false,
      uvs: false,
      alpha: false,
    })
    this.app.stage.addChild(sprites);

    const baseTexture = PIXI.BaseTexture.from(img);

    for (let i = 0; i < COUNT; i++) {
      const col = i % R;
      const row = Math.floor(i / R);
      const x = col * CUBE_SIZE;
      const y = row * CUBE_SIZE;
      const particle = new Particle(baseTexture, x, y, CUBE_SIZE);
      particle.setBasePosition(x +OFFSET_X , y + 10);
      sprites.addChild(particle);
      this.objectsArr.push(particle);
    }
    this.registerEvent();
    
    Observable.fromEvent(window, 'resize')
      .debounceTime(150)
      .startWith(window)
      .subscribe(() => {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        offsetX = (innerWidth - IMAGE_WIDTH) / 2;
        /* this.objectsArr.forEach((p) => {
          const OFFSET_X = (innerWidth - IMAGE_WIDTH) / 2;
          p.baseX = 
        }); */
      })
  }
  registerEvent() {
    const mousedown = Observable.fromEvent(this.view, 'mousedown');
    const mousemove = Observable.fromEvent(document, 'mousemove');
    const mouseup = Observable.fromEvent(document, 'mouseup');

    const mousedrag = mousedown.flatMap(() => mousemove.map((e) => {
      e.preventDefault();
      return {
        left: e.moveMomentX,
        top: e.moveMomentY,
      };
    }).takeUntil(mouseup));

    this.mouseDragSubscribe = Observable.merge(mousedown, mousedrag).subscribe(() => {
      const { x, y } = this.app.renderer.plugins.interaction.mouse.global;
      this.smash(x, y);
    });

  }
  smash(x, y) {
    const stageX = x;
    const stageY = y;
    this.objectsArr.forEach((p) => {
      const radius = Math.sqrt(Math.pow(p.x - stageX, 2) + Math.pow(p.y - stageY, 2));
      if (radius < 40) {
        if (p.lock) {
          const vx = ((Math.random() * 10) - 5) * 4;
          const vy = ((Math.random() * 10) - 5) * 4;
          p.smash(vx, vy);
        }
      }
    });
  }
  destroy() {
    if (this.mouseDragSubscribe) {
      this.mouseDragSubscribe.unsubscribe();
      this.mouseDragSubscribe = null;
    }
    this.app.ticker.remove(this.onTick);
    this.app.destroy();
    this.app = null;
  }
}

var app = new App(document.getElementById('canvas'));

