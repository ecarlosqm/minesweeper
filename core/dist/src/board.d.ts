import { Cell } from "./cell";
import { Coordinates } from "./coordinates";
import { CellsGenerator } from "./cells_generator";
import { MineSetter } from "./mine_setter";
export declare class Board {
    private _cellGenerator;
    private _mineSetter;
    private _cells;
    private _mineLocations;
    private _uncoveredMineSuscribers;
    private _winSuscribers;
    private _isFirstMove;
    private _isBoardBlocked;
    private _cellsUncoveredWithoutMines;
    private _minesInBoard;
    constructor(_cellGenerator: CellsGenerator, _mineSetter: MineSetter);
    onUncovereMine(callback: (coordinates: Coordinates) => void): Function;
    private _removeOnUncoverMineSuscriber;
    private _callOnUncoverMineSuscribers;
    onWin(callback: () => void): Function;
    private _removeOnWinSuscriber;
    private _callOnWinSuscribers;
    private _reset;
    new(size: number): void;
    _setMinesAfterFirsMove(excludeCellIn: Coordinates): void;
    cells(): Cell[];
    cell(coordinates: Coordinates): Cell;
    private _coordinateToIndex;
    private _updateCell;
    private _totalNumberOfCell;
    private _checkIfWin;
    private _isAvalidCoordinate;
    size(): number;
    uncover(coordinates: Coordinates): void;
    setFlag(coordinates: Coordinates): void;
    setMine(coordinates: Coordinates): void;
    private _executeIfAreValidCordinates;
    private _addOneToMineArroundValue;
    private _justUncoverCell;
    private _uncoverCellAndCellsArround;
    uncoverMines(): void;
    private _assertCoordinatesAreEquals;
}
//# sourceMappingURL=board.d.ts.map