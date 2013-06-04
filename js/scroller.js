/*
http://github.com/mmmpa/
*/
/// <reference path="jquery.d.ts" />
/// <reference path="easer.ts"/>
var Scroller = (function () {
    function Scroller() { }
    Scroller.start = function start(frames, margin) {
        if (typeof frames === "undefined") { frames = 10; }
        if (typeof margin === "undefined") { margin = -10; }
        var scroll_id;
        var def_height = $('body').innerHeight();
        $('a').each(function (i, elm) {
            var anc = $(elm);
            var result = anc.attr('href').match(/#.+/);
            if(!result) {
                return;
            }
            anc.click(Scroller.scroll(result[0], frames, margin));
        });
    };
    Scroller.scroll = function scroll(anchor, frames, margin) {
        var target = $(anchor);
        if(!target) {
            return function () {
            };
        }
        return function () {
            Scroller.interval_id && clearInterval(Scroller.interval_id);
            var target_y = target.position().top + margin;
            var body_height = $('body').innerHeight();
            var win_height = $(window).innerHeight();
            var req_height = body_height - target_y;
            var max_scroll = body_height - win_height;
            var end = req_height > win_height ? target_y : max_scroll;
            var start = $(window).scrollTop();
            var ease = EaseName.EXPONENTIAL.make(EaseMode.IN_OUT, frames, 5);
            var moves = Easer.compute(start, end, ease);
            Scroller.interval_id = setInterval(function () {
                if(moves.length === 0) {
                    clearInterval(Scroller.interval_id);
                    return;
                }
                var away = target_y - (target.position().top + margin);
                $(window).scrollTop(Math.floor(moves.shift() + away));
            }, 20);
            return false;
        };
    };
    return Scroller;
})();
