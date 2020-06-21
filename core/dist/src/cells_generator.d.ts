import { Cell } from "./cell";
export interface CellsGenerator {
    generate(size: number): Cell[][];
}
export declare class DefaultCellsGenerator implements CellsGenerator {
    generate(size: number): Cell[][];
}
//# sourceMappingURL=cells_generator.d.ts.map