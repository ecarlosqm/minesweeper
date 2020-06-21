import { Board } from "./board"
import { MineSetter, DefaultMineSetter } from "./mine_setter";
import { CellsGenerator, DefaultCellsGenerator } from "./cells_generator";
import { Coordinates } from "./coordinates";
import { Cell } from "./cell";

export class Minesweeper {

    private _board:Board;
    
    constructor(){
        let mineSetter:MineSetter = new DefaultMineSetter();
        let cellsGenerator: CellsGenerator = new DefaultCellsGenerator();
        this._board =  new Board(cellsGenerator,mineSetter);
    }

    public newBoard(size:number){
        this._board.new(size);
    }

    public uncover(coordinates:Coordinates){
        this._board.uncover(coordinates);
    }
    public setFlag(coordinates: Coordinates){
        this._board.setFlag(coordinates);
    }

    public size():number{
        return this._board.size();
    }

    public board():Array<Cell>{
        return this._board.cells();
    }

    public onUncoverMine(callback: (coordinates:Coordinates)=>void):Function{
        return this._board.onUncovereMine(callback);
    }

    public onWin(callback: ()=>void):Function{
        return this._board.onWin(callback);
    }

    public uncoverMines(){
        this._board.uncoverMines();
    }
}