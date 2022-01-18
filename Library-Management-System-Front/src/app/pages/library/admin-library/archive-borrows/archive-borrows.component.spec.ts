import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveBorrowsComponent } from './archive-borrows.component';

describe('ArchiveBorrowsComponent', () => {
  let component: ArchiveBorrowsComponent;
  let fixture: ComponentFixture<ArchiveBorrowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveBorrowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveBorrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
