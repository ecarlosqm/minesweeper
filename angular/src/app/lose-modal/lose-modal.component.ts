import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lose-modal',
  templateUrl: './lose-modal.component.html',
  styleUrls: ['./lose-modal.component.sass']
})
export class LoseModalComponent implements OnInit {

  @Output() onTryAgain: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  tryAgain(){
    this.onTryAgain.emit();
  }

}
