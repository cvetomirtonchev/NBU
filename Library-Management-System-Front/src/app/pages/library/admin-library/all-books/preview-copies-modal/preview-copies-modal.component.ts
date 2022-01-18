import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { LibraryService } from 'src/app/core/services/library.service';
import { TableSortFilterPipe } from 'src/app/shared/pipes/table-sorting-pipe';

@Component({
  selector: 'app-preview-copies-modal',
  templateUrl: './preview-copies-modal.component.html',
  styleUrls: ['./preview-copies-modal.component.scss'],
  providers: [TableSortFilterPipe]
})
export class PreviewCopiesModalComponent implements OnInit {

  @Input() bindingID: number;
  @Input() bookTitle: string;
  @Input() categoryId: number;
  @Input() categoryName: string;
  @Input() language: string;
  @Input() publicationYear: string;
  @Input() librarianId: string;
  @Output() reloadDataIncrement = new EventEmitter();
  @Output() reloadDataDecrement = new EventEmitter();

  formGroup: FormGroup;
  private _data: any[];
  tableData: any[] = [];

  inputUpdate = new Subject<string>();
  enteredText = '';

  constructor(private libraryService: LibraryService,
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private sortingTablePipe: TableSortFilterPipe) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      BookId: new FormControl(null),
      BookTitle: new FormControl(this.bookTitle),
      CategoryId: new FormControl(this.categoryId),
      BindingId: new FormControl(this.bindingID),
      Language: new FormControl(this.language),
      PublicationYear: new FormControl(this.publicationYear),
      LibrarianId: new FormControl(this.librarianId)
    });
    this.inputUpdate.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(value => {
      this.formChange();
    });
    this.getBooks();
  }

  getBooks() {
    this.libraryService.getBookItems({
      bindingId: this.bindingID
    }).subscribe(res => {
      this.tableData = res;
      this._data = res;
    });
  }

  formChange() {
    this.tableData = this.sortingTablePipe
      .transform(this._data, this.enteredText);
  }

  changed($event) {
    this.inputUpdate.next($event);
  }

  closeModal() {
    this.activeModal.dismiss();
  }
  insertBookItem() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const rawValues = this.formGroup.getRawValue();
      this.libraryService.insertBookItem(rawValues).subscribe(x => {
        if (x[0].result > 0) {
          this.getBooks();
          rawValues.BookId++;
          this.reloadDataIncrement.emit();
          this.alertService.success(x[0].message);
        } else {
          this.alertService.error(x[0].message);
        }
      });
    }
  }

  deleteBookItem(bookId) {
    this.libraryService.deleteBookItem({ BookId: bookId }).subscribe(x => {
      if (x[0].result > 0) {
        this.getBooks();
        this.reloadDataDecrement.emit();
        this.alertService.success(x[0].message);
      } else {
        this.alertService.error(x[0].message);
      }
    });
  }
  clear() {
    this.tableData = this._data;
    this.enteredText = '';
  }
}
