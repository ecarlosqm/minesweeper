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
var cell_1 = require("../src/cell");
var coordinates_1 = require("../src/coordinates");
var cell_state_1 = require("../src/cell_state");
var faker = __importStar(require("faker"));
test("changeState() don't mute the original object", function () {
    var randomCoordinate = new coordinates_1.Coordinates(faker.random.number({ min: 1, max: 10 }), faker.random.number({ min: 1, max: 10 }));
    var cell = cell_1.Cell.createNew(randomCoordinate);
    cell.changeState(faker.random.arrayElement([cell_state_1.CellState.HIDE, cell_state_1.CellState.SIGN, cell_state_1.CellState.UNCOVERED]));
    expect(cell).toEqual(cell_1.Cell.createNew(randomCoordinate));
});
//# sourceMappingURL=cell.test.js.map