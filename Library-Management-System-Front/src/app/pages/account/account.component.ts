import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authService.userValue && this.router.url !== '/account/profile') {
      this.router.navigate(['/']);
    }
  }
}
