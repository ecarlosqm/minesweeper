"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCellsGenerator = void 0;
var cell_1 = require("./cell");
var coordinates_1 = require("./coordinates");
var DefaultCellsGenerator = /** @class */ (function () {
    function DefaultCellsGenerator() {
    }
    DefaultCellsGenerator.prototype.generate = function (size) {
        var result = [];
        for (var xCoordinate = 1; xCoordinate <= size; xCoordinate++) {
            var column = [];
            for (var yCoordinate = 1; yCoordinate <= size; yCoordinate++) {
                column.push(cell_1.Cell.createNew(new coordinates_1.Coordinates(xCoordinate, yCoordinate)));
            }
            result.push(column);
        }
        return result;
    };
    return DefaultCellsGenerator;
}());
exports.DefaultCellsGenerator = DefaultCellsGenerator;
//# sourceMappingURL=cells_generator.js.map