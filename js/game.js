class Game {
    constructor(div) {
        this.fps = 60;
        this.parent = div.parentNode;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.elements = [];

        this.ableToShoot = false;
        this.timesFired = 0;

        div.appendChild(this.canvas);

        // needs to work for more than just explicit resize
        window.onresize = this.onResize;
    }

    start = () => {
        this.setCanvasSize();
        this.elements = this.getDomElements();
        this.ship = new Ship(document.getElementById('theodolite'));
        this.script = new Script(document.getElementById('speech-bubble'));
        this.script.advance(0);

        this.interval = setInterval(this.loop.bind(this), 1000 / this.fps);
    }

    onResize = () => {
        this.setCanvasSize();
        this.ship.setPosition();
    }

    setCanvasSize = () => {
        this.canvas.width = this.parent.clientWidth;
        this.canvas.height = this.parent.clientHeight;
    }

    clearCanvas = () => this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    getDomElements = () => {
        this.assignDestructable([...document.querySelectorAll('#surveyor h3, #surveyor hr, #surveyor img')]);
        this.assignDestructableGroup([...document.querySelectorAll('#surveyor h4, #surveyor h5, #surveyor p')]);

        return [...document.querySelectorAll('.destructable')];
    }

    assignDestructable = (elements) => {
        elements.forEach(element => {
            if (element.id != 'theodolite' && element.id != 'switch') {
                element.classList.add('destructable');
            }
        });
    }

    assignDestructableGroup = (elements) => {
        elements.forEach(element => {
            element.innerHTML = this.splitText(element.innerText);
            element.classList.remove('destructable');
        });
    }

    splitText = (words) => {
        let html = "";
        words.split(" ").forEach(word => {
            word = `<span class="destructable">${word} </span>`;
            html += word;
        });
        return html;
    }

    detectCollisions = () => {
        if (this.elements.length !== 0 && this.ship.lasers.length != 0) {
            for (let e = 0; e < this.elements.length; e++) {
                for (let l = 0; l < this.ship.lasers.length; l++) {
                    if (Utils.objectsCollide(this.ship.lasers[l], this.elements[e].getBoundingClientRect())) {
                        this.elements[e].classList.add('destroyed');
                        this.ship.lasers.splice(l, 1);
                        this.checkScriptTriggers(e);
                        this.elements.splice(e, 1);
                    }
                }
            }
        }
    }

    checkScriptTriggers(e) {
        if (this.elements[e].id == 'cover') this.script.advance(4);
        if (this.elements[e].id == 'switch') this.script.advance(5);
    }

    countFire = () => {
        this.timesFired++;
        switch (this.timesFired) {
            case 1:
                this.script.advance(1);
                break;
            case 6:
                this.script.advance(2);
                break;
            default:
                break;
        }
    }

    apocalypse = () => {
        this.elements.forEach(element => {
            element.classList.add('destroyed');
        });
        this.elements.length = 0;
        this.parent.style.backgroundColor = "black";
    }

    listenForShot = () => {
        document.body.onmousedown = () => {
            if (this.ableToShoot) {
                this.ship.fireLaser();
                this.countFire();
            }
        };
    }

    listenForMove = () => {
        document.body.onmousemove = (mouse) => {
            this.ship.rotate(Utils.calculateAngle(mouse));
        };
    }

    loop = () => {
        this.clearCanvas();
        this.listenForShot();
        this.listenForMove();
        this.ship.updateLasers();
        this.detectCollisions();
    }
}