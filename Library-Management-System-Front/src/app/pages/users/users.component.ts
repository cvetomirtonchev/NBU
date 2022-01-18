import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { Users } from 'src/app/shared/models/users';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UsersSortFilterPipe } from 'src/app/shared/pipes/users-sorting-pipe';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersSortFilterPipe]
})
export class UsersComponent implements OnInit {
  private _data: any[];
  tableData: Users[] = [];
  tempData: Users[] = [];
  active = 1;
  loading: boolean;

  enteredText = '';
  inputUpdate = new Subject<string>();

  constructor(private authService: AuthenticationService,
    private sortingTablePipe: UsersSortFilterPipe,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAll();
    this.inputUpdate.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(value => {
      this.formChange();
    });
  }
  getAll() {
    this.loading = true;
    this.authService.getAll().subscribe(res => {
      this.tableData = res;
      this.tempData = res;
      this._data = res;
      this.loading = false;
    });
  }
  changeRole(rowData: User) {
    const modalRef = this.modalService.open(EditUserModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.data = rowData;
    modalRef.componentInstance.reloadData.subscribe(x => {
      this.getAll();
    });
  }

  changeTab(tab: number) {
    this.active = tab;
    if (tab === 1) {
      this.tableData = this.tempData;
    } else if (tab === 2) {
      this.tableData = this.tempData.filter(x => x.isApproved);
    } else {
      this.tableData = this.tempData.filter(x => !x.isApproved);
    }
  }

  formChange() {
    this.tableData = this.sortingTablePipe
      .transform(this.tempData, this.enteredText);
  }
  changed($event) {
    this.inputUpdate.next($event);
  }
  clear(){
    this.tableData = this._data;
    this.enteredText = '';
  }
}
