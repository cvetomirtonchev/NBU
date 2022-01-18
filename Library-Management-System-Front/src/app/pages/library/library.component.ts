import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/core/services/library.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  active = 1;
  user: User;
  borrowedTableData: any[] = [];

  constructor( private authService: AuthenticationService,
    private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(x => this.user = x);
  }


}
