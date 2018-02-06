var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* 游戏开始界面
*/
var GameStart = /** @class */ (function (_super) {
    __extends(GameStart, _super);
    /***游戏开始界面***/
    function GameStart() {
        var _this = _super.call(this) || this;
        /***游戏资源地址数组***/
        _this.assetArr = [
            { url: 'res/atlas/gameRole.atlas' },
            { url: 'sound/achievement.mp3', type: laya.net.Loader.SOUND },
            { url: 'sound/bullet.mp3', type: laya.net.Loader.SOUND },
            { url: 'sound/enemy1_die.mp3', type: laya.net.Loader.SOUND },
            { url: 'sound/game_over.mp3', type: laya.net.Loader.SOUND },
            { url: 'sound/game_start.mp3', type: laya.net.Loader.SOUND },
            { url: 'sound/level_update.mp3', type: laya.net.Loader.SOUND }
        ];
        //游戏加载未完成暂时不显示，防止点击出错
        _this.btn_start.visible = false;
        //监听界面是否关闭
        _this.once(Laya.Event.CLOSE, _this, _this.onClose);
        //加载剩余游戏资源、音乐、加载完成与加载进度回调方法
        Laya.loader.load(_this.assetArr, Laya.Handler.create(_this, _this.onComplete), Laya.Handler.create(_this, _this.onProgress));
        return _this;
    }
    /**
     * 界面关闭
     */
    GameStart.prototype.onClose = function () {
        //从舞台移除自己
        this.removeSelf();
        //只加载一次，因此直接销毁自己
        this.destroy();
    };
    /**
     * 游戏资源加载完成
     */
    GameStart.prototype.onComplete = function () {
        var _this = this;
        setTimeout(function () {
            //加载完成
            _this.txt_load.text = '游戏资源加载完成，开始游戏吧...';
            //游戏开始按钮显示并弹出
            _this.btn_start.visible = true;
            //加载完成资源时开始播放开始音乐
            laya.media.SoundManager.playSound('sound/game_start.mp3');
            //缓动类弹出动画
            Laya.Tween.from(_this.btn_start, { y: _this.btn_start.y + 20 }, 1000, Laya.Ease.elasticOut);
        }, 1000);
    };
    /**
     * 游戏资源加载进度
     * @param loadNum  进度
     */
    GameStart.prototype.onProgress = function (loadNum) {
        //显示加载进度
        this.txt_load.text = "\u8D44\u6E90\u52A0\u8F7D\u4E2D\uFF0C\u5F53\u524D\u8FDB\u5EA6\uFF1A" + loadNum * 100 + "%";
    };
    return GameStart;
}(ui.GameStartUI));
//# sourceMappingURL=gameStart.js.map