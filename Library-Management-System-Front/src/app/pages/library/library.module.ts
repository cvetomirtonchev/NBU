import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { AllBooksComponent } from './admin-library/all-books/all-books.component';
import { BorrowedBooksComponent } from './admin-library/borrowed-books/borrowed-books.component';
import { AddBookModalComponent } from './admin-library/all-books/add-book-modal/add-book-modal.component';
import { CategoriesComponent } from './admin-library/categories/categories.component';
import { BorrowBookComponent } from './admin-library/borrow-book/borrow-book.component';
import { ReturnModalComponent } from './admin-library/borrowed-books/return-modal/return-modal.component';
import { ArchiveBorrowsComponent } from './admin-library/archive-borrows/archive-borrows.component';
import { AdminLibraryComponent } from './admin-library/admin-library.component';
import { StudentLibraryComponent } from './student-library/student-library.component';
import { StudentPreviewBooksComponent } from './student-library/student-preview-books/student-preview-books.component';
import { TableSortFilterPipe } from 'src/app/shared/pipes/table-sorting-pipe';
import { PreviewCopiesModalComponent } from './admin-library/all-books/preview-copies-modal/preview-copies-modal.component';
import { RequestedBooksComponent } from './admin-library/requested-books/requested-books.component';
import { ReturnDateModalComponent } from './admin-library/requested-books/return-date-modal/return-date-modal.component';
import { StudentTakenBooksComponent } from './student-library/student-taken-books/student-taken-books.component';
import { StudentRequestedBooksComponent } from './student-library/student-requested-books/student-requested-books.component';
import { StudentArchiveBorrowsComponent } from './student-library/student-archive-borrows/student-archive-borrows.component';
import { SharedModule } from '../../shared/shared.module';
import { LibraryRoutingModule } from './library-routing.module';


@NgModule({
    imports: [
        LibraryRoutingModule,
        SharedModule,
    ],
    declarations: [
        LibraryComponent,
        AllBooksComponent,
        BorrowedBooksComponent,
        AddBookModalComponent,
        CategoriesComponent,
        BorrowBookComponent,
        ReturnModalComponent,
        ArchiveBorrowsComponent,
        AdminLibraryComponent,
        StudentLibraryComponent,
        StudentPreviewBooksComponent,
        PreviewCopiesModalComponent,
        RequestedBooksComponent,
        ReturnDateModalComponent,
        StudentTakenBooksComponent,
        StudentRequestedBooksComponent,
        StudentArchiveBorrowsComponent,
    ]
})
export class LibraryModule { }
