import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDateModalComponent } from './return-date-modal.component';

describe('ReturnDateModalComponent', () => {
  let component: ReturnDateModalComponent;
  let fixture: ComponentFixture<ReturnDateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnDateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
