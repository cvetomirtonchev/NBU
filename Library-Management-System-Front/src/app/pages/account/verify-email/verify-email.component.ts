import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  public user: User;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(x => this.user = x);
  }
  sendLink() {
    const email = {
      userName: this.user.userName
    };
    this.authService.sendLink(email).subscribe(x => {})
  }
}
