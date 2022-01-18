import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/core/services/alert.service';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/core/services/datepicker.service';
import { LibraryService } from 'src/app/core/services/library.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-return-date-modal',
  templateUrl: './return-date-modal.component.html',
  styleUrls: ['./return-date-modal.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ]
})
export class ReturnDateModalComponent implements OnInit {
  @Input() rowData: any;
  @Input() user: User;
  @Output() reloadData = new EventEmitter();

  formGroup: FormGroup;
  minDate: NgbDateStruct;

  constructor(private activeModal: NgbActiveModal,
    private dateAdapter: NgbDateAdapter<string>,
    private ngbCalendar: NgbCalendar,
    private alertService: AlertService,
    private libraryService: LibraryService) {
    const today = new Date;
    this.minDate = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    };
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      BorrowerId: new FormControl(this.rowData.id),
      BookId: new FormControl(this.rowData.bookId),
      BorrowedFrom: new FormControl(this.dateAdapter.toModel(this.ngbCalendar.getToday())),
      BorrowedTo: new FormControl(null),
      IssuerId: new FormControl(this.user.id),
      IssuerName: new FormControl(this.user.userName),
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
      this.libraryService.updateBorrower(rawValues).subscribe(x => {
        if (x[0].result > 0) {
          this.alertService.success(x[0].message);
          this.reloadData.emit(1);
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
