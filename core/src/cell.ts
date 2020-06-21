import { CellState } from "./cell_state";
import { Coordinates } from "./coordinates";

export class Cell {
    private constructor(private readonly _coordinates: Coordinates, private readonly _state: CellState, private readonly _arroundMines: number, private readonly _hasMine: boolean) { }

    static createNew (coordinates: Coordinates): Cell{
        return new Cell(coordinates, CellState.HIDE, 0, false);
    }

    public topLeftCoordinate(): Coordinates{
        return new Coordinates (this.coordinates().x()-1,this.coordinates().y()+1)
    }

    public topCenterCoordinate(): Coordinates{
        return new Coordinates (this.coordinates().x(),this.coordinates().y()+1)
    }

    public topRightCoordinate(): Coordinates{
        return new Coordinates (this.coordinates().x()+1,this.coordinates().y()+1)
    }

    public leftCoordinate(): Coordinates{
        return new Coordinates (this.coordinates().x()-1,this.coordinates().y())
    }

    public rightCoordinate(): Coordinates{
        return new Coordinates (this.coordinates().x()+1,this.coordinates().y())
    }

    public bottomLeftCoordinate(): Coordinates{
        return new Coordinates (this.coordinates().x()-1,this.coordinates().y()-1)
    }

    public bottomCenterCoordinate(): Coordinates{
        return new Coordinates (this.coordinates().x(),this.coordinates().y()-1)
    }

    public bottomRightCoordinate(): Coordinates{
        return new Coordinates (this.coordinates().x()+1,this.coordinates().y()-1)
    }

    public coordinates(): Coordinates {
        return this._coordinates;
    }

    public changeState(state: CellState): Cell {
        return new Cell(this._coordinates, state, this._arroundMines, this._hasMine);
    }

    public changeArroudMinesValue(numberOfArroundMines: number): Cell {
        return new Cell(this._coordinates, this._state, numberOfArroundMines, this._hasMine);
    }

    public setMine(): Cell {
        return new Cell(this._coordinates, this._state, this._arroundMines, true);
    }

    public state(): CellState {
        return this._state;
    }

    public hasMine(): boolean {
        return this._hasMine;
    }
    
    public hasFlag():boolean {
        return this._state == CellState.FLAG;
    }

    public minesArround():number{
        return this._arroundMines;
    }

    public isUncovered():boolean{
        return this._state === CellState.UNCOVERED
    }
}
