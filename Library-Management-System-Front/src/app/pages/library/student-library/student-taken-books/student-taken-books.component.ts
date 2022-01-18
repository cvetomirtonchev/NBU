import { Component, Input, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/core/services/library.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-student-taken-books',
  templateUrl: './student-taken-books.component.html',
  styleUrls: ['./student-taken-books.component.scss']
})
export class StudentTakenBooksComponent implements OnInit {
  tableData = [];
  loading: boolean;
  @Input() user: User;

  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    const data = {
      id: this.user.id
    };
    this.loading = true;
    this.libraryService.getStudentTakenBooks(data).subscribe(x => {
      this.loading = false;
      this.tableData = x;
    });
  }

}
