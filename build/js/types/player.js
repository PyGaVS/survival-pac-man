export class Player {
    constructor() {
        this.score = 0;
        this.posx = 50;
        this.posy = 50;
        this.speed = 3;
        this.element = document.getElementById("player");
        this.screen = document.getElementById("screen");
    }
    move() {
        var _a;
        const rect = this.screen.getBoundingClientRect();
        this.speed = rect.width / 300;
        console.log(this.speed);
        if (this.posy >= rect.height - this.element.offsetHeight - 10) {
            this.changeDirection(undefined, "down");
        }
        else if (this.posy <= 1) {
            this.changeDirection(undefined, "up");
        }
        else if (this.posx <= 1) {
            this.changeDirection(undefined, "right");
        }
        else if (this.posx >= rect.width - this.element.offsetWidth - 10) {
            this.changeDirection(undefined, "left");
        }
        const directions = {
            up: () => {
                this.posy += this.speed;
                this.element.style.bottom = this.posy.toString() + 'px';
            },
            down: () => {
                this.posy -= this.speed;
                this.element.style.bottom = this.posy.toString() + 'px';
            },
            left: () => {
                this.posx -= this.speed;
                this.element.style.left = this.posx.toString() + 'px';
            },
            default: () => {
                this.posx += this.speed;
                this.element.style.left = this.posx.toString() + 'px';
            }
        };
        ((_a = directions[this.direction]) !== null && _a !== void 0 ? _a : directions.default)();
        requestAnimationFrame(() => this.move());
    }
    changeDirection(event, force) {
        if (force) {
            switch (force) {
                case "up":
                    this.direction = "up";
                    this.element.style.transform = "rotate(270deg)";
                    break;
                case "down":
                    this.direction = "down";
                    this.element.style.transform = "rotate(90deg)";
                    break;
                case "left":
                    this.direction = "left";
                    this.element.style.transform = "scaleX(-1)";
                    break;
                case "right":
                    this.direction = "right";
                    this.element.style.transform = "rotate(0deg)";
                    break;
            }
        }
        else {
            switch (event.key) {
                case "ArrowUp":
                    this.direction = "up";
                    this.element.style.transform = "rotate(270deg)";
                    break;
                case "ArrowDown":
                    this.direction = "down";
                    this.element.style.transform = "rotate(90deg)";
                    break;
                case "ArrowLeft":
                    this.direction = "left";
                    this.element.style.transform = "scaleX(-1)";
                    break;
                case "ArrowRight":
                    this.direction = "right";
                    this.element.style.transform = "rotate(0deg)";
                    break;
            }
        }
    }
}
