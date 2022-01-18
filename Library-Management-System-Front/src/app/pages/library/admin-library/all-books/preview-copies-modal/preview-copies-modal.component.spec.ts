import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCopiesModalComponent } from './preview-copies-modal.component';

describe('PreviewCopiesModalComponent', () => {
  let component: PreviewCopiesModalComponent;
  let fixture: ComponentFixture<PreviewCopiesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewCopiesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewCopiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
