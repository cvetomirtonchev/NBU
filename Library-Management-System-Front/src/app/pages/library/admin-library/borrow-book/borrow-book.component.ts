import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { LibraryService } from 'src/app/core/services/library.service';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/core/services/datepicker.service';
import { NgbDateStruct, NgbDateAdapter, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ]
})
export class BorrowBookComponent implements OnInit {
  @Input() user: User;
  formGroup: FormGroup;
  model: NgbDateStruct;
  loading: boolean;
  students: any[] = [];
  books: any[] = [];
  bookIds: any[] = [];
  minDate: NgbDateStruct;

  constructor(private usersService: UsersService,
    private libraryService: LibraryService,
    private alertService: AlertService,
    private dateAdapter: NgbDateAdapter<string>,
    private ngbCalendar: NgbCalendar) {

    const today = new Date;
    this.minDate = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    };
  }

  ngOnInit(): void {
    this.usersService.getStudents().subscribe(x => {
      this.students = x;
    });
    this.libraryService.getAllBooks().subscribe(x => {
      this.books = x;
    });
    this.setForm();
  }
  setForm() {
    this.formGroup = new FormGroup({
      BorrowerId: new FormControl(null),
      BookId: new FormControl(null),
      BorrowedFrom: new FormControl(this.dateAdapter.toModel(this.ngbCalendar.getToday())),
      BorrowedTo: new FormControl(null),
      IssuerId: new FormControl(this.user.id),
      IssuerName: new FormControl(this.user.userName)
    });
  }
  submitForm() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const rawValues = this.formGroup.getRawValue();
      const dateSplitFrom = rawValues['BorrowedFrom'].split('.');
      rawValues['BorrowedFrom'] = `${dateSplitFrom[2]}-${dateSplitFrom[1]}-${dateSplitFrom[0]}`;
      const dateSplitTo = rawValues['BorrowedTo'].split('.');
      rawValues['BorrowedTo'] = `${dateSplitTo[2]}-${dateSplitTo[1]}-${dateSplitTo[0]}`;
      this.libraryService.insertBorrower(rawValues).subscribe(x => {
        if (x[0].result > 0) {
          this.setForm();
          this.alertService.success(x[0].message);
        } else {
          this.alertService.error(x[0].message);
        }
      });
    }
  }

  onChangeEvent(data) {
    this.libraryService.getAvailableBooks({ bookId: data.id }).subscribe(x => {
      this.bookIds = x;
    });
  }
}
