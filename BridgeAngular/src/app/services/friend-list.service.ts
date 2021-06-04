import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFriendListModel } from '../models/ifriend-list-model';

@Injectable({
    providedIn: 'root'
})
export class FriendListService {
    hostUrl: string = 'http://localhost:8080/';
    // hostUrl: string = 'https://bridgechat.azurewebsites.net/';

    constructor(private http: HttpClient) { }

    // retrieve a list of all friendIds using userId
    getFriendList(userId: number) {
        return this.http.get<IFriendListModel>(this.hostUrl + `app/users/${userId}/friends`);
    }

}
