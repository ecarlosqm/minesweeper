import { CellState } from "./cell_state";
import { Coordinates } from "./coordinates";
export declare class Cell {
    private readonly _coordinates;
    private readonly _state;
    private readonly _arroundMines;
    private readonly _hasMine;
    private constructor();
    static createNew(coordinates: Coordinates): Cell;
    get topLeftCoordinate(): Coordinates;
    get topCenterCoordinate(): Coordinates;
    get topRightCoordinate(): Coordinates;
    get leftCoordinate(): Coordinates;
    get rightCoordinate(): Coordinates;
    get bottomLeftCoordinate(): Coordinates;
    get bottomCenterCoordinate(): Coordinates;
    get bottomRightCoordinate(): Coordinates;
    get coordinates(): Coordinates;
    changeState(state: CellState): Cell;
    changeArroudMinesValue(numberOfArroundMines: number): Cell;
    setMine(): Cell;
    state(): CellState;
    get hasMine(): boolean;
    get hasFlag(): boolean;
    get minesArround(): number;
    get isUncovered(): boolean;
}
//# sourceMappingURL=cell.d.ts.map