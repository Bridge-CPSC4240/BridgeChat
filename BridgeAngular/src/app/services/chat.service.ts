import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChatModel } from '../models/ichat-model';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    hostUrl: string = 'http://localhost:8080/';
    //hostUrl: string = 'https://bridgechat.azurewebsites.net/';

    constructor(private http: HttpClient) { }

    // get a single chat using chatId
    getChat(chatId: number) {
        return this.http.get<IChatModel>(this.hostUrl + `/app/chats/${chatId}`);
    }

    // get a list of chats using userId
    getChatList(userId: number){
        return this.http.get<IChatModel[]>(this.hostUrl + `/app/users/${userId}/chats`)
    }
}
