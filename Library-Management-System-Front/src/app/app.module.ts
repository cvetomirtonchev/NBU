import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './core/helpers/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/helpers/interceptors/error.interceptor';
import { AlertComponent } from './shared/components/alert/alert.component';
import { UsersComponent } from './pages/users/users.component';
import { LibraryComponent } from './pages/library/library.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AllBooksComponent } from './pages/library/admin-library/all-books/all-books.component';
import { BorrowedBooksComponent } from './pages/library/admin-library/borrowed-books/borrowed-books.component';
import { AddBookModalComponent } from './pages/library/admin-library/all-books/add-book-modal/add-book-modal.component';
import { CategoriesComponent } from './pages/library/admin-library/categories/categories.component';
import { BorrowBookComponent } from './pages/library/admin-library/borrow-book/borrow-book.component';
import { ReturnModalComponent } from './pages/library/admin-library/borrowed-books/return-modal/return-modal.component';
import { ArchiveBorrowsComponent } from './pages/library/admin-library/archive-borrows/archive-borrows.component';
import { AdminLibraryComponent } from './pages/library/admin-library/admin-library.component';
import { StudentLibraryComponent } from './pages/library/student-library/student-library.component';
import { StudentPreviewBooksComponent } from './pages/library/student-library/student-preview-books/student-preview-books.component';
import { TableSortFilterPipe } from './shared/pipes/table-sorting-pipe';
import { PreviewCopiesModalComponent } from './pages/library/admin-library/all-books/preview-copies-modal/preview-copies-modal.component';
import { RequestedBooksComponent } from './pages/library/admin-library/requested-books/requested-books.component';
import { ReturnDateModalComponent } from './pages/library/admin-library/requested-books/return-date-modal/return-date-modal.component';
import { StudentTakenBooksComponent } from './pages/library/student-library/student-taken-books/student-taken-books.component';
import { StudentRequestedBooksComponent } from './pages/library/student-library/student-requested-books/student-requested-books.component';
import { StudentArchiveBorrowsComponent } from './pages/library/student-library/student-archive-borrows/student-archive-borrows.component'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    UsersComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
