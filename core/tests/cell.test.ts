import { Cell } from "../src/cell";
import { Coordinates } from "../src/coordinates";
import { CellState } from "../src/cell_state";
import * as faker from "faker"

test("changeState() don't mute the original object", () => {
    
    const randomCoordinate : Coordinates = new Coordinates(faker.random.number({min: 1, max:10}),faker.random.number({min: 1, max:10})) ;

    const cell: Cell = Cell.createNew(randomCoordinate);
    
    cell.changeState(faker.random.arrayElement([CellState.HIDE, CellState.SIGN, CellState.UNCOVERED]))
    
    expect(cell).toEqual(Cell.createNew(randomCoordinate));
    
});