Scroller
========

アンカーに加速してスクロールするやつ。

例
-
    <script type="text/javascript" src="/js/jquery.js"></script>
    <script type="text/javascript" src="/js/easer.js"></script>
    <script type="text/javascript" src="/js/scroller.js"></script>
JQuery と Easer と一緒に読み込み。  
Easer https://github.com/mmmpa/Easer

    // Scroller.start(frames, margin);
    Scroller.start(20,-10);
frames = 秒間 50 動作と考えたときの到達コマ数。
margin = アンカー上部からどれだけずらすか。
