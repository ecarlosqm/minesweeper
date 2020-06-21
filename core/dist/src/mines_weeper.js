"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinesWeeper = void 0;
var board_1 = require("./board");
var mine_setter_1 = require("./mine_setter");
var cells_generator_1 = require("./cells_generator");
var MinesWeeper = /** @class */ (function () {
    function MinesWeeper() {
        var mineSetter = new mine_setter_1.DefaultMineSetter();
        var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
        this._board = new board_1.Board(cellsGenerator, mineSetter);
    }
    MinesWeeper.prototype.newBoard = function (size) {
        this._board.new(size);
    };
    MinesWeeper.prototype.uncover = function (coordinates) {
        this._board.uncover(coordinates);
    };
    MinesWeeper.prototype.size = function () {
        return this._board.size();
    };
    MinesWeeper.prototype.board = function () {
        return this._board.cells();
    };
    MinesWeeper.prototype.onUncoverMine = function (callback) {
        return this._board.onUncovereMine(callback);
    };
    MinesWeeper.prototype.onWin = function (callback) {
        return this._board.onWin(callback);
    };
    return MinesWeeper;
}());
exports.MinesWeeper = MinesWeeper;
//# sourceMappingURL=mines_weeper.js.map