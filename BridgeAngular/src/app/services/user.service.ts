import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    hostUrl: string = 'http://localhost:8080/';
    //hostUrl: string = 'https://bridgechat.azurewebsites.net/';
    constructor(private http: HttpClient) { }

    // get the name of a specific userId
    getName(userId: number) {
        return this.http.get<string>(this.hostUrl + `app/users/${userId}/name`);
    }

    getLanguage(userId: number) {
        return this.http.get<string>(this.hostUrl + `app/users/${userId}/language`);
    }
}
