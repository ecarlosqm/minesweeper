import { Cell } from "./cell";
import { Coordinates } from "./coordinates";
import { CellState } from "./cell_state";
import { CellsGenerator } from "./cells_generator";
import { MineSetter } from "./mine_setter";

export class Board {

    private _cells: Cell[][] = [];
    private _mineLocations: Coordinates[] = [];
    private _uncoveredMineSuscribers: Set<(coordinates: Coordinates) => void> = new Set();
    private _winSuscribers: Set<() => void> = new Set();
    private _isFirstMove = true;
    private _isBoardBlocked = false;
    private _cellsUncoveredWithoutMines = 0;
    private _minesInBoard = 0;

    constructor(private _cellGenerator: CellsGenerator, private _mineSetter: MineSetter) {
        this._uncoverCellAndCellsArround = this._uncoverCellAndCellsArround.bind(this);
        this._addOneToMineArroundValue = this._addOneToMineArroundValue.bind(this);

    }

    public onUncovereMine(callback: (coordinates: Coordinates) => void): Function {
        this._uncoveredMineSuscribers.add(callback);
        return () => this._removeOnUncoverMineSuscriber(callback);
    }

    private _removeOnUncoverMineSuscriber(callback: (coordinates: Coordinates) => void) {
        this._uncoveredMineSuscribers.delete(callback);
    }

    private _callOnUncoverMineSuscribers(coordinates: Coordinates) {
        this._uncoveredMineSuscribers.forEach((callback, index, callbacks) => {
            callback(coordinates);
        })
    }

    public onWin(callback: () => void): Function {
        this._winSuscribers.add(callback);
        return () => this._removeOnWinSuscriber(callback);
    }

    private _removeOnWinSuscriber(callback: () => void) {
        this._winSuscribers.delete(callback);
    }

    private _callOnWinSuscribers() {
        this._winSuscribers.forEach((callback, index, callbacks) => {
            callback();
        })
    }

    private _reset() {
        this._cells = []
        this._mineLocations = [];
        this._isFirstMove = true;
        this._isBoardBlocked = false;
        this._cellsUncoveredWithoutMines = 0;
        this._minesInBoard = 0;
    }

    public new(size: number) {

        this._reset();

        if (size < 9) {
            throw new Error("The board must be larger than 1");
        }

        this._cells = this._cellGenerator.generate(size);
    }

    /// Recibe a coordinates to exclude because the first move never loses
    public _setMinesAfterFirsMove(excludeCellIn: Coordinates) {
        this._mineSetter.setMines(this, excludeCellIn);
    }

    public get cells(): Cell[] {
        return Array<Cell>().concat(...this._cells);
    }

    public cell(coordinates: Coordinates): Cell {
        return this._cells[this._coordinateToIndex(coordinates.x)][this._coordinateToIndex(coordinates.y)];
    }

    private _coordinateToIndex(coordinate: number) {
        return coordinate - 1;
    }

    private _updateCell(coordinates: Coordinates, cell: Cell) {

        this._assertCoordinatesAreEquals(coordinates, cell.coordinates, 'To remplace a cell, the coordinates and cell.myCoordinate() must be equals')

        this._cells[this._coordinateToIndex(coordinates.x,)][this._coordinateToIndex(coordinates.y)] = cell;

    }

    private _totalNumberOfCell(): number {
        return this.size * this.size;
    }

    private _checkIfWin(): boolean {
        return this._cellsUncoveredWithoutMines === this._totalNumberOfCell() - this._minesInBoard;
    }

    private _isAvalidCoordinate(cordinate: Coordinates) {
        return cordinate.x <= this.size &&
            cordinate.y <= this.size &&
            cordinate.x > 0 &&
            cordinate.y > 0;
    }

    public get size(): number {
        return this._cells.length;
    }

    public uncover(coordinates: Coordinates) {

        if (this._isBoardBlocked) {
            return
        }

        if (this._isFirstMove) {
            this._setMinesAfterFirsMove(coordinates);
            this._isFirstMove = false;
        }

        if (this.cell(coordinates).hasMine) {
            this._justUncoverCell(coordinates);
            this._callOnUncoverMineSuscribers(coordinates);
            this._isBoardBlocked = true;
        }

        this._uncoverCellAndCellsArround(coordinates);

        if (this._checkIfWin()) {
            this._isBoardBlocked = true;
            this._callOnWinSuscribers();
        }

    }

    public setFlag(coordinates:Coordinates){
        this._updateCell(coordinates,this.cell(coordinates).changeState(CellState.FLAG));
    }

    public setMine(coordinates: Coordinates) {

        this._minesInBoard++
        this._mineLocations.push(coordinates);

        let cellToMine: Cell = this.cell(coordinates);
        this._updateCell(coordinates, cellToMine.setMine());

        this._executeIfAreValidCordinates(cellToMine.topLeftCoordinate, this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.topCenterCoordinate, this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.topRightCoordinate, this._addOneToMineArroundValue);

        this._executeIfAreValidCordinates(cellToMine.leftCoordinate, this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.rightCoordinate, this._addOneToMineArroundValue);

        this._executeIfAreValidCordinates(cellToMine.bottomLeftCoordinate, this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.bottomCenterCoordinate, this._addOneToMineArroundValue);
        this._executeIfAreValidCordinates(cellToMine.bottomRightCoordinate, this._addOneToMineArroundValue);
    }

    private _executeIfAreValidCordinates(cooridnates: Coordinates, execute: (validCoordinates: Coordinates) => void, orElse?: () => void) {
        if (this._isAvalidCoordinate(cooridnates)) {
            execute(cooridnates);
        } else {
            orElse?.call(this);
        }
    }

    private _addOneToMineArroundValue(coordinates: Coordinates) {
        this._updateCell(coordinates, this.cell(coordinates).changeArroudMinesValue(this.cell(coordinates).minesArround + 1));
    }

    private _justUncoverCell(cellToUncover: Coordinates) {
        if (!this.cell(cellToUncover).hasMine) {
            this._cellsUncoveredWithoutMines++
        }
        this._updateCell(cellToUncover, this.cell(cellToUncover).changeState(CellState.UNCOVERED));
    }

    private _uncoverCellAndCellsArround(currentCellCoordinates: Coordinates) {
        const currentCell: Cell = this.cell(currentCellCoordinates);

        if (!currentCell.isUncovered) {
            this._justUncoverCell(currentCellCoordinates);
        }

        if (currentCell.minesArround == 0 && !currentCell.isUncovered) {

            this._executeIfAreValidCordinates(currentCell.topLeftCoordinate, this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.topCenterCoordinate, this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.topRightCoordinate, this._uncoverCellAndCellsArround);

            this._executeIfAreValidCordinates(currentCell.leftCoordinate, this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.rightCoordinate, this._uncoverCellAndCellsArround);

            this._executeIfAreValidCordinates(currentCell.bottomLeftCoordinate, this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.bottomCenterCoordinate, this._uncoverCellAndCellsArround);
            this._executeIfAreValidCordinates(currentCell.bottomRightCoordinate, this._uncoverCellAndCellsArround);
        }
    }

    public uncoverMines(){
        this._mineLocations.forEach(mineCoordinates => {
            this._justUncoverCell(mineCoordinates);
        });
    }

    private _assertCoordinatesAreEquals(condinateA: Coordinates, coordinateB: Coordinates, message: string) {
        if (!condinateA.equals(coordinateB)) {
            throw new Error(message);
        }
    }

}
