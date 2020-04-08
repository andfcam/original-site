class Laser {
    constructor(x, y, angle) {
        this.x = this.tailX = x;
        this.y = this.tailY = y;
        this.angle = angle;
        this.speed = 7.5;
    }

    update = () => {
        const xMovement = Math.cos(Utils.toRadians(this.angle)) * this.speed;
        const yMovement = Math.sin(Utils.toRadians(this.angle)) * this.speed;
        // tail subtracts xMovement to essentially double the laser length
        this.tailX = this.x - xMovement;
        this.tailY = this.y - yMovement;
        this.x += xMovement;
        this.y += yMovement;
    }

    draw = () => {
        game.ctx.strokeStyle = 'red';
        game.ctx.lineWidth = 2;
        game.ctx.lineCap = "round";

        game.ctx.beginPath();
        game.ctx.moveTo(this.tailX, this.tailY);
        game.ctx.lineTo(this.x, this.y);
        game.ctx.stroke();
    }
}