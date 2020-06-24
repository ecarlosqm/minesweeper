import { Coordinates } from "./coordinates";
import { Cell } from "./cell";
export declare class Minesweeper {
    private _board;
    constructor();
    newBoard(size: number): void;
    uncover(coordinates: Coordinates): void;
    setFlag(coordinates: Coordinates): void;
    get size(): number;
    get board(): Array<Cell>;
    onUncoverMine(callback: (coordinates: Coordinates) => void): Function;
    onWin(callback: () => void): Function;
    uncoverMines(): void;
}
//# sourceMappingURL=minesweeper.d.ts.map