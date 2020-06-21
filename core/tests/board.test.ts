import { Board } from "../src/board";
import { Cell } from "../src/cell";
import { CellState } from "../src/cell_state";
import { Coordinates } from "../src/coordinates";
import *  as faker from "faker";
import { DefaultCellsGenerator, CellsGenerator } from "../src/cells_generator";
import { MineSetter, DefaultMineSetter, FixMineSetter } from "../src/mine_setter";

test('throw an error when start a board with sizeboard = 1', () => {
  const cellsGenerator: CellsGenerator = new DefaultCellsGenerator();
  const mineSetter: MineSetter = new DefaultMineSetter();

  const board: Board = new Board(cellsGenerator, mineSetter);

  const invalidCall = ()=> {
    board.new(8)
  }

  expect(invalidCall).toThrow();
})

test('cell() Return the correct cell', () => {

  const boardSize: number = faker.random.number({ min: 9, max: 10 })

  const cellsGenerator: CellsGenerator = new DefaultCellsGenerator();
  const mineSetter: MineSetter = new DefaultMineSetter();

  const board: Board = new Board(cellsGenerator, mineSetter);

  const randomCoordinate: Coordinates = new Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));

  board.new(boardSize);

  const expectedCell: Cell = Cell.createNew(randomCoordinate)

  expect(board.cell(randomCoordinate)).toEqual(expectedCell);

})


test('uncover() set the correct arroundMineValue for each cell in ther first move', () => {
  const boardSize: number = 9

  const cellsGenerator: CellsGenerator = new DefaultCellsGenerator();

  const coordinatesToSetMine: Array<Coordinates> = [
    new Coordinates(2, 2),
    new Coordinates(4, 2),
    new Coordinates(2, 4),
    new Coordinates(4, 4),
  ];

  const mineSetter: MineSetter = new FixMineSetter(coordinatesToSetMine);

  const board: Board = new Board(cellsGenerator, mineSetter);

  const fitsMove: Coordinates = new Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));

  board.new(boardSize);

  board.uncover(fitsMove);

  expect(board.cell(new Coordinates(1, 1)).minesArround()).toBe(1);
  expect(board.cell(new Coordinates(2, 1)).minesArround()).toBe(1);
  expect(board.cell(new Coordinates(3, 1)).minesArround()).toBe(2);
  expect(board.cell(new Coordinates(4, 1)).minesArround()).toBe(1);
  expect(board.cell(new Coordinates(5, 1)).minesArround()).toBe(1);

  expect(board.cell(new Coordinates(1, 2)).minesArround()).toBe(1);
  expect(board.cell(new Coordinates(2, 2)).minesArround()).toBe(0);
  expect(board.cell(new Coordinates(3, 2)).minesArround()).toBe(2);
  expect(board.cell(new Coordinates(4, 2)).minesArround()).toBe(0);
  expect(board.cell(new Coordinates(5, 2)).minesArround()).toBe(1);

  expect(board.cell(new Coordinates(1, 3)).minesArround()).toBe(2);
  expect(board.cell(new Coordinates(2, 3)).minesArround()).toBe(2);
  expect(board.cell(new Coordinates(3, 3)).minesArround()).toBe(4);
  expect(board.cell(new Coordinates(4, 3)).minesArround()).toBe(2);
  expect(board.cell(new Coordinates(5, 3)).minesArround()).toBe(2);

  expect(board.cell(new Coordinates(1, 4)).minesArround()).toBe(1);
  expect(board.cell(new Coordinates(2, 4)).minesArround()).toBe(0);
  expect(board.cell(new Coordinates(3, 4)).minesArround()).toBe(2);
  expect(board.cell(new Coordinates(4, 4)).minesArround()).toBe(0);
  expect(board.cell(new Coordinates(5, 4)).minesArround()).toBe(1);

  expect(board.cell(new Coordinates(1, 5)).minesArround()).toBe(1);
  expect(board.cell(new Coordinates(2, 5)).minesArround()).toBe(1);
  expect(board.cell(new Coordinates(3, 5)).minesArround()).toBe(2);
  expect(board.cell(new Coordinates(4, 5)).minesArround()).toBe(1);
  expect(board.cell(new Coordinates(5, 5)).minesArround()).toBe(1);
})

test('uncover() calls once MineSetter.setMines() only for the first move', () => {
  const boardSize: number = 9

  const cellsGenerator: CellsGenerator = new DefaultCellsGenerator();
  const mineSetter: MineSetter = new DefaultMineSetter();

  const numberOfTimesCallsCellsGenerator = jest.spyOn(mineSetter, 'setMines');

  const board: Board = new Board(cellsGenerator, mineSetter);

  const fitsMove: Coordinates = new Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));

  const secondMove: Coordinates = new Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));

  board.new(boardSize);

  board.uncover(fitsMove);

  expect(numberOfTimesCallsCellsGenerator).toHaveBeenCalledTimes(1);

  board.uncover(secondMove);

  expect(numberOfTimesCallsCellsGenerator).toHaveBeenCalledTimes(1);

  numberOfTimesCallsCellsGenerator.mockRestore();
})

test('uncover() change the state of cell to UNCOVERED', () => {
  const boardSize: number = faker.random.number({ min: 9, max: 10 })

  const cellsGenerator: CellsGenerator = new DefaultCellsGenerator();
  const mineSetter: MineSetter = new DefaultMineSetter();

  const board: Board = new Board(cellsGenerator, mineSetter);

  const randomCoordinate: Coordinates = new Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));

  board.new(boardSize);

  board.uncover(randomCoordinate);

  expect(board.cell(randomCoordinate).state()).toEqual(CellState.UNCOVERED);
})