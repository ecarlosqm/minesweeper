"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var cell_state_1 = require("./cell_state");
var Board = /** @class */ (function () {
    function Board(_cellGenerator, _mineSetter) {
        this._cellGenerator = _cellGenerator;
        this._mineSetter = _mineSetter;
        this._cells = [];
        this._mineLocations = [];
        this._uncoveredMineSuscribers = new Set();
        this._winSuscribers = new Set();
        this._isFirstMove = true;
        this._isBoardBlocked = false;
        this._cellsUncoveredWithoutMines = 0;
        this._minesInBoard = 0;
        this._uncoverCellAndCellsArround = this._uncoverCellAndCellsArround.bind(this);
        this._addOneToMineArroundValue = this._addOneToMineArroundValue.bind(this);
    }
    Board.prototype.onUncovereMine = function (callback) {
        var _this = this;
        this._uncoveredMineSuscribers.add(callback);
        return function () { return _this._removeOnUncoverMineSuscriber(callback); };
    };
    Board.prototype._removeOnUncoverMineSuscriber = function (callback) {
        this._uncoveredMineSuscribers.delete(callback);
    };
    Board.prototype._callOnUncoverMineSuscribers = function (coordinates) {
        this._uncoveredMineSuscribers.forEach(function (callback, index, callbacks) {
            callback(coordinates);
        });
    };
    Board.prototype.onWin = function (callback) {
        var _this = this;
        this._winSuscribers.add(callback);
        return function () { return _this._removeOnWinSuscriber(callback); };
    };
    Board.prototype._removeOnWinSuscriber = function (callback) {
        this._winSuscribers.delete(callback);
    };
    Board.prototype._callOnWinSuscribers = function () {
        this._winSuscribers.forEach(function (callback, index, callbacks) {
            callback();
        });
    };
    Board.prototype._reset = function () {
        this._cells = [];
        this._mineLocations = [];
        this._isFirstMove = true;
        this._isBoardBlocked = false;
        this._cellsUncoveredWithoutMines = 0;
        this._minesInBoard = 0;
    };
    Board.prototype.new = function (size) {
        this._reset();
        if (size < 9) {
            throw new Error("The board must be larger than 1");
        }
        this._cells = this._cellGenerator.generate(size);
    };
    /// Recibe a coordinates to exclude because the first move never loses
    Board.prototype._setMinesAfterFirsMove = function (excludeCellIn) {
        this._mineSetter.setMines(this, excludeCellIn);
    };
    Board.prototype.cells = function () {
        var _a;
        return (_a = Array()).concat.apply(_a, this._cells);
    };
    Board.prototype.cell = function (coordinates) {
        return this._cells[this._coordinateToIndex(coordinates.x())][this._coordinateToIndex(coordinates.y())];
    };
    Board.prototype._coordinateToIndex = function (coordinate) {
        return coordinate - 1;
    };
    Board.prototype._updateCell = function (coordinates, cell) {
        this._assertCoordinatesAreEquals(coordinates, cell.coordinates(), 'To remplace a cell, the coordinates and cell.myCoordinate() must be equals');
        this._cells[this._coordinateToIndex(coordinates.x())][this._coordinateToIndex(coordinates.y())] = cell;
    };
    Board.prototype._totalNumberOfCell = function () {
        return this.size() * this.size();
    };
    Board.prototype._checkIfWin = function () {
        return this._cellsUncoveredWithoutMines === this._totalNumberOfCell() - this._minesInBoard;
    };
    Board.prototype._isAvalidCoordinate = function (cordinate) {
        return cordinate.x() <= this.size() &&
            cordinate.y() <= this.size() &&
            cordinate.x() > 0 &&
            cordinate.y() > 0;
    };
    Board.prototype.size = function () {
        return this._cells.length;
    };
    Board.prototype.uncover = function (coordinates) {
        if (this._isBoardBlocked) {
            return;
        }
        if (this._isFirstMove) {
            this._setMinesAfterFirsMove(coordinates);
            this._isFirstMove = false;
        }
        if (this.cell(coordinates).hasMine()) {
            this._justUncoverCell(coordinates);
            this._callOnUncoverMineSuscribers(coordinates);
            this._isBoardBlocked = true;
        }
        this._uncoverCellAndCellsArround(coordinates);
        if (this._checkIfWin()) {
            this._isBoardBlocked = true;
            this._callOnWinSuscribers();
        }
    };
    Board.prototype.setFlag = function (coordinates) {
        this._updateCell(coordinates, this.cell(coordinates).changeState(cell_state_1.CellState.FLAG));
    };
    Board.prototype.setMine = function (coordinates) {
        this._minesInBoard++;
        this._mineLocations.push(coordinates);
        var cellToMine = this.cell(coordinates);
        this._updateCell(coordinates, cellToMine.setMine());
        this._executeIfAreValidCordinates(cellToMine.topLeftCoordinate(), this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.topCenterCoordinate(), this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.topRightCoordinate(), this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.leftCoordinate(), this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.rightCoordinate(), this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.bottomLeftCoordinate(), this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.bottomCenterCoordinate(), this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.bottomRightCoordinate(), this._addOneToMineArroundValue);
    };
    Board.prototype._executeIfAreValidCordinates = function (cooridnates, execute, orElse) {
        if (this._isAvalidCoordinate(cooridnates)) {
            execute(cooridnates);
        }
        else {
            orElse === null || orElse === void 0 ? void 0 : orElse.call(this);
        }
    };
    Board.prototype._addOneToMineArroundValue = function (coordinates) {
        this._updateCell(coordinates, this.cell(coordinates).changeArroudMinesValue(this.cell(coordinates).minesArround() + 1));
    };
    Board.prototype._justUncoverCell = function (cellToUncover) {
        if (!this.cell(cellToUncover).hasMine()) {
            this._cellsUncoveredWithoutMines++;
        }
        this._updateCell(cellToUncover, this.cell(cellToUncover).changeState(cell_state_1.CellState.UNCOVERED));
    };
    Board.prototype._uncoverCellAndCellsArround = function (currentCellCoordinates) {
        var currentCell = this.cell(currentCellCoordinates);
        if (!currentCell.isUncovered()) {
            this._justUncoverCell(currentCellCoordinates);
        }
        if (currentCell.minesArround() == 0 && !currentCell.isUncovered()) {
            this._executeIfAreValidCordinates(currentCell.topLeftCoordinate(), this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.topCenterCoordinate(), this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.topRightCoordinate(), this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.leftCoordinate(), this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.rightCoordinate(), this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.bottomLeftCoordinate(), this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.bottomCenterCoordinate(), this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.bottomRightCoordinate(), this._uncoverCellAndCellsArround);
        }
    };
    Board.prototype.uncoverMines = function () {
        var _this = this;
        this._mineLocations.forEach(function (mineCoordinates) {
            _this._justUncoverCell(mineCoordinates);
        });
    };
    Board.prototype._assertCoordinatesAreEquals = function (condinateA, coordinateB, message) {
        if (!condinateA.equals(coordinateB)) {
            throw new Error(message);
        }
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=board.js.map