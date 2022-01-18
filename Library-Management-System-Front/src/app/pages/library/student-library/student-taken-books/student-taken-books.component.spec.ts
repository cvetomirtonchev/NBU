import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTakenBooksComponent } from './student-taken-books.component';

describe('StudentTakenBooksComponent', () => {
  let component: StudentTakenBooksComponent;
  let fixture: ComponentFixture<StudentTakenBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTakenBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTakenBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
