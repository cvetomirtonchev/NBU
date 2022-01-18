import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { LibraryService } from 'src/app/core/services/library.service';
import { NgbDateAdapter, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReturnModalComponent } from './return-modal/return-modal.component';
// import { SortEvent, NgbdSortableHeader, compare } from 'src/app/shared/directives/sortable-table';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.scss']
})
export class BorrowedBooksComponent implements OnInit {
  borrowedTableData: any[] = [];
  loading: boolean;

  constructor(private libraryService: LibraryService,
    private modalService: NgbModal,
    private dateAdapter: NgbDateAdapter<string>,
    private ngbCalendar: NgbCalendar) { }

  ngOnInit(): void {
    this.getTableData();
  }
  getTableData(){
    this.loading = true;
    this.libraryService.getBorrowedBooks().subscribe(x => {
      this.borrowedTableData = x;
      this.loading = false;
    });
  }
   checkReturned(data) {
    const modalRef = this.modalService.open(ReturnModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.borrowerId = data.id;
    modalRef.componentInstance.bookId = data.bookId;
    modalRef.componentInstance.reloadData.subscribe(x => {
      this.getTableData();
    });
  }

}
