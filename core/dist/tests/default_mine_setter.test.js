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
var faker = __importStar(require("faker"));
var cells_generator_1 = require("../src/cells_generator");
var mine_setter_1 = require("../src/mine_setter");
var board_1 = require("../src/board");
var coordinates_1 = require("../src/coordinates");
test('No mines in exlude coordinate', function () {
    var boardSize = faker.random.number({ min: 9, max: 10 });
    var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
    var mineSetter = new mine_setter_1.DefaultMineSetter();
    var board = new board_1.Board(cellsGenerator, mineSetter);
    var randomCoordinate = new coordinates_1.Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));
    for (var index = 0; index < boardSize * boardSize; index++) {
        board.new(boardSize);
        board.uncover(randomCoordinate);
        expect(board.cell(randomCoordinate).hasMine).toEqual(false);
    }
});
test('Set mine only once in the same cell', function () {
    var boardSize = faker.random.number({ min: 9, max: 10 });
    var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
    var mineSetter = new mine_setter_1.DefaultMineSetter();
    var board = new board_1.Board(cellsGenerator, mineSetter);
    board.new(boardSize);
    var randomCoordinate = new coordinates_1.Coordinates(faker.random.number({ min: 1, max: boardSize }), faker.random.number({ min: 1, max: boardSize }));
    var extractCoordinatesFromParams = function (arr) { return arr.map(function (params, indext, paramsArr) {
        return params[0];
    }); };
    var mapCoordinatesToString = function (arr) { return arr.map(function (coordinates, indext, coordinatesArray) {
        return coordinates.toString();
    }); };
    var isArrayUnique = function (arr) { return Array.isArray(arr) && new Set(arr).size === arr.length; };
    var boardSetMinesMock = jest.spyOn(board, 'setMine');
    for (var index = 0; index < boardSize * boardSize; index++) {
        mineSetter.setMines(board, randomCoordinate);
        expect(isArrayUnique(mapCoordinatesToString(extractCoordinatesFromParams(boardSetMinesMock.mock.calls)))).toBeTruthy();
        boardSetMinesMock.mockReset();
    }
    boardSetMinesMock.mockRestore();
});
//# sourceMappingURL=default_mine_setter.test.js.map