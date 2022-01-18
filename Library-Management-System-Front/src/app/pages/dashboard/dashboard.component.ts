import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor( private authService: AuthenticationService) {
      this.user = this.authService.userValue;
  }

  ngOnInit(): void {
  }

}
