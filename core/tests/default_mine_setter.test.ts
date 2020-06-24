import *  as faker from "faker";
import { CellsGenerator, DefaultCellsGenerator } from "../src/cells_generator";
import { DefaultMineSetter, MineSetter } from "../src/mine_setter";
import { Board } from "../src/board";
import { Coordinates } from "../src/coordinates";


test('No mines in exlude coordinate', () => {
    const boardSize: number = faker.random.number({ min: 9, max: 10 })

    const cellsGenerator: CellsGenerator = new DefaultCellsGenerator();
    const mineSetter: MineSetter = new DefaultMineSetter();

    const board: Board = new Board(cellsGenerator, mineSetter);

    const randomCoordinate: Coordinates = new Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));

    for (let index = 0; index < boardSize * boardSize; index++) {
        board.new(boardSize);
        board.uncover(randomCoordinate);
        expect(board.cell(randomCoordinate).hasMine).toEqual(false);
    }
})

test('Set mine only once in the same cell', () => {
    const boardSize: number = faker.random.number({ min: 9, max: 10 });

    const cellsGenerator: CellsGenerator = new DefaultCellsGenerator();
    const mineSetter: MineSetter = new DefaultMineSetter();

    const board: Board = new Board(cellsGenerator, mineSetter);
    
    board.new(boardSize);

    const randomCoordinate: Coordinates = new Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));

    const extractCoordinatesFromParams = (arr: any[][]) => arr.map((params,indext,paramsArr)=>{
        return params[0];
    });

    const mapCoordinatesToString = (arr: Coordinates[]) => arr.map((coordinates,indext,coordinatesArray)=>{
        return coordinates.toString();
    });

    const isArrayUnique = (arr:Array<any>) => Array.isArray(arr) && new Set(arr).size === arr.length;

    const boardSetMinesMock = jest.spyOn(board, 'setMine',);

    for (let index = 0; index < boardSize * boardSize; index++) {

        mineSetter.setMines(board, randomCoordinate);
        expect(isArrayUnique(mapCoordinatesToString(extractCoordinatesFromParams(boardSetMinesMock.mock.calls)))).toBeTruthy();

        boardSetMinesMock.mockReset();
    }

    boardSetMinesMock.mockRestore();
})