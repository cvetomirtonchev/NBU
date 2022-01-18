import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/core/services/datepicker.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { LibraryService } from 'src/app/core/services/library.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-return-modal',
  templateUrl: './return-modal.component.html',
  styleUrls: ['./return-modal.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ]
})
export class ReturnModalComponent implements OnInit {
  @Input() borrowerId: string;
  @Input() bookId: number;
  @Output() reloadData = new EventEmitter();

  formGroup: FormGroup;
  user: User;

  constructor(private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      BorrowerId: new FormControl(this.borrowerId),
      BookId: new FormControl(this.bookId),
      ReturnDate: new FormControl(null),
    });
  }

  submitForm() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const rawValues = this.formGroup.getRawValue();
      const dateSplitFrom = rawValues['ReturnDate'].split('.');
      rawValues['ReturnDate'] = `${dateSplitFrom[2]}-${dateSplitFrom[1]}-${dateSplitFrom[0]}`;
      this.libraryService.updateReturnedDate(rawValues).subscribe(x => {
        if (x[0].result > 0) {
          this.alertService.success(x[0].message);
          this.reloadData.emit();
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
