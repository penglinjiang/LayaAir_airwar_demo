/**
 * 游戏结束界面
 * @author plj
 *
 */
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
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    /**
     * 游戏结束界面
     */
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.btn_restart.on(Laya.Event.MOUSE_DOWN, _this, _this.onRestart);
        return _this;
    }
    /**游戏重新开始 */
    GameOver.prototype.onRestart = function () {
        //播放IDE中编辑的按钮动画
        this.ani_restart.play(0, false);
        //监听动画完成事件，注意用once
        this.ani_restart.on(Laya.Event.COMPLETE, this, this.aniComplete);
    };
    /**按钮动画播放完成 */
    GameOver.prototype.aniComplete = function () {
        //发送重新开始事件，在main类中监听
        this.event('reStart');
        //缓动动画关闭效果。IDE中页面为Dialog才可用
        this.close();
    };
    return GameOver;
}(ui.GameOverUI));
//# sourceMappingURL=gameOver.js.map