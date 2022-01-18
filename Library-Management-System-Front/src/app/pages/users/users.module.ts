import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersRoutingModule } from './users-routing.module';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    NgSelectModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [EditUserModalComponent]
})
export class UsersModule { }
