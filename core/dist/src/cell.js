"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
var cell_state_1 = require("./cell_state");
var coordinates_1 = require("./coordinates");
var Cell = /** @class */ (function () {
    function Cell(_coordinates, _state, _arroundMines, _hasMine) {
        this._coordinates = _coordinates;
        this._state = _state;
        this._arroundMines = _arroundMines;
        this._hasMine = _hasMine;
    }
    Cell.createNew = function (coordinates) {
        return new Cell(coordinates, cell_state_1.CellState.HIDE, 0, false);
    };
    Object.defineProperty(Cell.prototype, "topLeftCoordinate", {
        get: function () {
            return new coordinates_1.Coordinates(this.coordinates.x - 1, this.coordinates.y + 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "topCenterCoordinate", {
        get: function () {
            return new coordinates_1.Coordinates(this.coordinates.x, this.coordinates.y + 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "topRightCoordinate", {
        get: function () {
            return new coordinates_1.Coordinates(this.coordinates.x + 1, this.coordinates.y + 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "leftCoordinate", {
        get: function () {
            return new coordinates_1.Coordinates(this.coordinates.x - 1, this.coordinates.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "rightCoordinate", {
        get: function () {
            return new coordinates_1.Coordinates(this.coordinates.x + 1, this.coordinates.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "bottomLeftCoordinate", {
        get: function () {
            return new coordinates_1.Coordinates(this.coordinates.x - 1, this.coordinates.y - 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "bottomCenterCoordinate", {
        get: function () {
            return new coordinates_1.Coordinates(this.coordinates.x, this.coordinates.y - 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "bottomRightCoordinate", {
        get: function () {
            return new coordinates_1.Coordinates(this.coordinates.x + 1, this.coordinates.y - 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "coordinates", {
        get: function () {
            return this._coordinates;
        },
        enumerable: false,
        configurable: true
    });
    Cell.prototype.changeState = function (state) {
        return new Cell(this._coordinates, state, this._arroundMines, this._hasMine);
    };
    Cell.prototype.changeArroudMinesValue = function (numberOfArroundMines) {
        return new Cell(this._coordinates, this._state, numberOfArroundMines, this._hasMine);
    };
    Cell.prototype.setMine = function () {
        return new Cell(this._coordinates, this._state, this._arroundMines, true);
    };
    Cell.prototype.state = function () {
        return this._state;
    };
    Object.defineProperty(Cell.prototype, "hasMine", {
        get: function () {
            return this._hasMine;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "hasFlag", {
        get: function () {
            return this._state == cell_state_1.CellState.FLAG;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "minesArround", {
        get: function () {
            return this._arroundMines;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "isUncovered", {
        get: function () {
            return this._state === cell_state_1.CellState.UNCOVERED;
        },
        enumerable: false,
        configurable: true
    });
    return Cell;
}());
exports.Cell = Cell;
//# sourceMappingURL=cell.js.map