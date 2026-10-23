type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  radius: number;
  born: number;
  variant: number;
};
type Point = { x: number; y: number };
const clamp = (value: number, low: number, high: number) =>
  Math.max(low, Math.min(high, value));

/** Bounded capsule bodies. No framework state or DOM writes in the solver. */
export class BeanWorld {
  width: number;
  height: number;
  bodies: Body[] = [];
  elapsed = 0;
  private ratio = 185 / 256;
  private sprites: HTMLCanvasElement[] = [];
  private random = Math.random;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setImage(image: HTMLImageElement) {
    this.ratio = image.naturalWidth / image.naturalHeight;
    this.sprites = [0.87, 1, 1.08].map((brightness) => {
      const sprite = document.createElement("canvas");
      sprite.width = 256;
      sprite.height = 350;
      const context = sprite.getContext("2d")!;
      context.shadowColor = "rgba(43,29,23,.26)";
      context.shadowBlur = 6;
      context.shadowOffsetY = 4;
      context.filter = `brightness(${brightness})`;
      context.drawImage(image, 24, 20, 208, 288);
      return sprite;
    });
  }

  reset(staticPile = false) {
    this.elapsed = 0;
    const mobile = this.width < 700;
    const count = mobile ? 38 : 76;
    this.bodies = Array.from({ length: count }, (_, index) => {
      const radius = (mobile ? 13 : 17) + this.random() * (mobile ? 7 : 12);
      return {
        x: radius * 2 + this.random() * Math.max(1, this.width - radius * 4),
        y: index < 8 ? this.random() * this.height * 0.22 - 30 : -radius * 3,
        vx: (this.random() - 0.5) * 90,
        vy: 10 + this.random() * 80,
        angle: this.random() * Math.PI * 2,
        spin: (this.random() - 0.5) * 3,
        radius,
        born: index < 8 ? 0 : (index - 8) * 0.052,
        variant: index % 3,
      };
    });
    if (staticPile) {
      const spacing = mobile ? 39 : 53;
      const columns = Math.max(1, Math.floor((this.width - 36) / spacing));
      for (const [index, body] of this.bodies.entries()) {
        body.x = 25 + (index % columns) * spacing + this.random() * 10;
        body.y =
          this.height - 28 - Math.floor(index / columns) * spacing * 0.75;
        body.born = 0;
        body.vx = body.vy = body.spin = 0;
      }
      for (let pass = 0; pass < 18; pass++) this.solve();
    }
  }

  resize(width: number, height: number) {
    const scale = width / Math.max(1, this.width);
    const dy = height - this.height;
    this.width = width;
    this.height = height;
    for (const body of this.bodies) {
      body.x = clamp(body.x * scale, body.radius, width - body.radius);
      body.y += dy;
    }
    for (let pass = 0; pass < 4; pass++) this.solve();
  }

  advance(dt: number) {
    this.elapsed += dt;
    for (const body of this.bodies) {
      if (body.born > this.elapsed) continue;
      body.vy = Math.min(1250, body.vy + 1000 * dt);
      body.vx *= 0.998;
      body.spin *= 0.997;
      body.x += body.vx * dt;
      body.y += body.vy * dt;
      body.angle += body.spin * dt;
    }
    for (let pass = 0; pass < 3; pass++) this.solve();
  }

  private shape(body: Body) {
    const height = body.radius * 2.5;
    const width = height * this.ratio;
    const half = (height - width) / 2;
    const dx = -Math.sin(body.angle) * half;
    const dy = Math.cos(body.angle) * half;
    return {
      a: { x: body.x - dx, y: body.y - dy },
      b: { x: body.x + dx, y: body.y + dy },
      radius: width / 2,
      inverseMass: 1 / (body.radius * body.radius),
      inverseInertia:
        12 / (body.radius * body.radius * (width * width + height * height)),
    };
  }

  private closest(a: Point, b: Point, c: Point, d: Point): [Point, Point] {
    const ux = b.x - a.x,
      uy = b.y - a.y;
    const vx = d.x - c.x,
      vy = d.y - c.y;
    const rx = a.x - c.x,
      ry = a.y - c.y;
    const aa = ux * ux + uy * uy,
      ee = vx * vx + vy * vy;
    const bb = ux * vx + uy * vy,
      cc = ux * rx + uy * ry,
      ff = vx * rx + vy * ry;
    const denominator = aa * ee - bb * bb;
    let s =
      Math.abs(denominator) > 0.00001
        ? clamp((bb * ff - cc * ee) / denominator, 0, 1)
        : 0;
    let t = ee > 0.00001 ? (bb * s + ff) / ee : 0;
    if (t < 0) {
      t = 0;
      s = aa > 0.00001 ? clamp(-cc / aa, 0, 1) : 0;
    } else if (t > 1) {
      t = 1;
      s = aa > 0.00001 ? clamp((bb - cc) / aa, 0, 1) : 0;
    }
    return [
      { x: a.x + ux * s, y: a.y + uy * s },
      { x: c.x + vx * t, y: c.y + vy * t },
    ];
  }

  private boundary(body: Body) {
    const shape = this.shape(body);
    const left = Math.min(shape.a.x, shape.b.x) - shape.radius;
    const right = Math.max(shape.a.x, shape.b.x) + shape.radius;
    const bottom = Math.max(shape.a.y, shape.b.y) + shape.radius;
    if (left < 2) {
      body.x += 2 - left;
      body.vx = Math.abs(body.vx) * 0.38;
      body.spin *= 0.8;
    }
    if (right > this.width - 2) {
      body.x -= right - this.width + 2;
      body.vx = -Math.abs(body.vx) * 0.38;
      body.spin *= 0.8;
    }
    if (bottom > this.height - 5) {
      body.y -= bottom - this.height + 5;
      const contact = shape.a.y > shape.b.y ? shape.a : shape.b;
      const arm = contact.x - body.x;
      const speed = body.vy + body.spin * arm;
      if (speed > 0) {
        const bounce = speed > 70 ? 0.24 : 0;
        const impulse =
          (-(1 + bounce) * speed) /
          (shape.inverseMass + arm * arm * shape.inverseInertia);
        body.vy += impulse * shape.inverseMass;
        body.spin += arm * impulse * shape.inverseInertia;
      }
      body.vx *= 0.94;
      body.spin *= 0.94;
      if (Math.abs(body.vy) < 12) body.vy = 0;
    }
  }

  private solve() {
    const live = this.bodies.filter((body) => body.born <= this.elapsed);
    for (let i = 0; i < live.length; i++) {
      const a = live[i];
      for (let j = i + 1; j < live.length; j++) {
        const b = live[j];
        const bounds = (a.radius + b.radius) * 1.26;
        if ((a.x - b.x) ** 2 + (a.y - b.y) ** 2 > bounds * bounds) continue;
        const sa = this.shape(a),
          sb = this.shape(b);
        const [pa, pb] = this.closest(sa.a, sa.b, sb.a, sb.b);
        let dx = pb.x - pa.x,
          dy = pb.y - pa.y;
        let distance = Math.hypot(dx, dy);
        const overlap = sa.radius + sb.radius - distance;
        if (overlap <= 0) continue;
        if (distance < 0.001) {
          dx = b.x - a.x || 0.01;
          dy = b.y - a.y || 0.01;
          distance = Math.hypot(dx, dy);
        }
        const nx = dx / distance,
          ny = dy / distance;
        const totalMass = sa.inverseMass + sb.inverseMass;
        const correction = (Math.max(0, overlap - 0.12) * 0.64) / totalMass;
        a.x -= nx * correction * sa.inverseMass;
        a.y -= ny * correction * sa.inverseMass;
        b.x += nx * correction * sb.inverseMass;
        b.y += ny * correction * sb.inverseMass;
        const x = (pa.x + pb.x) / 2,
          y = (pa.y + pb.y) / 2;
        const ax = x - a.x,
          ay = y - a.y,
          bx = x - b.x,
          by = y - b.y;
        const rvx = b.vx - b.spin * by - a.vx + a.spin * ay;
        const rvy = b.vy + b.spin * bx - a.vy - a.spin * ax;
        const speed = rvx * nx + rvy * ny;
        if (speed >= 0) continue;
        const ca = ax * ny - ay * nx,
          cb = bx * ny - by * nx;
        const impulse =
          (-(speed < -70 ? 1.22 : 1) * speed) /
          (totalMass +
            ca * ca * sa.inverseInertia +
            cb * cb * sb.inverseInertia);
        let ix = impulse * nx,
          iy = impulse * ny;
        const tx = -ny,
          ty = nx;
        const ta = ax * ty - ay * tx,
          tb = bx * ty - by * tx;
        const friction = clamp(
          -(rvx * tx + rvy * ty) /
            (totalMass +
              ta * ta * sa.inverseInertia +
              tb * tb * sb.inverseInertia),
          -impulse * 0.3,
          impulse * 0.3,
        );
        ix += friction * tx;
        iy += friction * ty;
        a.vx -= ix * sa.inverseMass;
        a.vy -= iy * sa.inverseMass;
        b.vx += ix * sb.inverseMass;
        b.vy += iy * sb.inverseMass;
        a.spin = clamp(a.spin - (ax * iy - ay * ix) * sa.inverseInertia, -9, 9);
        b.spin = clamp(b.spin + (bx * iy - by * ix) * sb.inverseInertia, -9, 9);
      }
    }
    for (const body of live) this.boundary(body);
  }

  scatter(direction = 0) {
    for (const body of this.bodies) {
      if (body.born > this.elapsed) continue;
      body.vx = (this.random() - 0.5) * 650 + direction * 320;
      body.vy = -360 - this.random() * 520;
      body.spin = (this.random() - 0.5) * 11;
    }
  }

  nudge(
    x: number,
    y: number,
    previousX: number,
    previousY: number,
    vx: number,
    vy: number,
    touch: boolean,
  ) {
    let hits = 0;
    const reach = touch ? 116 : 87;
    const dx = x - previousX,
      dy = y - previousY;
    const length = dx * dx + dy * dy;
    for (const body of this.bodies) {
      if (body.born > this.elapsed) continue;
      const t =
        length > 0
          ? clamp(
              ((body.x - previousX) * dx + (body.y - previousY) * dy) / length,
              0,
              1,
            )
          : 0;
      const px = body.x - previousX - dx * t,
        py = body.y - previousY - dy * t;
      const distance = Math.hypot(px, py);
      if (distance > reach + body.radius) continue;
      const force = (1 - distance / (reach + body.radius)) ** 2;
      body.vx = clamp(
        body.vx +
          (clamp(vx, -1500, 1500) * 0.43 + (px / Math.max(1, distance)) * 240) *
            force,
        -1200,
        1200,
      );
      body.vy = clamp(
        body.vy +
          (clamp(vy, -1500, 1200) * 0.43 +
            (py / Math.max(1, distance)) * 150 -
            230) *
            force,
        -1100,
        1000,
      );
      body.spin = clamp(body.spin + (vx - vy) * 0.005 * force, -9, 9);
      hits++;
    }
    return hits;
  }

  measure() {
    const live = this.bodies.filter((body) => body.born <= this.elapsed);
    const energy =
      live.reduce(
        (sum, body) =>
          sum + body.vx ** 2 + body.vy ** 2 + (body.spin * body.radius) ** 2,
        0,
      ) / Math.max(1, live.length);
    return {
      count: live.length,
      energy,
      settled: this.elapsed > 6 && energy < 18,
    };
  }

  draw(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, this.width, this.height);
    for (const body of this.bodies) {
      if (body.born > this.elapsed) continue;
      const height = body.radius * 2.5,
        width = height * this.ratio;
      context.save();
      context.translate(body.x, body.y);
      context.rotate(body.angle);
      const sprite = this.sprites[body.variant];
      if (sprite)
        context.drawImage(
          sprite,
          -width * 0.615,
          -height * 0.608,
          width * 1.23,
          height * 1.215,
        );
      else {
        context.fillStyle = "#79543B";
        context.beginPath();
        context.ellipse(0, 0, width / 2, height / 2, 0, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "#2B1D17";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0, -height * 0.4);
        context.bezierCurveTo(-width * 0.3, 0, width * 0.3, 0, 0, height * 0.4);
        context.stroke();
      }
      context.restore();
    }
  }
}
