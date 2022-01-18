import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { LibraryService } from 'src/app/core/services/library.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-student-preview-books',
  templateUrl: './student-preview-books.component.html',
  styleUrls: ['./student-preview-books.component.scss']
})
export class StudentPreviewBooksComponent implements OnInit {
  @Input() user: User;
  tableData = [];
  requestedBooks: number;
  loading: boolean;
  constructor(private libraryService: LibraryService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getRequestedBooks();
    this.getBooks();
  }
  getRequestedBooks() {
    const data = {
      id: this.user.id
    };
    this.loading = true;
    this.libraryService.getStudentRequestedBooks(data).subscribe(x => {
      this.loading = false;
      this.requestedBooks = x.length;
    });
  }
  getBooks() {
    this.loading = true;
    this.libraryService.getAvailableBooksForStudent().subscribe(x => {
      this.tableData = x;
      this.loading = false;
    });
  }

  reserveBook(rowData) {
    const data = {
      BorrowerId: this.user.id,
      BookId: rowData.id,
      IsRequested: 1
    };
    this.loading = true;
    this.libraryService.insertBorrower(data).subscribe(x => {
      this.loading = false;
      this.getRequestedBooks();
      this.getBooks();
      if (x[0].result > 0) {
        this.alertService.success(x[0].message);
        this.tableData = this.tableData.filter(obj => obj.id !== rowData.id);
      } else {
        this.alertService.error(x[0].message);
      }
      this.loading = false;
    });
  }
}
