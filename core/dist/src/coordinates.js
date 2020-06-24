"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinates = void 0;
var Coordinates = /** @class */ (function () {
    function Coordinates(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    Object.defineProperty(Coordinates.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Coordinates.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });
    Coordinates.prototype.equals = function (coordinates) {
        return this._x === coordinates.x && this._y === coordinates.y;
    };
    Coordinates.prototype.toString = function () {
        return "" + this._x + this._y;
    };
    return Coordinates;
}());
exports.Coordinates = Coordinates;
//# sourceMappingURL=coordinates.js.map