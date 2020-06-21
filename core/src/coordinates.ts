export class Coordinates {

    constructor(private _x: number, private _y: number) { }

    x(): number {
        return this._x;
    }

    y(): number {
        return this._y;
    }

    equals(coordinates: Coordinates): boolean {
        return this._x === coordinates.x() && this._y === coordinates.y();
    }

    toString(){
        return `${this._x}${this._y}`
    }

}
