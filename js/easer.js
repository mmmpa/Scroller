/*
http://github.com/mmmpa/Easer
*/
var Easer = (function () {
    function Easer() { }
    Easer.pool = {
    };
    Easer.make = function make(name, mode, frames, lod) {
        console.log(Easer.pool);
        var pool_key = [
            name.name, 
            mode, 
            frames, 
            lod
        ].join('_');
        if(Easer.pool[pool_key] != null) {
            return Easer.pool[pool_key].concat();
        }
        var frames = Math.abs(Math.floor(frames));
        var func = Easer.choiceFunc(mode, name);
        var rates = [];
        var rate = 1 / frames;
        for(var i = 1; i < frames; i++) {
            rates.push(Easer.floorLevel(func(rate * i, 0, 1, 1), lod));
        }
        rates.push(1);
        return (Easer.pool[pool_key] = rates).concat();
    };
    Easer.compute = function compute(start, end, ease) {
        var range = end - start;
        var computed = [];
        ease.forEach(function (value) {
            computed.push(start + range * value);
        });
        return computed;
    };
    Easer.choiceFunc = function choiceFunc(mode, name) {
        switch(mode) {
            case EaseMode.IN:
                return name.ease_in;
            case EaseMode.OUT:
                return name.ease_out;
            case EaseMode.IN_OUT:
                return name.ease_in_out;
            default:
                return name.ease_in_out;
        }
    };
    Easer.floorLevel = function floorLevel(num, level) {
        var rate = Math.pow(10, level);
        return level < 1 ? num : Math.floor(num * rate) / rate;
    };
    return Easer;
})();
var Linear = (function () {
    function Linear() { }
    Linear.make = function make(mode, frames, lod) {
        if (typeof frames === "undefined") { frames = 1; }
        if (typeof lod === "undefined") { lod = 5; }
        return Easer.make(this, mode, frames, lod);
    };
    Linear.ease_in = function ease_in(t, b, c, d) {
        return c * t / d + b;
    };
    Linear.ease_out = function ease_out(t, b, c, d) {
        return c * t / d + b;
    };
    Linear.ease_in_out = function ease_in_out(t, b, c, d) {
        return c * t / d + b;
    };
    return Linear;
})();
var Quadratic = (function () {
    function Quadratic() { }
    Quadratic.make = function make(mode, frames, lod) {
        if (typeof frames === "undefined") { frames = 1; }
        if (typeof lod === "undefined") { lod = 5; }
        return Easer.make(this, mode, frames, lod);
    };
    Quadratic.ease_in = function ease_in(t, b, c, d) {
        t /= d;
        return c * t * t + b;
    };
    Quadratic.ease_out = function ease_out(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    };
    Quadratic.ease_in_out = function ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if(t < 1) {
            return c / 2.0 * t * t + b;
        }
        t = t - 1;
        return -c / 2.0 * (t * (t - 2) - 1) + b;
    };
    return Quadratic;
})();
var Cubic = (function () {
    function Cubic() { }
    Cubic.make = function make(mode, frames, lod) {
        if (typeof frames === "undefined") { frames = 1; }
        if (typeof lod === "undefined") { lod = 5; }
        return Easer.make(this, mode, frames, lod);
    };
    Cubic.ease_in = function ease_in(t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    };
    Cubic.ease_out = function ease_out(t, b, c, d) {
        t /= d;
        t = t - 1;
        return c * (t * t * t + 1) + b;
    };
    Cubic.ease_in_out = function ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if(t < 1) {
            return c / 2.0 * t * t * t + b;
        }
        t = t - 2;
        return c / 2.0 * (t * t * t + 2) + b;
    };
    return Cubic;
})();
var Quartic = (function () {
    function Quartic() { }
    Quartic.make = function make(mode, frames, lod) {
        if (typeof frames === "undefined") { frames = 1; }
        if (typeof lod === "undefined") { lod = 5; }
        return Easer.make(this, mode, frames, lod);
    };
    Quartic.ease_in = function ease_in(t, b, c, d) {
        t /= d;
        return c * t * t * t * t + b;
    };
    Quartic.ease_out = function ease_out(t, b, c, d) {
        t /= d;
        t = t - 1;
        return -c * (t * t * t * t - 1) + b;
    };
    Quartic.ease_in_out = function ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if(t < 1) {
            return c / 2.0 * t * t * t * t + b;
        }
        t = t - 2;
        return -c / 2.0 * (t * t * t * t - 2) + b;
    };
    return Quartic;
})();
var Quintic = (function () {
    function Quintic() { }
    Quintic.make = function make(mode, frames, lod) {
        if (typeof frames === "undefined") { frames = 1; }
        if (typeof lod === "undefined") { lod = 5; }
        return Easer.make(this, mode, frames, lod);
    };
    Quintic.ease_in = function ease_in(t, b, c, d) {
        t /= d;
        return c * t * t * t * t * t + b;
    };
    Quintic.ease_out = function ease_out(t, b, c, d) {
        t /= d;
        t = t - 1;
        return c * (t * t * t * t * t + 1) + b;
    };
    Quintic.ease_in_out = function ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if(t < 1) {
            return c / 2.0 * t * t * t * t * t + b;
        }
        t = t - 2;
        return c / 2.0 * (t * t * t * t * t + 2) + b;
    };
    return Quintic;
})();
var Sinusoidal = (function () {
    function Sinusoidal() { }
    Sinusoidal.make = function make(mode, frames, lod) {
        if (typeof frames === "undefined") { frames = 1; }
        if (typeof lod === "undefined") { lod = 5; }
        return Easer.make(this, mode, frames, lod);
    };
    Sinusoidal.ease_in = function ease_in(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2.0)) + c + b;
    };
    Sinusoidal.ease_out = function ease_out(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2.0)) + b;
    };
    Sinusoidal.ease_in_out = function ease_in_out(t, b, c, d) {
        return -c / 2.0 * (Math.cos(Math.PI * t / d) - 1) + b;
    };
    return Sinusoidal;
})();
var Exponential = (function () {
    function Exponential() { }
    Exponential.make = function make(mode, frames, lod) {
        if (typeof frames === "undefined") { frames = 1; }
        if (typeof lod === "undefined") { lod = 5; }
        return Easer.make(this, mode, frames, lod);
    };
    Exponential.ease_in = function ease_in(t, b, c, d) {
        return c * Math.pow(2, (10 * (t / d - 1))) + b;
    };
    Exponential.ease_out = function ease_out(t, b, c, d) {
        return c * (-(Math.pow(2.0, (-10.0 * t / d))) + 1) + b;
    };
    Exponential.ease_in_out = function ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if(t < 1) {
            return c / 2.0 * Math.pow(2.0, (10.0 * (t - 1))) + b;
        }
        t = t - 1;
        return c / 2.0 * (-(Math.pow(2, (-10 * t))) + 2) + b;
    };
    return Exponential;
})();
var Circular = (function () {
    function Circular() { }
    Circular.make = function make(mode, frames, lod) {
        if (typeof frames === "undefined") { frames = 1; }
        if (typeof lod === "undefined") { lod = 5; }
        return Easer.make(this, mode, frames, lod);
    };
    Circular.ease_in = function ease_in(t, b, c, d) {
        t /= d;
        return -c * (Math.sqrt(1 - t * t) - 1) + b;
    };
    Circular.ease_out = function ease_out(t, b, c, d) {
        t /= d;
        t = t - 1;
        return c * Math.sqrt(1 - t * t) + b;
    };
    Circular.ease_in_out = function ease_in_out(t, b, c, d) {
        t /= d / 2.0;
        if(t < 1) {
            return -c / 2.0 * (Math.sqrt(1 - t * t) - 1);
        }
        t = t - 2;
        return c / 2.0 * (Math.sqrt(1 - t * t) + 1) + b;
    };
    return Circular;
})();
var EaseName = (function () {
    function EaseName() { }
    EaseName.LINEAR = Linear;
    EaseName.QUADRATIC = Quadratic;
    EaseName.CUBIC = Cubic;
    EaseName.QUARTIC = Quartic;
    EaseName.QUINTIC = Quintic;
    EaseName.AINUSOIDAL = Sinusoidal;
    EaseName.EXPONENTIAL = Exponential;
    EaseName.CIRCULAR = Circular;
    return EaseName;
})();
var EaseMode = (function () {
    function EaseMode() { }
    EaseMode.IN = 'ease_in';
    EaseMode.OUT = 'ease_out';
    EaseMode.IN_OUT = 'ease_in_out';
    return EaseMode;
})();
