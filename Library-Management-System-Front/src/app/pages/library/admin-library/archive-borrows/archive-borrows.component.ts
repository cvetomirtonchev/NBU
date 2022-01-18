import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { LibraryService } from 'src/app/core/services/library.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archive-borrows',
  templateUrl: './archive-borrows.component.html',
  styleUrls: ['./archive-borrows.component.scss']
})
export class ArchiveBorrowsComponent implements OnInit {
  tableData: any = [];
  loading: boolean;
  constructor(private libraryService: LibraryService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.loading = true;
    this.libraryService.getReturnedBooks().subscribe(x => {
      this.tableData = x;
      this.loading = false;
    });
  }

  deleteRow(rowData) {
    Swal.fire({
      title: `Supprimer`,
      text: `Avec cette action vous supprimerez l'entrée!`,
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
          bookId: rowData.rowId
        };
        this.libraryService.deleteArchiveEntry(data).subscribe(x => {
          if (x[0].result > 0) {
            this.alertService.success(x[0].message);
            this.getTableData();
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
