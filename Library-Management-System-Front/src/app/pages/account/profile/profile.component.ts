import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/user';
import { Users } from 'src/app/shared/models/users';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  userInfo: Users;
  user: User;
  roles = [
    { RoleName: 'Admin', UserType: 1 },
    { RoleName: 'Utilisateur', UserType: 2 },
    { RoleName: 'Bibliothécaire', UserType: 3 },
  ];

  constructor(private userService: UsersService,
    private modalService: NgbModal,
    private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(x => this.user = x);
    if (this.user) {
      this.getUserData();
    }
  }

  getUserData() {
    this.loading = true;
    this.userService.getById(this.user.id).subscribe(x => {
      this.userInfo = x[0];
      this.userInfo.id = this.user.id;
      this.loading = false;
    });
  }

  openEditModal() {
    const modalRef = this.modalService.open(EditProfileModalComponent, {
      size: 'md',
    });
    modalRef.componentInstance.userInfo = this.userInfo;
    modalRef.componentInstance.reloadData.subscribe(x => {
      this.getUserData();
    });
  }
}
