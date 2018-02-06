// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        /**主角血量 */
        this.hp = 10;
        /**游戏关卡数 */
        this.level = 1;
        /**敌机血量表 */
        this.hps = [1, 6, 15];
        /**敌机生成数量表 */
        this.nums = [2, 1, 1];
        /**敌机速度表 */
        this.speeds = [3, 2, 1];
        /**敌机被攻击半径表 */
        this.radius = [20, 35, 80];
        /**主角死亡后游戏结束时间 */
        this.deathTime = 0;
        /**关卡相关数据 */
        /**敌人刷新加速 */
        this.createTime = 0;
        /**敌人速度提升 */
        this.speedUp = 0;
        /**敌人血量提升 */
        this.hpUp = 0;
        /**敌人数量提升 */
        this.numUp = 0;
        /**升级等级所需要的积分数量 */
        this.levelUpScore = 50;
        Laya.init(720, 1280, Laya.WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.loader.load("res/atlas/gameUI.atlas", Laya.Handler.create(this, this.gameStart));
    }
    /**
     * 用三个方法来作为游戏的主要流程：游戏开始gameStart()、游戏中gameInit()、游戏结束gameOver()，负责游戏流程页面的显示与切换。
     */
    /**进入游戏开始页面 */
    GameMain.prototype.gameStart = function () {
        //实例化开始页面
        this.start = new GameStart();
        //以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
        this.start.popup();
        //将开始页面加载到舞台
        //Laya.stage.addChild(this.start);
        //监听游戏游戏开始按钮按下事件，点击后进入游戏中（之前IDE创建开始页面时创建的变量名）
        this.start.btn_start.on(Laya.Event.MOUSE_UP, this, this.gameInit);
    };
    /**游戏中、游戏初始化、地图、游戏中UI */
    GameMain.prototype.gameInit = function () {
        //重置关卡数据
        this.level = 1;
        this.createTime = 0;
        this.speedUp = 0;
        this.hpUp = 0;
        this.numUp = 0;
        this.levelUpScore = 50;
        GameMain.score = 0; //每次开始必须把分数置0
        GameMain.miss = 0;
        //缓动动画关闭效果。IDE中页面为Dialog类型才可用
        this.start.close();
        //实例化地图背景页面（如果已经实例化，不需要重复实例化）
        this.map = this.map || new GameMap();
        //加载地图背景到舞台
        Laya.stage.addChild(this.map);
        //实例化角色容器层并加载到舞台（如果已经实例化，不需要重复实例化）
        this.roleLayer = this.roleLayer || new laya.display.Sprite();
        Laya.stage.addChild(this.roleLayer);
        //实例化主角(如果已实例化，不需要重新new)
        this.hero = this.hero || new Role();
        //初始化角色类型、血量，注：速度speed为0，因为主角是通过操控改变位置
        this.hero.init("hero", 10, 0, 30, 0);
        //主角死亡后会隐藏，重新开始需要显示
        this.hero.visible = true;
        //主角位置修改
        this.hero.pos(360, 800);
        //角色加载到角色层中
        this.roleLayer.addChild(this.hero);
        //鼠标按下监听
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        //鼠标弹起监听
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        //实例化游戏中UI页面（如果已经实例化，不许重复实例化）
        this.play = this.play || new GamePlay();
        //加载游戏中UI页面到舞台
        Laya.stage.addChild(this.play);
        // //模拟游戏结束，15秒时间延迟
        // Laya.timer.once(15000, this, this.gameOver);
        //游戏主循环
        Laya.timer.frameLoop(1, this, this.loop);
    };
    /**按下后开始触发移动 */
    GameMain.prototype.onMouseDown = function () {
        //鼠标按下时的位置，用于计算手指移动量
        this.moveX = Laya.stage.mouseX;
        this.moveY = Laya.stage.mouseY;
        //开始监听移动事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    /**主角跟随鼠标移动 */
    GameMain.prototype.onMouseMove = function () {
        //计算角色移动量（上一帧的位置-当前的位置）
        var xx = this.moveX - Laya.stage.mouseX;
        var yy = this.moveY - Laya.stage.mouseY;
        //更新玩家飞机✈的位置
        this.hero.x -= xx;
        this.hero.y -= yy;
        //更新将当前位置的坐标作为当前帧的坐标
        this.moveX = Laya.stage.mouseX;
        this.moveY = Laya.stage.mouseY;
    };
    /**鼠标弹起事件，需要关闭移动事件监听 */
    GameMain.prototype.onMouseUp = function () {
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    /**游戏结束 */
    GameMain.prototype.gameOver = function () {
        //移除所有舞台事件，鼠标操控
        Laya.stage.offAll();
        //移除地图背景
        this.map.removeSelf();
        //移除游戏中UI
        this.play.removeSelf();
        //清空角色层子对象
        this.roleLayer.removeChildren(0, this.roleLayer.numChildren - 1);
        //移除角色层
        this.roleLayer.removeSelf();
        //去除游戏主循环
        Laya.timer.clear(this, this.loop);
        //实例化游戏结束页面（如果已实例化，不需重复实例化）
        this.over = this.over || new GameOver();
        //游戏积分显示
        this.over.txt_score.text = GameMain.score.toString();
        //以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
        this.over.popup();
        //游戏结束页面加载到舞台
        //Laya.stage.addChild(this.over);
        //重新开始游戏按钮监听，点击后重新进入游戏（IDE编辑UI时设置的变量）
        this.over.on('reStart', this, this.gameInit);
    };
    /**更新地图 */
    GameMain.prototype.loop = function () {
        //地图滚动更新
        this.map.updateMap();
        //本局游戏数据更新
        this.play.update(this.hero.hp, this.level, GameMain.score);
        //如果主角死亡
        if (this.hero.hp <= 0) {
            //玩家飞机死亡后延迟时间，100帧后弹出游戏结束画面
            this.deathTime++;
            if (this.deathTime >= 100) {
                this.deathTime = 0;
                //游戏结束
                this.gameOver();
                //本方法内后续逻辑不再执行
                return;
            }
        }
        else {
            //主角未死亡，将继续射击
            this.hero.shoot();
            //游戏升级计算
            this.levelUp();
        }
        //游戏碰撞逻辑检测
        //遍历所有飞机，更改飞机状态
        for (var i = this.roleLayer.numChildren - 1; i >= 0; i--) {
            //获取第一个角色
            var role = this.roleLayer.getChildAt(i);
            //角色自身更新
            role.update();
            //如果角色是已经死亡的被回收回对象池的，跳过进入下一循环
            if (role.hp <= 0) {
                continue;
            }
            //碰撞检测
            for (var j = i - 1; j >= 0; j--) {
                //获取第二个角色
                var role1 = this.roleLayer.getChildAt(j);
                //如果role1未死亡且不同阵营
                if (role1.hp > 0 && role1.camp !== role.camp) {
                    //获取碰撞半径
                    var hitRadius = role.hitRadius + role1.hitRadius;
                    //是否碰撞成功
                    if (Math.abs(role.x - role1.x) < hitRadius && Math.abs(role.y - role1.y) < hitRadius) {
                        //如果某一个碰撞体是道具，则吃道具，否则掉血
                        if (role.propType !== 0 || role1.propType !== 0) {
                            //无法判断哪个是道具，因此都相互吃一吃
                            role.eatProp(role1);
                            role1.eatProp(role);
                        }
                        else {
                            //角色相互掉血
                            role.lostHp(1);
                            role1.lostHp(1);
                        }
                    }
                }
            }
        }
        //创建敌机，不同类型的飞机创建时间间隔不一样
        //生成小敌机（每80帧生成一次）
        if (Laya.timer.currFrame % (80 - this.createTime) === 0) {
            this.createEnemy(0, this.hps[0], this.speeds[0] + this.speedUp, this.nums[0] + this.numUp);
        }
        //生成中型敌机（每160帧生成一次）
        if (Laya.timer.currFrame % (170 - this.createTime * 2) === 0) {
            this.createEnemy(1, this.hps[1] + this.hpUp * 2, this.speeds[1] + this.speedUp, this.nums[1]);
        }
        //生成boss型敌机（每1000帧生成一次）
        if (Laya.timer.currFrame % (1000 - this.createTime * 3) === 0) {
            this.createEnemy(2, this.hps[2] + this.hpUp * 6, this.speeds[2], this.nums[2] + this.numUp);
        }
    };
    /**
     *  创建敌人
     * @param index     敌人编号
     * @param hp           敌人血量
     * @param speed        敌人速度
     * @param num        敌人数量
     */
    GameMain.prototype.createEnemy = function (index, hp, speed, num) {
        for (var i = 0; i < num; i++) {
            //创建敌人，从对象池创建
            var enemy = laya.utils.Pool.getItemByClass('role', Role);
            //初始化角色类型、血量、速度
            enemy.init("enemy" + (index + 1), hp, speed, this.radius[index], 1);
            //从对象池创建的对象死亡时被隐藏了，因此需要重新初始化显示
            enemy.visible = true;
            //随机位置
            enemy.pos(Math.random() * (720 - 80) + 50, -Math.random() * 100);
            //添加到舞台
            this.roleLayer.addChild(enemy);
        }
    };
    /**游戏升级计算 */
    GameMain.prototype.levelUp = function () {
        if (GameMain.score > this.levelUpScore) {
            //关卡等级提升
            this.level++;
            //角色血量增加，最大15
            this.hero.hp = Math.min(this.hero.hp + this.level * 1, 15);
            //关卡越高，创建敌机的时间越短
            this.createTime = this.level < 30 ? this.level * 2 : 60;
            //关卡越高，敌机飞行速度越快
            this.speedUp = Math.floor(this.level / 6);
            //关卡越高，敌机血量越高
            this.hpUp = Math.floor(this.level / 8);
            //关卡越高敌机数量越多
            this.numUp = Math.floor(this.level / 10);
            //提高下一级的升级分数
            this.levelUpScore += 50;
            //游戏关卡提升，播放音效
            laya.media.SoundManager.playSound('sound/level_update.mp3');
        }
    };
    /**玩机积分 */
    GameMain.score = 0;
    /**统计错过多少架敌机，每错过十架扣一滴血 */
    GameMain.miss = 0;
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=gameMain.js.map