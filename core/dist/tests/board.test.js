"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = require("../src/board");
var cell_1 = require("../src/cell");
var cell_state_1 = require("../src/cell_state");
var coordinates_1 = require("../src/coordinates");
var faker = __importStar(require("faker"));
var cells_generator_1 = require("../src/cells_generator");
var mine_setter_1 = require("../src/mine_setter");
test('throw an error when start a board with sizeboard = 1', function () {
    var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
    var mineSetter = new mine_setter_1.DefaultMineSetter();
    var board = new board_1.Board(cellsGenerator, mineSetter);
    var invalidCall = function () {
        board.new(8);
    };
    expect(invalidCall).toThrow();
});
test('cell() Return the correct cell', function () {
    var boardSize = faker.random.number({ min: 9, max: 10 });
    var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
    var mineSetter = new mine_setter_1.DefaultMineSetter();
    var board = new board_1.Board(cellsGenerator, mineSetter);
    var randomCoordinate = new coordinates_1.Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));
    board.new(boardSize);
    var expectedCell = cell_1.Cell.createNew(randomCoordinate);
    expect(board.cell(randomCoordinate)).toEqual(expectedCell);
});
test('uncover() set the correct arroundMineValue for each cell in ther first move', function () {
    var boardSize = 9;
    var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
    var coordinatesToSetMine = [
        new coordinates_1.Coordinates(2, 2),
        new coordinates_1.Coordinates(4, 2),
        new coordinates_1.Coordinates(2, 4),
        new coordinates_1.Coordinates(4, 4),
    ];
    var mineSetter = new mine_setter_1.FixMineSetter(coordinatesToSetMine);
    var board = new board_1.Board(cellsGenerator, mineSetter);
    var fitsMove = new coordinates_1.Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));
    board.new(boardSize);
    board.uncover(fitsMove);
    expect(board.cell(new coordinates_1.Coordinates(1, 1)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(2, 1)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(3, 1)).minesArround).toBe(2);
    expect(board.cell(new coordinates_1.Coordinates(4, 1)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(5, 1)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(1, 2)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(2, 2)).minesArround).toBe(0);
    expect(board.cell(new coordinates_1.Coordinates(3, 2)).minesArround).toBe(2);
    expect(board.cell(new coordinates_1.Coordinates(4, 2)).minesArround).toBe(0);
    expect(board.cell(new coordinates_1.Coordinates(5, 2)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(1, 3)).minesArround).toBe(2);
    expect(board.cell(new coordinates_1.Coordinates(2, 3)).minesArround).toBe(2);
    expect(board.cell(new coordinates_1.Coordinates(3, 3)).minesArround).toBe(4);
    expect(board.cell(new coordinates_1.Coordinates(4, 3)).minesArround).toBe(2);
    expect(board.cell(new coordinates_1.Coordinates(5, 3)).minesArround).toBe(2);
    expect(board.cell(new coordinates_1.Coordinates(1, 4)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(2, 4)).minesArround).toBe(0);
    expect(board.cell(new coordinates_1.Coordinates(3, 4)).minesArround).toBe(2);
    expect(board.cell(new coordinates_1.Coordinates(4, 4)).minesArround).toBe(0);
    expect(board.cell(new coordinates_1.Coordinates(5, 4)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(1, 5)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(2, 5)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(3, 5)).minesArround).toBe(2);
    expect(board.cell(new coordinates_1.Coordinates(4, 5)).minesArround).toBe(1);
    expect(board.cell(new coordinates_1.Coordinates(5, 5)).minesArround).toBe(1);
});
test('uncover() calls once MineSetter.setMines() only for the first move', function () {
    var boardSize = 9;
    var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
    var mineSetter = new mine_setter_1.DefaultMineSetter();
    var numberOfTimesCallsCellsGenerator = jest.spyOn(mineSetter, 'setMines');
    var board = new board_1.Board(cellsGenerator, mineSetter);
    var fitsMove = new coordinates_1.Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));
    var secondMove = new coordinates_1.Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));
    board.new(boardSize);
    board.uncover(fitsMove);
    expect(numberOfTimesCallsCellsGenerator).toHaveBeenCalledTimes(1);
    board.uncover(secondMove);
    expect(numberOfTimesCallsCellsGenerator).toHaveBeenCalledTimes(1);
    numberOfTimesCallsCellsGenerator.mockRestore();
});
test('uncover() change the state of cell to UNCOVERED', function () {
    var boardSize = faker.random.number({ min: 9, max: 10 });
    var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
    var mineSetter = new mine_setter_1.DefaultMineSetter();
    var board = new board_1.Board(cellsGenerator, mineSetter);
    var randomCoordinate = new coordinates_1.Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));
    board.new(boardSize);
    board.uncover(randomCoordinate);
    expect(board.cell(randomCoordinate).state()).toEqual(cell_state_1.CellState.UNCOVERED);
});
//# sourceMappingURL=board.test.js.map