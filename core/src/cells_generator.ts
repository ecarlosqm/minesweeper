import { Cell } from "./cell";
import { Coordinates } from "./coordinates";

export interface CellsGenerator {
    generate(size: number): Cell[][];
}

export class DefaultCellsGenerator implements CellsGenerator {

    generate(size: number): Cell[][] {
        let result: Cell[][] = [];

        for (let xCoordinate = 1; xCoordinate <= size; xCoordinate++) {
            let column: Cell[] = [];
            for (let yCoordinate = 1; yCoordinate <= size; yCoordinate++) {
                column.push(Cell.createNew(new Coordinates(xCoordinate, yCoordinate)));
            }
            result.push(column);
        }
        return result;
    }

}