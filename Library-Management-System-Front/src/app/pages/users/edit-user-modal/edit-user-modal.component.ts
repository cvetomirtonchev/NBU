import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Users } from 'src/app/shared/models/users';
import { UsersService } from 'src/app/core/services/users.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})

export class EditUserModalComponent implements OnInit {
  @Input() data: Users;
  @Output() reloadData = new EventEmitter();

  formGroup: FormGroup;
  notValid: boolean;

  roles = [
    { RoleName: 'Admin', UserType: 1 },
    { RoleName: 'Utilisateur', UserType: 2 },
    { RoleName: 'Bibliothécaire', UserType: 3 },
  ];

  statuses = [
    { StatusName: 'En attente', Value: 0 },
    { StatusName: 'Actif', Value: 1 },
    { StatusName: 'Bloqué', Value: 2 },
  ];

  constructor(private activeModal: NgbActiveModal,
    private userService: UsersService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    const role = this.roles.find(x => x.UserType === this.data.userType);
    const stat = this.statuses.find(x => x.Value === this.data.isApproved);

    this.formGroup = new FormGroup({
      UserId: new FormControl(this.data.id),
      IsApproved: new FormControl(stat.Value, Validators.required),
      UserType: new FormControl(this.data.userType, Validators.required),
      FacultyNumber: new FormControl(this.data.facultyNumber),
      PhoneNumber: new FormControl(this.data.phoneNumber)
    });
  }

  get f() { return this.formGroup.controls; }

  submitForm() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.notValid = false;
      const data = this.formGroup.getRawValue();
      this.userService.updateUserDetails(data).subscribe(res => {
        if (res[0].result > 0) {
          this.reloadData.emit();
          this.closeModal();
          this.alertService.success(res[0].message);
        } else {
          this.alertService.error(res[0].message);
        }
      });
    } else {
      this.notValid = true;
    }
  }
  closeModal() {
    this.activeModal.dismiss();
  }
}
