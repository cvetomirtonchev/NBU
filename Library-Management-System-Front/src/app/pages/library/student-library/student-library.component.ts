import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-student-library',
  templateUrl: './student-library.component.html',
  styleUrls: ['./student-library.component.scss']
})
export class StudentLibraryComponent implements OnInit {
  @Input() active: number;
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }
  changeTab(tab: number) {
    this.active = tab;
    if (tab === 1) {
      //this.tableData = this.tempData.filter(x => x.isApproved);
    } else {
      // this.tableData = this.tempData;
    }
  }
}
