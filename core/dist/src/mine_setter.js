"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixMineSetter = exports.DefaultMineSetter = void 0;
var coordinates_1 = require("./coordinates");
var DefaultMineSetter = /** @class */ (function () {
    function DefaultMineSetter() {
    }
    DefaultMineSetter.prototype.setMines = function (board, excludeCell) {
        var cellsToMine = [];
        while (cellsToMine.length != this._totalMines(board.size())) {
            var coordinates = new coordinates_1.Coordinates(this._randomCordinate(board.size()), this._randomCordinate(board.size()));
            cellsToMine = this._addCellToMine(coordinates, excludeCell, cellsToMine, board);
        }
        cellsToMine.forEach(function (coordinates) {
            board.setMine(coordinates);
        });
    };
    DefaultMineSetter.prototype._iCanPutAMineHere = function (cellToMine, excludeCordinate, cellsToMine, board) {
        var excludedCell = board.cell(excludeCordinate);
        return !(excludeCordinate.equals(cellToMine)) &&
            !(cellsToMine.some(function (coordinates, index, coordinatesArray) { return coordinates.equals(cellToMine); })) &&
            !(cellToMine.equals(excludedCell.topLeftCoordinate())) &&
            !(cellToMine.equals(excludedCell.topCenterCoordinate())) &&
            !(cellToMine.equals(excludedCell.topRightCoordinate())) &&
            !(cellToMine.equals(excludedCell.leftCoordinate())) &&
            !(cellToMine.equals(excludedCell.rightCoordinate())) &&
            !(cellToMine.equals(excludedCell.bottomLeftCoordinate())) &&
            !(cellToMine.equals(excludedCell.bottomCenterCoordinate())) &&
            !(cellToMine.equals(excludedCell.bottomRightCoordinate()));
    };
    DefaultMineSetter.prototype._totalMines = function (boardSize) {
        return boardSize * 2;
    };
    DefaultMineSetter.prototype._addCellToMine = function (cellToMine, excludeCell, currentCellToMine, board) {
        var result = Array.from(currentCellToMine);
        if (this._iCanPutAMineHere(cellToMine, excludeCell, currentCellToMine, board)) {
            result.push(cellToMine);
        }
        return result;
    };
    DefaultMineSetter.prototype._randomCordinate = function (boardSize) {
        return Math.round(Math.random() * (boardSize - 1) + 1);
    };
    return DefaultMineSetter;
}());
exports.DefaultMineSetter = DefaultMineSetter;
var FixMineSetter = /** @class */ (function () {
    function FixMineSetter(_setMinesAt) {
        this._setMinesAt = _setMinesAt;
    }
    FixMineSetter.prototype.setMines = function (board, excludeCell) {
        this._setMinesAt.forEach(function (coordinate, index, coordinates) {
            board.setMine(coordinate);
        });
    };
    return FixMineSetter;
}());
exports.FixMineSetter = FixMineSetter;
//# sourceMappingURL=mine_setter.js.map