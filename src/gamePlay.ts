/**
 * 游戏内UI,血量、积分、等级显示、暂停等
 * @author plj
 * 
 */	

class GamePlay extends ui.GamePlayUI {
    /**
     * 游戏内UI,血量、积分、等级显示、暂停等
     */
    constructor() {
        super();
        this.btn_pause.on(Laya.Event.MOUSE_DOWN, this, this.onPause);
    }

    /**游戏暂停 */
    private onPause():void {
        //显示IDE中隐藏的暂停界面
        this.gamePause.visible = true;
        //暂停界面增加点击一次的监听
        this.gamePause.once(Laya.Event.MOUSE_DOWN, this, this.onContinue);

        //事件对象缩为0就是停止
        Laya.timer.scale = 0;
    }

    /**游戏继续 */
    private onContinue():void {
        //时间对象缩为1就是正常速度播放
        Laya.timer.scale = 1;
        //隐藏暂停界面
        this.gamePause.visible = false;
    }

    /**本局游戏数据UI更新 */
    public update(hp:number, level:number, score:number): void {
        //角色血量更新
        this.txt_hp.text = `HP:${hp.toString()}`;
        //更新游戏关卡
        this.txt_level.text = `LEVEL:${level.toString()}`;
        //更新游戏得分
        this.txt_score.text = `SCORE:${score.toString()}`;
    }
}