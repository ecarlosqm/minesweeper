import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { WinModalComponent } from './win-modal/win-modal.component';
import { LoseModalComponent } from './lose-modal/lose-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    WinModalComponent,
    LoseModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [WinModalComponent,LoseModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
