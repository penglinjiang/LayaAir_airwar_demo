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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameBgUI = /** @class */ (function (_super) {
        __extends(GameBgUI, _super);
        function GameBgUI() {
            return _super.call(this) || this;
        }
        GameBgUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameBgUI.uiView);
        };
        GameBgUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bg1", "skin": "background.png" } }, { "type": "Image", "props": { "y": -1280, "x": 0, "var": "bg2", "skin": "background.png" } }] };
        return GameBgUI;
    }(View));
    ui.GameBgUI = GameBgUI;
})(ui || (ui = {}));
(function (ui) {
    var GameOverUI = /** @class */ (function (_super) {
        __extends(GameOverUI, _super);
        function GameOverUI() {
            return _super.call(this) || this;
        }
        GameOverUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameOverUI.uiView);
        };
        GameOverUI.uiView = { "type": "Dialog", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "width": 720, "skin": "gameUI/bg.jpg", "sizeGrid": "4,4,4,4", "height": 1280 } }, { "type": "Image", "props": { "y": 378, "x": 229, "skin": "gameUI/gameOver.png" } }, { "type": "Text", "props": { "y": 575, "x": 244, "width": 144, "text": "本局积分：", "height": 29, "fontSize": 30, "font": "SimHei", "color": "#7c7979", "bold": true, "align": "left" } }, { "type": "Text", "props": { "y": 575, "x": 363, "width": 128, "var": "txt_score", "text": "1200", "height": 29, "fontSize": 30, "font": "SimHei", "color": "#7c7979", "bold": true, "align": "center" } }, { "type": "Text", "props": { "y": 1200, "x": 19, "width": 681, "text": "maded by plj", "height": 29, "fontSize": 30, "font": "SimHei", "color": "#7c7979", "bold": true, "align": "center" } }, { "type": "Box", "props": { "y": 960, "x": 239, "var": "btn_restart" }, "compId": 7, "child": [{ "type": "Button", "props": { "y": 0, "x": 1, "width": 240, "stateNum": 2, "skin": "gameUI/btn_bg.png", "sizeGrid": "10,10,10,10", "height": 80 } }, { "type": "Image", "props": { "y": 18, "x": 41, "skin": "gameUI/restart.png" } }] }], "animations": [{ "nodes": [{ "target": 7, "keyframes": { "y": [{ "value": 960, "tweenMethod": "elasticOut", "tween": true, "target": 7, "key": "y", "index": 0 }, { "value": 970, "tweenMethod": "linearNone", "tween": true, "target": 7, "key": "y", "index": 8 }] } }], "name": "ani_restart", "id": 1, "frameRate": 24, "action": 0 }] };
        return GameOverUI;
    }(Dialog));
    ui.GameOverUI = GameOverUI;
})(ui || (ui = {}));
(function (ui) {
    var GamePlayUI = /** @class */ (function (_super) {
        __extends(GamePlayUI, _super);
        function GamePlayUI() {
            return _super.call(this) || this;
        }
        GamePlayUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.GamePlayUI.uiView);
        };
        GamePlayUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 20, "x": 10, "width": 700, "skin": "gameUI/blank.png", "height": 45 } }, { "type": "Button", "props": { "y": 21, "x": 618, "var": "btn_pause", "stateNum": 1, "skin": "gameUI/btn_pause.png" } }, { "type": "Text", "props": { "y": 24, "x": 41, "width": 150, "var": "txt_hp", "text": "HP:", "height": 40, "fontSize": 30, "font": "SimHei", "bold": true, "align": "left" } }, { "type": "Text", "props": { "y": 24, "x": 228, "width": 150, "var": "txt_level", "text": "level:", "height": 40, "fontSize": 30, "font": "SimHei", "bold": true, "align": "left" } }, { "type": "Text", "props": { "y": 24, "x": 415, "width": 150, "var": "txt_score", "text": "Score:", "height": 40, "fontSize": 30, "font": "SimHei", "align": "left" } }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 720, "visible": false, "var": "gamePause", "height": 1280, "alpha": 1 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "skin": "gameUI/blank.png", "sizeGrid": "2,2,2,2", "height": 1280 } }, { "type": "Image", "props": { "y": 411, "x": 110, "width": 500, "visible": true, "skin": "gameUI/bg.jpg", "sizeGrid": "10,10,10,10", "height": 500 } }, { "type": "Text", "props": { "y": 801, "x": 190, "width": 340, "text": "点击任意位置继续游戏", "height": 44, "fontSize": 30, "font": "SimHei", "color": "#232222", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 468, "x": 211, "skin": "gameUI/gamePause.png" } }] }] };
        return GamePlayUI;
    }(View));
    ui.GamePlayUI = GamePlayUI;
})(ui || (ui = {}));
(function (ui) {
    var GameStartUI = /** @class */ (function (_super) {
        __extends(GameStartUI, _super);
        function GameStartUI() {
            return _super.call(this) || this;
        }
        GameStartUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameStartUI.uiView);
        };
        GameStartUI.uiView = { "type": "Dialog", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "width": 720, "skin": "gameUI/bg.jpg", "sizeGrid": "4,4,4,4", "height": 1280 } }, { "type": "Image", "props": { "y": 378, "x": 179, "skin": "gameUI/logo.png" } }, { "type": "Text", "props": { "y": 587, "x": 20, "width": 681, "var": "txt_load", "text": "游戏资源加载进度", "height": 29, "fontSize": 30, "font": "SimHei", "color": "#1c1c1c", "align": "center" } }, { "type": "Box", "props": { "y": 960, "x": 240, "width": 240, "var": "btn_start", "height": 80 }, "child": [{ "type": "Button", "props": { "width": 240, "stateNum": 2, "skin": "gameUI/btn_bg.png", "sizeGrid": "20,20,20,20", "label": "label", "height": 80 } }, { "type": "Image", "props": { "y": 19, "x": 41, "skin": "gameUI/start.png" } }] }, { "type": "Text", "props": { "y": 1200, "x": 20, "width": 681, "text": "maded by plj", "height": 29, "fontSize": 30, "font": "SimHei", "color": "#7c7979", "bold": true, "align": "center" } }] };
        return GameStartUI;
    }(Dialog));
    ui.GameStartUI = GameStartUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map