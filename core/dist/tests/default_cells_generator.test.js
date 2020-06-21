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
var cell_1 = require("../src/cell");
var coordinates_1 = require("../src/coordinates");
test('Board contain n x n cells where n is the board size', function () {
    var _a;
    var boardSize = faker.random.number({ min: 9, max: 10 });
    var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
    expect((_a = Array()).concat.apply(_a, cellsGenerator.generate(boardSize)).length).toBe(boardSize * boardSize);
});
test('All cells where created as espected', function () {
    var _a;
    var cellExpected = [
        cell_1.Cell.createNew(new coordinates_1.Coordinates(1, 1)),
        cell_1.Cell.createNew(new coordinates_1.Coordinates(1, 2)),
        cell_1.Cell.createNew(new coordinates_1.Coordinates(2, 1)),
        cell_1.Cell.createNew(new coordinates_1.Coordinates(2, 2)),
    ];
    var boardSize = 2;
    var cellsGenerator = new cells_generator_1.DefaultCellsGenerator();
    expect(((_a = Array()).concat.apply(_a, cellsGenerator.generate(boardSize)))).toEqual(expect.arrayContaining(cellExpected));
});
//# sourceMappingURL=default_cells_generator.test.js.map