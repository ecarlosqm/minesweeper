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
    Cell.prototype.topLeftCoordinate = function () {
        return new coordinates_1.Coordinates(this.coordinates().x() - 1, this.coordinates().y() + 1);
    };
    Cell.prototype.topCenterCoordinate = function () {
        return new coordinates_1.Coordinates(this.coordinates().x(), this.coordinates().y() + 1);
    };
    Cell.prototype.topRightCoordinate = function () {
        return new coordinates_1.Coordinates(this.coordinates().x() + 1, this.coordinates().y() + 1);
    };
    Cell.prototype.leftCoordinate = function () {
        return new coordinates_1.Coordinates(this.coordinates().x() - 1, this.coordinates().y());
    };
    Cell.prototype.rightCoordinate = function () {
        return new coordinates_1.Coordinates(this.coordinates().x() + 1, this.coordinates().y());
    };
    Cell.prototype.bottomLeftCoordinate = function () {
        return new coordinates_1.Coordinates(this.coordinates().x() - 1, this.coordinates().y() - 1);
    };
    Cell.prototype.bottomCenterCoordinate = function () {
        return new coordinates_1.Coordinates(this.coordinates().x(), this.coordinates().y() - 1);
    };
    Cell.prototype.bottomRightCoordinate = function () {
        return new coordinates_1.Coordinates(this.coordinates().x() + 1, this.coordinates().y() - 1);
    };
    Cell.prototype.coordinates = function () {
        return this._coordinates;
    };
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
    Cell.prototype.hasMine = function () {
        return this._hasMine;
    };
    Cell.prototype.hasFlag = function () {
        return this._state == cell_state_1.CellState.FLAG;
    };
    Cell.prototype.minesArround = function () {
        return this._arroundMines;
    };
    Cell.prototype.isUncovered = function () {
        return this._state === cell_state_1.CellState.UNCOVERED;
    };
    return Cell;
}());
exports.Cell = Cell;
//# sourceMappingURL=cell.js.map