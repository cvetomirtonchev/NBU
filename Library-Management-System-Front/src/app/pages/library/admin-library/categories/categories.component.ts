import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/core/services/library.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  tableData: any[] = [];
  formGroup: FormGroup;
  loading: boolean;

  constructor(private libraryService: LibraryService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      CategoryName: new FormControl(null),
    });
    this.getCategories();
  }
  getCategories() {
    this.loading = true;
    this.libraryService.getCategories().subscribe(x => {
      this.tableData = x;
      this.loading = false;
    });
  }
  insertCategory() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const rawValues = this.formGroup.getRawValue();
      this.loading = true;
      this.libraryService.insertCategory(rawValues).subscribe(res => {
        if (res[0].result > 0) {
          this.getCategories();
          this.alertService.success(res[0].message);
        } else {
          this.alertService.error(res[0].message);
        }
        this.loading = false;
      });
    }

  }
  deleteCategory(id: number) {
    Swal.fire({
      title: `Supprimer`,
      text: `Avec cette action vous supprimerez la catégorie!`,
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
        const data = {
          categoryId: id
        };
        this.loading = true;
        this.libraryService.deleteCategory(data).subscribe(x => {
          if (x[0].result > 0) {
            this.getCategories();
            this.alertService.success(x.message);
          } else {
            this.alertService.error(x.message);
          }
          this.loading = false;
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

}
