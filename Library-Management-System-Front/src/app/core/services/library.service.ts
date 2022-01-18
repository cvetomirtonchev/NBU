import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { MainResultModel } from 'src/app/shared/models/mainResult';
@Injectable({ providedIn: 'root' })

export class LibraryService {
    private libraryController = 'library';
    private studentLibraryController = 'studentLibrary';
    constructor(private http: HttpClient) { }

    getAllBooks(): any {
        const url = `${environment.apiUrl}/${this.libraryController}/getAllBooks`;
        return this.http.get(url);
    }
    getBookItems(data): any {
        const url = `${environment.apiUrl}/${this.libraryController}/getBookItems`;
        return this.http.post(url, data);
    }
    getBorrowedBooks(): any {
        const url = `${environment.apiUrl}/${this.libraryController}/getBorrowedBooks`;
        return this.http.get(url);
    }

    getCategories(): any {
        const url = `${environment.apiUrl}/${this.libraryController}/getCategories`;
        return this.http.get(url);
    }
    getReturnedBooks(): any {
        const url = `${environment.apiUrl}/${this.libraryController}/getReturnedBooks`;
        return this.http.get(url);
    }
    getAvailableBooks(data): any {
        const url = `${environment.apiUrl}/${this.libraryController}/getAvailableBooks`;
        return this.http.post(url, data);
    }
    getAvailableBooksForStudent(): any {
        const url = `${environment.apiUrl}/${this.studentLibraryController}/getAvailableBooksForStudent`;
        return this.http.get(url);
    }
    getRequestedBooks(): any {
        const url = `${environment.apiUrl}/${this.libraryController}/getRequestedBooks`;
        return this.http.get(url);
    }
    getStudentTakenBooks(data): any {
        const url = `${environment.apiUrl}/${this.studentLibraryController}/getStudentTakenBooks`;
        return this.http.post(url, data);
    }
    getStudentRequestedBooks(data): any {
        const url = `${environment.apiUrl}/${this.studentLibraryController}/getStudentRequestedBooks`;
        return this.http.post(url, data);
    }
    getStudentReturnedBooks(data): any {
        const url = `${environment.apiUrl}/${this.studentLibraryController}/getStudentReturnedBooks`;
        return this.http.post(url, data);
    }
    insertBorrower(data) {
        const url = `${environment.apiUrl}/${this.libraryController}/insertBorrower`;
        return this.http.post<MainResultModel>(url, data);
    }

    updateReturnedDate(data): any {
        const url = `${environment.apiUrl}/${this.libraryController}/updateReturnDate`;
        return this.http.post(url, data);
    }

    insertCategory(data): any {
        const url = `${environment.apiUrl}/${this.libraryController}/insertCategory`;
        return this.http.post(url, data);
    }

    deleteCategory(data) {
        const url = `${environment.apiUrl}/${this.libraryController}/deleteCategory`;
        return this.http.post<MainResultModel>(url, data);
    }

    insertBook(data) {
        const url = `${environment.apiUrl}/${this.libraryController}/insertBook`;
        return this.http.post<MainResultModel>(url, data);
    }
    insertBookItem(data) {
        const url = `${environment.apiUrl}/${this.libraryController}/insertBookItem`;
        return this.http.post<MainResultModel>(url, data);
    }
    deleteBook(data): any {
        const url = `${environment.apiUrl}/${this.libraryController}/deleteBook`;
        return this.http.post(url, data);
    }

    deleteBookItem(data) {
        const url = `${environment.apiUrl}/${this.libraryController}/deleteBookItem`;
        return this.http.post<MainResultModel>(url, data);
    }

    deleteAllBookItems(data): any {
        const url = `${environment.apiUrl}/${this.libraryController}/deleteAllBookItems`;
        return this.http.post<MainResultModel>(url, data);
    }

    reserveBook(data): any {
        const url = `${environment.apiUrl}/${this.studentLibraryController}/reserveBook`;
        return this.http.post(url, data);
    }
    updateBorrower(data): any {
        const url = `${environment.apiUrl}/${this.libraryController}/updateBorrower`;
        return this.http.post(url, data);
    }

    deleteArchiveEntry(data): any {
        const url = `${environment.apiUrl}/${this.libraryController}/deleteArchiveEntry`;
        return this.http.post(url, data);
    }

    deleteRequestedItem(data): any {
        const url = `${environment.apiUrl}/${this.libraryController}/deleteRequestedItem`;
        return this.http.post(url, data);
    }
}
