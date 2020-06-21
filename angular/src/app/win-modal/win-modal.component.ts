import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-win-modal',
  templateUrl: './win-modal.component.html',
  styleUrls: ['./win-modal.component.sass']
})
export class WinModalComponent implements OnInit {

  @Output() onTryAgain: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  tryAgain(){
    this.onTryAgain.emit();
  }

}
