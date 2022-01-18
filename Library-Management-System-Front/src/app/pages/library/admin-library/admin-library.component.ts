import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { LibraryService } from 'src/app/core/services/library.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-admin-library',
  templateUrl: './admin-library.component.html',
  styleUrls: ['./admin-library.component.scss']
})
export class AdminLibraryComponent implements OnInit {
  @Input() active: number;
  @Input() user: User;
  requestedBooks: any[] = [];
  emitNotif = new EventEmitter();

  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.getRequestedBooks()

  }

  getRequestedBooks() {
    this.libraryService.getRequestedBooks().subscribe(res => {
      this.requestedBooks = res;
    });
  }

  changeTab(tab: number) {
    this.active = tab;
  }
}
