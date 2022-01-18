import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestedBooksComponent } from './student-requested-books.component';

describe('StudentRequestedBooksComponent', () => {
  let component: StudentRequestedBooksComponent;
  let fixture: ComponentFixture<StudentRequestedBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRequestedBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRequestedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
