/*
    http://github.com/mmmpa/
*/
class Easer {
    static pool: any = {};

    static make(name: any, mode: string, frames: number, lod: number): number[] {
        console.log(pool)
        var pool_key: string = [name.name, mode, frames, lod].join('_');
        if (pool[pool_key] != null) {
            return pool[pool_key].concat();
        }
        var frames: number = Math.abs(Math.floor(frames));
        var func: Function = choiceFunc(mode, name);
        var rates: number[] = [];
        var rate: number = 1 / frames;
        for (var i = 1; i < frames; i++) {
            rates.push(floorLevel(func(rate * i, 0, 1, 1), lod))
        }
        rates.push(1);
        return (pool[pool_key] = rates).concat();
    }

    static compute(start: number, end: number, ease: number[]): number[] {
        var range: number = end - start;
        var computed: number[] = [];
        ease.forEach((value: number) => {
            computed.push(start + range * value);
        })
        return computed;
    }

    static choiceFunc(mode: string, name: any): Function {
        switch (mode) {
            case EaseMode.IN:
                return name.ease_in;
            case EaseMode.OUT:
                return name.ease_out;
            case EaseMode.IN_OUT:
                return name.ease_in_out;
            default:
                return name.ease_in_out;
        }
    }

    static floorLevel(num: number, level: number): number {
        var rate: number = Math.pow(10, level);
        return level < 1 ? num : Math.floor(num * rate) / rate;
    }
}

class Linear {
    static make(mode: string, frames: number = 1, lod: number = 5): number[] {
        return Easer.make(this, mode, frames, lod);
    }

    static ease_in(t, b, c, d) {
        return c * t / d + b;
    }

    static ease_out(t, b, c, d) {
        return c * t / d + b;
    }

    static ease_in_out(t, b, c, d) {
        return c * t / d + b;
    }
}

class Quadratic {
    static make(mode: string, frames: number = 1, lod: number = 5): number[] {
        return Easer.make(this, mode, frames, lod);
    }

    static ease_in(t, b, c, d) {
        t /= d;
        return c * t * t + b;
    }

    static ease_out(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    }

    static ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if (t < 1) {
            return c / 2.0 * t * t + b;
        }
        t = t - 1;
        return -c / 2.0 * (t * (t - 2) - 1) + b;
    }
}

class Cubic {
    static make(mode: string, frames: number = 1, lod: number = 5): number[] {
        return Easer.make(this, mode, frames, lod);
    }

    static ease_in(t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    }

    static ease_out(t, b, c, d) {
        t /= d;
        t = t - 1;
        return c * (t * t * t + 1) + b;
    }

    static ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if (t < 1) {
            return c / 2.0 * t * t * t + b;
        }
        t = t - 2;
        return c / 2.0 * (t * t * t + 2) + b;
    }
}

class Quartic {
    static make(mode: string, frames: number = 1, lod: number = 5): number[] {
        return Easer.make(this, mode, frames, lod);
    }

    static ease_in(t, b, c, d) {
        t /= d;
        return c * t * t * t * t + b;
    }

    static ease_out(t, b, c, d) {
        t /= d;
        t = t - 1;
        return -c * (t * t * t * t - 1) + b;
    }

    static ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if (t < 1) {
            return c / 2.0 * t * t * t * t + b;
        }
        t = t - 2;
        return -c / 2.0 * (t * t * t * t - 2) + b;
    }
}

class Quintic {
    static make(mode: string, frames: number = 1, lod: number = 5): number[] {
        return Easer.make(this, mode, frames, lod);
    }

    static ease_in(t, b, c, d) {
        t /= d;
        return c * t * t * t * t * t + b;
    }

    static ease_out(t, b, c, d) {
        t /= d;
        t = t - 1;
        return c * (t * t * t * t * t + 1) + b;
    }

    static ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if (t < 1) {
            return c / 2.0 * t * t * t * t * t + b;
        }
        t = t - 2;
        return c / 2.0 * (t * t * t * t * t + 2) + b;
    }
}

class Sinusoidal {
    static make(mode: string, frames: number = 1, lod: number = 5): number[] {
        return Easer.make(this, mode, frames, lod);
    }

    static ease_in(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2.0)) + c + b;
    }

    static ease_out(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2.0)) + b;
    }

    static ease_in_out(t, b, c, d) {
        return -c / 2.0 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
}

class Exponential {
    static make(mode: string, frames: number = 1, lod: number = 5): number[] {
        return Easer.make(this, mode, frames, lod);
    }
    static ease_in(t, b, c, d) {
        return c * Math.pow(2, (10 * (t / d - 1))) + b
    }

    static ease_out(t, b, c, d) {
        return c * (-(Math.pow(2.0, (-10.0 * t / d))) + 1) + b
    }

    static ease_in_out(t, b, c, d) {
        t /= d / 2.0
        if (t < 1) {
            return c / 2.0 * Math.pow(2.0, (10.0 * (t - 1))) + b
        }
        t = t - 1
        return c / 2.0 * (-(Math.pow(2, (-10 * t))) + 2) + b
    }
}

class Circular {
    static make(mode: string, frames: number = 1, lod: number = 5): number[] {
        return Easer.make(this, mode, frames, lod);
    }

    static ease_in(t, b, c, d) {
        t /= d;
        return -c * (Math.sqrt(1 - t * t) - 1) + b;
    }

    static ease_out(t, b, c, d) {
        t /= d;
        t = t - 1;
        return c * Math.sqrt(1 - t * t) + b;
    }

    static ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if (t < 1) {
            return -c / 2.0 * (Math.sqrt(1 - t * t) - 1);
        }
        t = t - 2;
        return c / 2.0 * (Math.sqrt(1 - t * t) + 1) + b;

    }
}

class EaseName {
    static LINEAR: any = Linear;
    static QUADRATIC: any = Quadratic;
    static CUBIC: any = Cubic;
    static QUARTIC: any = Quartic;
    static QUINTIC: any = Quintic;
    static AINUSOIDAL: any = Sinusoidal;
    static EXPONENTIAL: any = Exponential;
    static CIRCULAR: any = Circular;
}

class EaseMode {
    static IN: string = 'ease_in';
    static OUT: string = 'ease_out';
    static IN_OUT: string = 'ease_in_out';
}