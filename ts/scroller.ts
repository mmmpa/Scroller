/*
    http://github.com/mmmpa/
*/
/// <reference path="jquery.d.ts" />
/// <reference path="easer.ts"/>

class Scroller {
    static interval_id: number;

    static start(frames: number = 10, margin: number = -10) {
        var scroll_id: number;
        var def_height: number = $('body').innerHeight();

        $('a').each((i: number, elm: HTMLElement): void => {
            var anc: JQuery = $(elm);
            var result: string[] = anc.attr('href').match(/#.+/);
            if (!result) {
                return;
            }
            anc.click(scroll(result[0], frames, margin));
        })
    }

    static scroll(anchor: string, frames: number, margin: number): Function {
        var target: JQuery = $(anchor);
        if (!target) {
            return ()=>{};
        }
        return () => {
            interval_id && clearInterval(interval_id);

            var target_y = target.position().top + margin;

            var body_height: number = $('body').innerHeight();
            var win_height: number = $(window).innerHeight();
            var req_height: number = body_height - target_y;
            var max_scroll: number = body_height - win_height;

            var end: number = req_height > win_height ? target_y : max_scroll;
            var start: number = $(window).scrollTop()

            var ease: number[] = EaseName.EXPONENTIAL.make(EaseMode.IN_OUT, frames, 5);
            var moves: number[] = Easer.compute(start, end, ease);
            interval_id = setInterval(() => {
                if (moves.length === 0) {
                    clearInterval(interval_id);
                    return;
                }
                var away: number = target_y - (target.position().top + margin);
                $(window).scrollTop(Math.floor(moves.shift() + away));
            }, 20)
            return false;
        }
    }
}



