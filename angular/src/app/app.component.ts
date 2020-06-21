import { Component, OnInit } from '@angular/core';
import { Minesweeper as Minesweeper, Coordinates } from 'minesweeper';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WinModalComponent } from './win-modal/win-modal.component';
import { LoseModalComponent } from './lose-modal/lose-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  minesweeper: Minesweeper;
  cancelUncoverMinesSubscriber: Function;
  cancelWinSubscriber: Function;
  uncoverAudio: HTMLAudioElement;
  uncoverMineAudio: HTMLAudioElement;

  constructor(public materialDialog: MatDialog) {
  }



  ngOnInit(): void {
    this.minesweeper = new Minesweeper();
    this._newGame();

    this._loadAudios();
  }

  private _playUncoverAudio(){
    this.uncoverAudio.play();
  }

  private _playUncoverMineAudio(){
    console.log('playing')
    this.uncoverMineAudio.play();
  }

  private _loadAudios(){
    this.uncoverAudio = new Audio();
    this.uncoverAudio.src = "assets/sounds/uncover.ogg";
    this.uncoverAudio.load();

    this.uncoverMineAudio = new Audio();
    this.uncoverMineAudio.src = "assets/sounds/uncover_mine.ogg";
    this.uncoverMineAudio.load();
  }

  uncover(coordinates: Coordinates): void {
    this.minesweeper.uncover(coordinates);
    this._playUncoverAudio();
  }

  setFlag(coordinates: Coordinates): void {
    this.minesweeper.setFlag(coordinates);
  }

  onLost(coordinates: Coordinates) {
    this.cancelUncoverMinesSubscriber.call(this);
    this._playUncoverMineAudio();
    this.openLoseDialog();
  }

  onWin() {
    this.cancelWinSubscriber.call(this);
    this.openWinDialog();
  }

  openWinDialog() {
    const ref = this.materialDialog.open(WinModalComponent, { disableClose: true });
    const subscriotion = ref.componentInstance.onTryAgain.subscribe((() => {
      this._newGame();
      subscriotion.unsubscribe();
    }).bind(this));
  }

  openLoseDialog() {

    this.minesweeper.uncoverMines();
    const ref = this.materialDialog.open(LoseModalComponent, { disableClose: true });

    const subscriotion = ref.componentInstance.onTryAgain.subscribe((() => {
      this._newGame();
      subscriotion.unsubscribe();
    }).bind(this));
  }

  private _newGame() {
    this.cancelUncoverMinesSubscriber?.call(this);
    this.cancelWinSubscriber?.call(this);
    console.log('ready');
    this.minesweeper.newBoard(15);
    this.cancelUncoverMinesSubscriber = this.minesweeper.onUncoverMine(this.onLost.bind(this));
    this.cancelWinSubscriber = this.minesweeper.onWin(this.onWin.bind(this));
  }

  title = 'angular';
}
