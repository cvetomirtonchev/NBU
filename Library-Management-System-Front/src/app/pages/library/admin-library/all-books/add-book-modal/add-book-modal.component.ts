import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LibraryService } from 'src/app/core/services/library.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.scss']
})
export class AddBookModalComponent implements OnInit {

  @Input() books: any;
  @Output() reloadData = new EventEmitter();

  user: User;
  formGroup: FormGroup;
  categories: any;

  constructor(private libraryService: LibraryService,
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(x => this.user = x);
    this.getCategories();
    this.formGroup = new FormGroup({
      BookId: new FormControl(null),
      BookTitle: new FormControl(null),
      Language: new FormControl(null),
      PublicationYear: new FormControl(null),
      CategoryId: new FormControl(null),
      LibrarianId: new FormControl(this.user.id),
    });
  }

  getCategories() {
    this.libraryService.getCategories().subscribe(x => {
      this.categories = x;
    });
  }

  addBookTitle(name) {
    return name;
  }

  submitForm() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const rawValues = this.formGroup.getRawValue();
      this.libraryService.insertBook(rawValues).subscribe(x => {
        if (x[0].result > 0) {
          this.reloadData.emit();
          this.alertService.success(x[0].message);
          this.closeModal();
        } else {
          this.alertService.error(x[0].message);
        }
      });
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
