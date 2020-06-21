import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Cell, Coordinates, CellState } from 'minesweeper';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.sass']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell;
  readonly flag = CellState.FLAG;
  readonly hide = CellState.HIDE;
  readonly uncovered = CellState.UNCOVERED;

  @Output() uncoverCallback = new EventEmitter<Coordinates>();
  @Output() setFlagCallback = new EventEmitter<Coordinates>();

  constructor() {

  }

  ngOnInit(): void {
  }

  uncover(coordinate:Coordinates): void {
    this.uncoverCallback.next(coordinate);
  }

  setFlag(coordinate:Coordinates): boolean {
    console.log(coordinate)
    this.setFlagCallback.next(coordinate);
    return false;
  }

}
