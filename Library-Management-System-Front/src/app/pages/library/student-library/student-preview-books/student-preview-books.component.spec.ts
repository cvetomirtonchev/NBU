import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPreviewBooksComponent } from './student-preview-books.component';

describe('StudentPreviewBooksComponent', () => {
  let component: StudentPreviewBooksComponent;
  let fixture: ComponentFixture<StudentPreviewBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPreviewBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPreviewBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
