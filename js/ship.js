/* need to re-work noseX, noseY, radius */
// icon changed to lens in middle, size still needed
class Ship {
    constructor(image) {
        this.image = image;
        this.angle = 0;
        this.lasers = [];

        this.setPosition();
    }

    setPosition = () => {
        this.size = this.image.width / 2;
        this.x = this.image.getBoundingClientRect().x + this.size + window.scrollX - game.parent.offsetLeft;
        this.y = this.image.getBoundingClientRect().y + this.size + window.scrollY - game.parent.offsetTop;
    }

    rotate = (angle) => {
        this.angle = angle;
        this.noseX = this.x + (this.size * Math.cos(Utils.toRadians(angle)));
        this.noseY = this.y + (this.size * Math.sin(Utils.toRadians(angle)));

        this.image.style.transform = 'rotate(' + angle + 'deg)';
    }

    updateLasers = () => {
        if (this.lasers.length !== 0) {
            for (let i = 0; i < this.lasers.length; i++) {
                this.lasers[i].update();
                if (Utils.outOfBounds(this.lasers[i].x, this.lasers[i].y)) {
                    this.lasers.splice(i, 1);
                    break;
                }
                this.lasers[i].draw();
            }
        }
    }

    fireLaser = () => {
        this.lasers.push(new Laser(this.x, this.y, this.angle));
    }
}