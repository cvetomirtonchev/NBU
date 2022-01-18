import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { LibraryService } from 'src/app/core/services/library.service';
import { User } from 'src/app/shared/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-requested-books',
  templateUrl: './student-requested-books.component.html',
  styleUrls: ['./student-requested-books.component.scss']
})
export class StudentRequestedBooksComponent implements OnInit {
  tableData = [];
  loading: boolean;
  @Input() user: User;

  constructor(private libraryService: LibraryService, private alertService: AlertService) { }

  ngOnInit(): void {
    const data = {
      id: this.user.id
    };
    this.loading = true;
    this.libraryService.getStudentRequestedBooks(data).subscribe(x => {
      this.loading = false;
      this.tableData = x;
    });
  }


  deleteRequestedItem(rowData) {
    Swal.fire({
      title: `Supprimer`,
      text: `Supprimer le livre demandé!`,
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
          bookId: rowData.bookId,
          studentId: this.user.id
        };
        this.libraryService.deleteRequestedItem(data).subscribe(x => {
          if (x[0].result > 0) {
            this.alertService.success(x[0].message);
            this.tableData = this.tableData.filter(obj => obj.bookId !== rowData.bookId);
          } else {
            this.alertService.error(x[0].message);
          }
          this.loading = false;
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }
}

