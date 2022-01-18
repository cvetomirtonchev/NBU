import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDateAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryService } from 'src/app/core/services/library.service';
import { User } from 'src/app/shared/models/user';
import { ReturnDateModalComponent } from './return-date-modal/return-date-modal.component';

@Component({
  selector: 'app-requested-books',
  templateUrl: './requested-books.component.html',
  styleUrls: ['./requested-books.component.scss']
})
export class RequestedBooksComponent implements OnInit {
  @Input() tableData: any[] = [];
  @Input() user: User;
  @Output() emitNotif = new EventEmitter();

  constructor(private libraryService: LibraryService,
    private modalService: NgbModal,
    private dateAdapter: NgbDateAdapter<string>,
    private ngbCalendar: NgbCalendar) { }

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.libraryService.getRequestedBooks().subscribe(res => {
      this.tableData = res;
    });
  }

  approveRequest(rowData) {
    const modalRef = this.modalService.open(ReturnDateModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.rowData = rowData;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.reloadData.subscribe(res => {
      this.getTableData();
      this.emitNotif.emit(1);
    });
  }

}
