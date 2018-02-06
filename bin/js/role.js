/**
 * @author plj
 * 角色类，飞机、敌人、子弹、道具
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
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        /**角色血量 */
        _this.hp = 0;
        /**角色速度 */
        _this.speed = 0;
        /**子弹射击间隔时间 */
        _this.shootInterval = 300;
        /**子弹下次射击时间 */
        _this.shootTime = 300;
        /**是否为子弹 */
        _this.isBullet = false;
        /**道具类型 0：飞机或子弹，1：子弹箱，2：血瓶 */
        _this.propType = 0; //默认为飞机，后面注意修改
        /**子弹级别，吃子弹道具后升级 */
        _this.bulletLevel = 0;
        /**同时射出子弹数量 ,最多四颗子弹同时*/
        _this.shootNum = 1;
        /**子弹偏移的位置 */
        _this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
        //实例化动画
        _this.roleAni = new laya.display.Animation();
        //加载IDE编辑的动画文件
        _this.roleAni.loadAnimation('GameRole.ani');
        return _this;
    }
    /**
     * 角色初始化
     * @param type  角色类型：“hero”:玩家飞机，“enemy1-3”：敌人飞机、“bulle:1-2”：子弹、"ufo1-2":道具
     * @param hp   血量
     * @param speed  速度
     */
    Role.prototype.init = function (type, hp, speed, hitRadius, camp) {
        //初始化角色属性
        this.type = type;
        this.hp = hp;
        this.speed = speed;
        this.hitRadius = hitRadius;
        this.camp = camp;
        //对象基本都从对象池中创建，如果之前为子弹，不重新赋值的话不会播放死亡动画
        this.isBullet = false;
        //道具属性初始为0
        this.propType = 0;
        //初始化子弹一开始就1颗子弹，不然重新开始时立马会拥有多发子弹
        this.shootNum = 1;
        //初始化子弹级别也是0级 不然重新开始时会立马拥有高级别子弹
        this.bulletLevel = 0;
        //加载动画对象
        this.addChild(this.roleAni);
        //监听动画播放完成事件
        this.roleAni.on(Laya.Event.COMPLETE, this, this.onComplete);
        //播放默认飞行动画
        this.playAction('fly');
    };
    /**
     * 播放动画
     * @param action 动画状态："fly"、"hit"、"die"
     */
    Role.prototype.playAction = function (action) {
        this.action = action;
        //播放角色动画，name=角色类型_动画状态，如：hero_fly
        this.roleAni.play(0, true, this.type + "_" + this.action);
    };
    /**
     * 角色更新,边界检查
     */
    Role.prototype.update = function () {
        //如果角色被隐藏，角色消亡并回收
        if (!this.visible) {
            //主角不死亡回收，只隐藏，以免以他对象以主角回收对象创建，发生引用修改
            if (this.type !== 'hero') {
                this.die();
            }
            return;
        }
        //角色根据速度飞行
        this.y += this.speed;
        //如果移动到显示区域外则隐藏
        if (this.type !== 'hero' && (this.y > 1280 + 100 || this.y < -150)) {
            this.visible = false;
            if (this.type.indexOf('enemy') >= 0) {
                GameMain.miss++; //错过敌机累计加一，超过5就扣血
            }
        }
        //主角边界检查
        if (this.type === 'hero') {
            if (GameMain.miss >= 5) {
                console.log('gameMiss: ', GameMain.miss);
                this.hp--;
                GameMain.miss = 0;
            }
            //需减去角色宽或高的一半，因为在IDE中制作动画时，我们把角色的中心做为了角色对象的原点
            if (this.x < this.roleAni.width / 2) {
                this.x = this.roleAni.width / 2;
            }
            else if (this.x > 720 - this.roleAni.width / 2) {
                this.x = 720 - this.roleAni.width / 2;
            }
            if (this.y < this.roleAni.height / 2) {
                this.y = this.roleAni.height / 2;
            }
            else if (this.y > 1280 - this.roleAni.height / 2) {
                this.y = 1280 - this.roleAni.height / 2;
            }
        }
    };
    /**角色死亡并回收到对象池 */
    Role.prototype.die = function () {
        //角色动画停止
        this.roleAni.stop();
        //去除所有动画的监听
        this.roleAni.offAll();
        //从舞台移除
        this.removeSelf();
        //回收到对象池
        laya.utils.Pool.recover('role', this);
    };
    /**
 * 角色失血
 * @param lostHp 失血量
 */
    Role.prototype.lostHp = function (lostHp) {
        //减血
        this.hp -= lostHp;
        //根据血量判断是否死亡
        if (this.hp > 0) {
            //如果未死亡，则播放受攻击动画
            this.playAction('hit');
            //如果是英雄受伤，播放受伤动画
            if (this.type === 'hero') {
                laya.media.SoundManager.playSound('sound/hero_hurt.mp3');
            }
        }
        else {
            //子弹无死亡动画，直接隐藏回收
            if (this.isBullet) {
                //update()方法中，隐藏后进行回收
                this.visible = false;
            }
            else {
                //播放死亡动画
                this.playAction('die');
                if (this.type !== 'hero' && !this.isBullet) {
                    //死亡的不是子弹也不是主角时，增加积分
                    GameMain.score++;
                }
                //添加死亡音效
                if (this.type === 'hero') {
                    laya.media.SoundManager.playSound('sound/game_over.mp3');
                }
                else {
                    laya.media.SoundManager.playSound('sound/enemy1_die.mp3');
                }
            }
        }
    };
    /**
     * 动画完成后回调方法
     */
    Role.prototype.onComplete = function () {
        //如果角色还未有宽，获得角色的宽高
        if (this.roleAni.width === 0) {
            //获得动画矩形边界
            var bounds = this.roleAni.getBounds();
            //角色宽高赋值
            this.roleAni.size(bounds.width, bounds.height);
        }
        //如果死亡动画播放完成
        if (this.action === 'die') {
            //update()方法中，隐藏后进行移除回收
            this.visible = false;
            //死亡之后掉落道具
            this.lostProp();
        }
        else if (this.action === 'hit') {
            //如果只是受伤动画，下一帧要继续播放飞行动画
            this.playAction('fly');
        }
    };
    /**
     * 角色射击，生成子弹
     */
    Role.prototype.shoot = function () {
        //获取当前时间
        var time = laya.utils.Browser.now();
        //如果当前时间大于下次射击时间
        if (time > this.shootTime) {
            //获得发射子弹的位置数组
            var pos = this.bulletPos[this.shootNum - 1];
            for (var i = 0; i < pos.length; i++) {
                //更新下次射击时间
                this.shootTime = time + this.shootInterval;
                //从对象池里创建一颗子弹
                var bullet = laya.utils.Pool.getItemByClass('role', Role);
                //初始化子弹信息，子弹阵营和发射者相同
                bullet.init('bullet2', 1, -10, 1, this.camp);
                //角色类型为子弹类型
                bullet.isBullet = true;
                //对象池中对象死亡时会被隐藏
                bullet.visible = true;
                //设置子弹发射初始化位置
                bullet.pos(this.x + pos[i], this.y - 80);
                //添加到角色层中去
                this.parent.addChild(bullet);
                //播放子弹发射的声音
                laya.media.SoundManager.playSound('sound/bullet.mp3');
            }
        }
    };
    /**角色死亡掉落物品 */
    Role.prototype.lostProp = function () {
        //只有boss级别才能掉落道具
        if (this.type !== 'enemy3') {
            return;
        }
        //从对象池里面创建一个道具
        var prop = laya.utils.Pool.getItemByClass('role', Role);
        //生成随机道具类型
        var r = Math.random();
        var num = r < 0.7 ? 1 : 2;
        //重新初始化道具属性，阵营为地方(为了能与主角发生碰撞)
        prop.init("ufo" + num, 1, 2, 30, 1);
        //道具类型
        prop.propType = num;
        //强制显示
        prop.visible = true;
        //生成位置为敌机死亡位置
        prop.pos(this.x, this.y);
        //加载的角色层父容器
        this.parent.addChild(prop);
    };
    /**角色吃道具方法，加血或者加子弹 */
    Role.prototype.eatProp = function (prop) {
        //如果调用者不是主角或prop不是道具，则返回
        if (this.type !== 'hero' || prop.propType === 0) {
            return;
        }
        //播放吃强化道具的音效
        laya.media.SoundManager.playSound('sound/achievement.mp3');
        //吃子弹箱
        if (prop.propType === 1) {
            //积分增加
            GameMain.score++;
            //子弹级别增加
            this.bulletLevel++;
            //子弹每升级2级，子弹数量加一，最大数量限制在4个
            this.shootNum = Math.min(Math.floor(this.bulletLevel / 2) + 1, 4);
            //子弹级别越高，发射频率越快
            this.shootInterval = 300 - 8 * (this.bulletLevel > 8 ? 8 : this.bulletLevel);
        }
        else if (prop.propType === 2) {
            //吃血
            this.hp += 2;
            //积分增加
            GameMain.score++;
        }
        //道具死亡
        prop.hp = 0;
        //道具吃完后消失，下一帧回收
        prop.visible = false;
    };
    return Role;
}(laya.display.Sprite));
//# sourceMappingURL=role.js.map