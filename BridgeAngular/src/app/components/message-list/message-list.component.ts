import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { IChatModel } from '../../models/ichat-model';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.sass']
})

export class MessageListComponent implements OnInit {
    chats: IChatModel[];
    userId: number = 1;

    names: string[] = [];
    chatIds: number[] = [];
    messages: string[] = [];
    userIds: number[] = [];

    constructor(chatService: ChatService, userService: UserService, messageService: MessageService) {
        // get all the chats for a user
        chatService.getChatList(this.userId).subscribe((result: IChatModel[]) => {
            this.chats = result;      
            this.chats.forEach(chat=>{
                chat.users.forEach(user=>{
                    if(user != this.userId){
                        this.userIds.push(user);
                    }
                })
                this.chatIds.push(chat.chatId);
            })

            // get name of friend for each chat
            for (let i = 0; i < this.userIds.length; i++) {
                userService.getName(this.userIds[i]).subscribe((name: string) => {
                    this.names.push(name);
                });
            }

            // get most recent message for each chat
            for (let i = 0; i < this.chatIds.length; i++) {
                messageService.getMostRecentMessage(this.chatIds[i]).subscribe((message: string) => {
                    this.messages.push(message);
                });
            }
        });
    }

    ngOnInit(): void { }
}
