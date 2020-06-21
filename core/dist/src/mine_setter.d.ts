import { Board } from "./board";
import { Coordinates } from "./coordinates";
export interface MineSetter {
    setMines(board: Board, excludeCellsIn: Coordinates): void;
}
export declare class DefaultMineSetter implements MineSetter {
    setMines(board: Board, excludeCell: Coordinates): void;
    private _iCanPutAMineHere;
    private _totalMines;
    private _addCellToMine;
    private _randomCordinate;
}
export declare class FixMineSetter implements MineSetter {
    private _setMinesAt;
    constructor(_setMinesAt: Array<Coordinates>);
    setMines(board: Board, excludeCell: Coordinates): void;
}
//# sourceMappingURL=mine_setter.d.ts.map