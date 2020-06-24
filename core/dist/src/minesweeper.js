"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Minesweeper = void 0;
var board_1 = require("./board");
var mine_setter_1 = require("./mine_setter");
var cells_generator_1 = require("./cells_generator");
var Minesweeper = /** @class */ (function () {
    function Minesweeper() {
        var mineSetter = new mine_setter_1.DefaultMineSetter();
        var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
        this._board = new board_1.Board(cellsGenerator, mineSetter);
    }
    Minesweeper.prototype.newBoard = function (size) {
        this._board.new(size);
    };
    Minesweeper.prototype.uncover = function (coordinates) {
        this._board.uncover(coordinates);
    };
    Minesweeper.prototype.setFlag = function (coordinates) {
        this._board.setFlag(coordinates);
    };
    Object.defineProperty(Minesweeper.prototype, "size", {
        get: function () {
            return this._board.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Minesweeper.prototype, "board", {
        get: function () {
            return this._board.cells;
        },
        enumerable: false,
        configurable: true
    });
    Minesweeper.prototype.onUncoverMine = function (callback) {
        return this._board.onUncovereMine(callback);
    };
    Minesweeper.prototype.onWin = function (callback) {
        return this._board.onWin(callback);
    };
    Minesweeper.prototype.uncoverMines = function () {
        this._board.uncoverMines();
    };
    return Minesweeper;
}());
exports.Minesweeper = Minesweeper;
//# sourceMappingURL=minesweeper.js.map