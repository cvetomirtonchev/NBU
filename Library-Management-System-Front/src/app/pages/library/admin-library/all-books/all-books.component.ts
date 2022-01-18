import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/core/services/library.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBookModalComponent } from './add-book-modal/add-book-modal.component';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TableSortFilterPipe } from 'src/app/shared/pipes/table-sorting-pipe';
import { PreviewCopiesModalComponent } from './preview-copies-modal/preview-copies-modal.component';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss'],
  providers: [TableSortFilterPipe]
})
export class AllBooksComponent implements OnInit {
  user: User;
  private _data: any[];
  tableData: any[] = [];

  inputUpdate = new Subject<string>();
  enteredText = '';
  loading: boolean;
  constructor(private libraryService: LibraryService,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private sortingTablePipe: TableSortFilterPipe) {


  }

  ngOnInit(): void {
    this.authService.user.subscribe(x => this.user = x);
    this.getBooks();
    this.inputUpdate.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(value => {
      // this.allSelected = false;
      this.formChange();
    });
  }

  getBooks() {
    this.loading = true;
    this.libraryService.getAllBooks().subscribe(x => {
      this.tableData = x;
      this._data = x;
      this.loading = false;
    });
  }

  addBookModal() {
    const modalRef = this.modalService.open(AddBookModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.books = this.tableData;
    modalRef.componentInstance.reloadData.subscribe(x => {
      this.getBooks();
    });
  }

  previewItems(bookData) {
    const modalRef = this.modalService.open(PreviewCopiesModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.bindingID = bookData.id;
    modalRef.componentInstance.bookTitle = bookData.bookTitle;
    modalRef.componentInstance.categoryId = bookData.categoryId;
    modalRef.componentInstance.categoryName = bookData.categoryName;
    modalRef.componentInstance.language = bookData.language;
    modalRef.componentInstance.publicationYear = bookData.publicationYear;
    modalRef.componentInstance.librarianId = this.user.id;
    modalRef.componentInstance.reloadDataIncrement.subscribe(data => {
      bookData.totalNoCopies++;
    });
    modalRef.componentInstance.reloadDataDecrement.subscribe(data => {
      bookData.totalNoCopies--;
    });
  }

  deleteBook(rowData) {
    if (rowData.totalNoCopies === 0 || rowData.totalNoCopies === 1) {
      Swal.fire({
        title: `Supprimer`,
        text: `Cette action supprimera le modèle de livre!`,
        icon: 'question',
        confirmButtonText: `d'accord`,
        cancelButtonText: 'annuler',
        customClass: {
          confirmButton: 'btn btn-success mr-1',
          cancelButton: 'btn btn-danger ml-2'
        },
        buttonsStyling: false,
        showLoaderOnConfirm: true,
        showCloseButton: true,
        showCancelButton: true,
        preConfirm: () => {
          this.loading = true;
          const data = {
            bookId: rowData.id
          };
          this.libraryService.deleteBookItem(data).subscribe(x => {
            if (x[0].result > 0) {
              this.libraryService.deleteBook(data).subscribe(x => {
                if (x[0].result > 0) {
                  this.alertService.success(x[0].message);
                  this.getBooks();
                  this.loading = false;
                }
              });
            } else {
              this.alertService.error(x[0].message);
            }
          });


        },
        allowOutsideClick: () => !Swal.isLoading()
      });

    } else {
      this.alertService.warn('Supprimer toutes les copies du livre avant de réduire la principale');
    }
  }


  formChange() {
    this.tableData = this.sortingTablePipe
      .transform(this._data, this.enteredText);
  }
  changed($event) {
    this.inputUpdate.next($event);
  }
  clear(){
    this.tableData = this._data;
    this.enteredText = '';
  }
}
