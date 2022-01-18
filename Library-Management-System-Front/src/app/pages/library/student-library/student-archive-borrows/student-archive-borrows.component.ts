import { Component, Input, OnInit } from '@angular/core';
import { LibraryService } from '../../../../core/services/library.service';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-student-archive-borrows',
  templateUrl: './student-archive-borrows.component.html',
  styleUrls: ['./student-archive-borrows.component.scss']
})
export class StudentArchiveBorrowsComponent implements OnInit {
  tableData = [];
  loading: boolean;
  @Input() user: User;

  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.loading = true;
    const data = { id: this.user.id };
    this.libraryService.getStudentReturnedBooks(data).subscribe(x => {
      this.tableData = x;
      this.loading = false;
    });
  }

  deleteRow(row) {

  }
}
