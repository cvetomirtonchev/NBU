import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user';
import { Users } from 'src/app/shared/models/users';
import { environment } from 'src/environments/environment';
import { MainResultModel } from 'src/app/shared/models/mainResult';

@Injectable({ providedIn: 'root' })

export class UsersService {
    private userController = 'users';

    constructor(private http: HttpClient) { }

    updateUserDetails(data) {
        return this.http.post<MainResultModel>(`${environment.apiUrl}/${this.userController}/updateUserDetails`, data);
    }

    getStudents(): any {
        const url = `${environment.apiUrl}/${this.userController}/getStudents`;
        return this.http.get(url);
    }


    register(user: User): any {
        return this.http.post(`${environment.apiUrl}/authenticate/register`, user);
    }

    getAll() {
        return this.http.get<Users[]>(`${environment.apiUrl}/${this.userController}/getAll`);
    }

    getById(userId: string) {
        return this.http.get<Users>(`${environment.apiUrl}/${this.userController}/getUserDetails/${userId}`);
    }

    updateProfileDetails(data) {
        return this.http.post<MainResultModel>(`${environment.apiUrl}/${this.userController}/updateProfileDetails`, data);
    }
}
