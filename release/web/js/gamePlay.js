var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),GamePlay=function(t){function e(){var e=t.call(this)||this;return e.btn_pause.on(Laya.Event.MOUSE_DOWN,e,e.onPause),e}return __extends(e,t),e.prototype.onPause=function(){this.gamePause.visible=!0,this.gamePause.once(Laya.Event.MOUSE_DOWN,this,this.onContinue),Laya.timer.scale=0},e.prototype.onContinue=function(){Laya.timer.scale=1,this.gamePause.visible=!1},e.prototype.update=function(t,e,n){this.txt_hp.text="HP:"+t.toString(),this.txt_level.text="LEVEL:"+e.toString(),this.txt_score.text="SCORE:"+n.toString()},e}(ui.GamePlayUI);