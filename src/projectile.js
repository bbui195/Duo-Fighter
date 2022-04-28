

export class Projectile {
    constructor(options) {
        this.image = new Image();
        this.image.src = options.image;
        this.size = options.size;
        this.pos = options.pos;
        this.vel = options.vel;
        this.owner = options.owner;
        this.damage = options.damage;
        this.lifeTime = options.lifeTime;
    }

    getBoundPoints() {
        return {
            xLeft: this.pos.x,
            xRight: this.pos.x + this.size.x,
            yLeft: this.pos.y,
            yRight: this.pos.y + this.size.y
        };
    }

    animate(context) {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        let angle = Math.atan2(this.vel.y, this.vel.x);
        context.save();
        context.translate(this.pos.x, this.pos.y);
        context.rotate(angle);
        
        context.translate(-this.size.x / 2, -this.size.y / 2);
        // context.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y);
        context.drawImage(this.image, 0, 0, this.size.x, this.size.y);
        context.restore();
        this.lifeTime -= 1;
    }
}