import { CellState } from "./cell_state";
import { Coordinates } from "./coordinates";
export declare class Cell {
    private readonly _coordinates;
    private readonly _state;
    private readonly _arroundMines;
    private readonly _hasMine;
    private constructor();
    static createNew(coordinates: Coordinates): Cell;
    topLeftCoordinate(): Coordinates;
    topCenterCoordinate(): Coordinates;
    topRightCoordinate(): Coordinates;
    leftCoordinate(): Coordinates;
    rightCoordinate(): Coordinates;
    bottomLeftCoordinate(): Coordinates;
    bottomCenterCoordinate(): Coordinates;
    bottomRightCoordinate(): Coordinates;
    coordinates(): Coordinates;
    changeState(state: CellState): Cell;
    changeArroudMinesValue(numberOfArroundMines: number): Cell;
    setMine(): Cell;
    state(): CellState;
    hasMine(): boolean;
    hasFlag(): boolean;
    minesArround(): number;
    isUncovered(): boolean;
}
//# sourceMappingURL=cell.d.ts.map