import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoseModalComponent } from './lose-modal.component';

describe('LoseModalComponent', () => {
  let component: LoseModalComponent;
  let fixture: ComponentFixture<LoseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
