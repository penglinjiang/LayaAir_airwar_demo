/**
 * 游戏内UI,血量、积分、等级显示、暂停等
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
var GamePlay = /** @class */ (function (_super) {
    __extends(GamePlay, _super);
    /**
     * 游戏内UI,血量、积分、等级显示、暂停等
     */
    function GamePlay() {
        var _this = _super.call(this) || this;
        _this.btn_pause.on(Laya.Event.MOUSE_DOWN, _this, _this.onPause);
        return _this;
    }
    /**游戏暂停 */
    GamePlay.prototype.onPause = function () {
        //显示IDE中隐藏的暂停界面
        this.gamePause.visible = true;
        //暂停界面增加点击一次的监听
        this.gamePause.once(Laya.Event.MOUSE_DOWN, this, this.onContinue);
        //事件对象缩为0就是停止
        Laya.timer.scale = 0;
    };
    /**游戏继续 */
    GamePlay.prototype.onContinue = function () {
        //时间对象缩为1就是正常速度播放
        Laya.timer.scale = 1;
        //隐藏暂停界面
        this.gamePause.visible = false;
    };
    /**本局游戏数据UI更新 */
    GamePlay.prototype.update = function (hp, level, score) {
        //角色血量更新
        this.txt_hp.text = "HP:" + hp.toString();
        //更新游戏关卡
        this.txt_level.text = "LEVEL:" + level.toString();
        //更新游戏得分
        this.txt_score.text = "SCORE:" + score.toString();
    };
    return GamePlay;
}(ui.GamePlayUI));
//# sourceMappingURL=gamePlay.js.map