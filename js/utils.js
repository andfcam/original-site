class Utils {
    static toRadians = (degrees) => {
        return degrees / 180 * Math.PI;
    }

    static outOfBounds = (x, y) => {
        return (x >= game.canvas.width || x <= 0
            || y >= game.canvas.height || y <= 0)
    }

    static calculateAngle = (mouse) => {
        const x = game.ship.image.getBoundingClientRect().x + game.ship.size;
        const y = game.ship.image.getBoundingClientRect().y + game.ship.size;
        const relativeX = mouse.clientX - x;
        const relativeY = mouse.clientY - y;
        return Math.atan2(relativeY, relativeX) * 180 / Math.PI;
    }

    static objectsCollide = (laser, element) => {
        const x1 = this.toDocumentSpace(laser.x, 'x', 'canvas');
        const y1 = this.toDocumentSpace(laser.y, 'y', 'canvas');
        const x2 = this.toDocumentSpace(laser.tailX, 'x', 'canvas');
        const y2 = this.toDocumentSpace(laser.tailY, 'y', 'canvas');

        const left = this.toDocumentSpace(element.x, 'x', 'viewport');
        const top = this.toDocumentSpace(element.y, 'y', 'viewport');
        const right = this.toDocumentSpace(element.x + element.width, 'x', 'viewport');
        const bottom = this.toDocumentSpace(element.y + element.height, 'y', 'viewport');

        const leftCollision = this.linesIntersect(x1, y1, x2, y2, left, top, left, bottom);
        const topCollision = this.linesIntersect(x1, y1, x2, y2, left, top, right, top);
        const rightCollision = this.linesIntersect(x1, y1, x2, y2, right, top, right, bottom);
        const bottomCollision = this.linesIntersect(x1, y1, x2, y2, left, bottom, right, bottom);

        if (leftCollision || topCollision || rightCollision || bottomCollision) {
            return true;
        }
        return false;
    }

    static toDocumentSpace = (coord, axis, space) => {
        switch (space) {
            case 'canvas':
                switch (axis) {
                    case 'x': return coord + game.parent.offsetLeft;
                    case 'y': return coord + game.parent.offsetTop;
                    default: console.log('Invalid axis specified.');
                }
            case 'viewport':
                switch (axis) {
                    case 'x': return coord + window.scrollX;
                    case 'y': return coord + window.scrollY;
                    default: console.log('Invalid axis specified.');
                }
            default: console.log('Invalid space specified.');
        }
        return;
    }

    static linesIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
        const lengthA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        const lengthB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

        if (lengthA >= 0 && lengthA <= 1 && lengthB >= 0 && lengthB <= 1) {
            return true;
        }
        return false;
    }
}
