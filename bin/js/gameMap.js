/**
 游戏背景
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
var GameMap = /** @class */ (function (_super) {
    __extends(GameMap, _super);
    function GameMap() {
        return _super.call(this) || this;
    }
    GameMap.prototype.updateMap = function () {
        this.y += 1;
        //如果背景图到了下面不可见，立即调整位置到上面循环显示
        //游戏舞台高为1280
        if (this.bg1.y + this.y >= 1280) {
            this.bg1.y -= 1280 * 2;
        }
        if (this.bg2.y + this.y >= 1280) {
            this.bg2.y -= 1280 * 2;
        }
    };
    return GameMap;
}(ui.GameBgUI));
//# sourceMappingURL=gameMap.js.map