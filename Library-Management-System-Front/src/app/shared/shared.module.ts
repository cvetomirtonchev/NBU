import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoaderComponent } from './components/loader/loader.component';
import { TableSortFilterPipe } from './pipes/table-sorting-pipe';
import { UsersSortFilterPipe } from './pipes/users-sorting-pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgSelectModule,
    ],
    declarations: [
        LoaderComponent,
        TableSortFilterPipe,
        UsersSortFilterPipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgSelectModule,
        LoaderComponent,
        TableSortFilterPipe,
        UsersSortFilterPipe
    ],
})
export class SharedModule { }
