import * as faker from 'faker'
import { CellsGenerator, DefaultCellsGenerator } from '../src/cells_generator';
import { Cell } from '../src/cell';
import { Coordinates } from '../src/coordinates';

test('Board contain n x n cells where n is the board size', () => {
    const boardSize: number = faker.random.number({ min: 9, max: 10 });

    const cellsGenerator: CellsGenerator = new DefaultCellsGenerator();
    expect(Array<Cell>().concat(...cellsGenerator.generate(boardSize)).length).toBe(boardSize * boardSize);
});

test('All cells where created as espected', () => {
    const cellExpected = [
        Cell.createNew(new Coordinates(1, 1)),
        Cell.createNew(new Coordinates(1, 2)),
        Cell.createNew(new Coordinates(2, 1)),
        Cell.createNew(new Coordinates(2, 2)),
    ]

    const boardSize: number = 2;

    const cellsGenerator: CellsGenerator = new DefaultCellsGenerator();

    expect((Array<Cell>().concat(...cellsGenerator.generate(boardSize)))).toEqual(expect.arrayContaining(cellExpected));

});