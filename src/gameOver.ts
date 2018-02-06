/**
 * 游戏结束界面
 * @author plj
 * 
 */

class GameOver extends ui.GameOverUI {
    /**
     * 游戏结束界面
     */
    constructor() {
        super();
        this.btn_restart.on(Laya.Event.MOUSE_DOWN, this, this.onRestart);
    }

    /**游戏重新开始 */
    private onRestart():void {
        //播放IDE中编辑的按钮动画
        this.ani_restart.play(0, false);
        //监听动画完成事件，注意用once
        this.ani_restart.on(Laya.Event.COMPLETE, this, this.aniComplete);
    }

    /**按钮动画播放完成 */
    private aniComplete():void {
        //发送重新开始事件，在main类中监听
        this.event('reStart');
        //缓动动画关闭效果。IDE中页面为Dialog才可用
        this.close();
    }
}