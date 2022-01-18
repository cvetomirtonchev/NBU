import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/core/services/alert.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Users } from 'src/app/shared/models/users';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {

  @Input() userInfo: Users;
  @Output() reloadData = new EventEmitter();

  formGroup: FormGroup;
  notValid: boolean;

  constructor(private activeModal: NgbActiveModal,
    private userService: UsersService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      FirstName: new FormControl(this.userInfo.firstName, Validators.required),
      LastName: new FormControl(this.userInfo.lastName, Validators.required),
      UserId: new FormControl(this.userInfo.id),
      Email: new FormControl(this.userInfo.email, Validators.required),
      FacultyNumber: new FormControl(this.userInfo.facultyNumber),
      PhoneNumber: new FormControl(this.userInfo.phoneNumber)
    });
  }
  submitForm() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const data = this.formGroup.getRawValue();
      this.userService.updateProfileDetails(data).subscribe(res => {
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
