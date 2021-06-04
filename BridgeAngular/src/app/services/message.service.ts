import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessageModel } from '../models/imessage-model';
@Injectable({
    providedIn: 'root',
})
export class MessageService {
    hostUrl: string = 'http://localhost:8080/';
    //hostUrl: string = 'https://bridgechat.azurewebsites.net/';

    constructor(private http: HttpClient) { }

    // get all messages for a chatId
    getMessagesfromChat(chatId: number) {
        return this.http.get<IMessageModel[]>(this.hostUrl + `app/chats/${chatId}/messages`);
    }

    // get the single most recent message for a chatId
    getMostRecentMessage(chatId: number) {
        return this.http.get<string>(this.hostUrl + `app/chats/${chatId}/lastMessage`);
    }

    sendMessage(message) {
        return this.http.post(this.hostUrl + 'app/messages/' + message.chatId, message);
    }
}
