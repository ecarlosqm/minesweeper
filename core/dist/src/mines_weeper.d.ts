import { Coordinates } from "./coordinates";
import { Cell } from "./cell";
export declare class MinesWeeper {
    private _board;
    constructor();
    newBoard(size: number): void;
    uncover(coordinates: Coordinates): void;
    size(): number;
    board(): Array<Cell>;
    onUncoverMine(callback: (coordinates: Coordinates) => void): Function;
    onWin(callback: () => void): Function;
}
//# sourceMappingURL=mines_weeper.d.ts.map