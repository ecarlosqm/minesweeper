import { Board } from "./board";
import { Coordinates } from "./coordinates";
import { Cell } from ".";

export interface MineSetter {
    setMines(board: Board, excludeCellsIn: Coordinates): void;
}

export class DefaultMineSetter implements MineSetter {

    setMines(board: Board, excludeCell: Coordinates): void {

        let cellsToMine: Coordinates[] = [];

        while (cellsToMine.length != this._totalMines(board.size)) {

            let coordinates: Coordinates = new Coordinates(this._randomCordinate(board.size), this._randomCordinate(board.size));

            cellsToMine = this._addCellToMine(coordinates, excludeCell, cellsToMine,board);

        }

        cellsToMine.forEach(coordinates => {
            board.setMine(coordinates);
        });

    }

    private _iCanPutAMineHere(cellToMine: Coordinates, excludeCordinate: Coordinates, cellsToMine: Coordinates[], board: Board) {
        const excludedCell: Cell = board.cell(excludeCordinate);

        return !(excludeCordinate.equals(cellToMine)) &&
            !(cellsToMine.some((coordinates, index, coordinatesArray) => { return coordinates.equals(cellToMine) })) &&
            !(cellToMine.equals(excludedCell.topLeftCoordinate)) &&
            !(cellToMine.equals(excludedCell.topCenterCoordinate)) &&
            !(cellToMine.equals(excludedCell.topRightCoordinate)) &&
            !(cellToMine.equals(excludedCell.leftCoordinate)) &&
            !(cellToMine.equals(excludedCell.rightCoordinate)) &&
            !(cellToMine.equals(excludedCell.bottomLeftCoordinate)) &&
            !(cellToMine.equals(excludedCell.bottomCenterCoordinate)) &&
            !(cellToMine.equals(excludedCell.bottomRightCoordinate));

    }

    private _totalMines(boardSize: number) {
        return boardSize * 2;
    }

    private _addCellToMine(cellToMine: Coordinates, excludeCell: Coordinates, currentCellToMine: Coordinates[], board: Board): Coordinates[] {
        let result: Coordinates[] = Array.from(currentCellToMine);
        if (
            this._iCanPutAMineHere(cellToMine, excludeCell, currentCellToMine, board)
        ) {
            result.push(cellToMine);
        }
        return result;
    }

    private _randomCordinate(boardSize: number): number {
        return Math.round(Math.random() * (boardSize - 1) + 1);
    }
}

export class FixMineSetter implements MineSetter {

    constructor(private _setMinesAt: Array<Coordinates>) {

    }

    setMines(board: Board, excludeCell: Coordinates): void {
        this._setMinesAt.forEach((coordinate, index, coordinates) => {
            board.setMine(coordinate)
        });
    }
}