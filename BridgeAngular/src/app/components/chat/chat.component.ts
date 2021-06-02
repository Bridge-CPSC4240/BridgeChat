import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IChatModel } from 'src/app/models/ichat-model';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { IMessageModel } from '../../models/imessage-model';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
    messages: IMessageModel[] = [];
    chatId: number;
    userId: number = 1;
    friendId: number;
    message: string;
    friendName: string;
    dataLoaded: boolean = false;
    languageTo: string;
    languageFrom: string;

    constructor(
        private route: ActivatedRoute,
        private messageService: MessageService,
        private chatService: ChatService,
        private userService: UserService
    ) {

    }
    ngOnInit(): void {
        this.userService.getLanguage(this.userId).subscribe((language: string) => {
            this.languageFrom = language;
        });
        this.route.paramMap.subscribe(params => {
            this.chatId = Number(params.get('chatId'));

            // get all messages in a chat
            this.messageService
                .getMessagesfromChat(this.chatId)
                .subscribe((result: IMessageModel[]) => {
                    this.messages = result;
                    this.friendId = this.messages[0].friendId != this.userId ? this.messages[0].friendId : this.messages[0].userId;
                    this.userService
                    .getName(this.friendId)
                    .subscribe((name: string) => {
                        this.friendName = name;
                        this.userService.getLanguage(this.friendId).subscribe((language: string) => {
                            this.languageTo = language;
                        })
                    });
                });
    
            this.dataLoaded = true;
        });
    }
    public sendMessage(): void {
        var input = <HTMLInputElement> document.getElementById("input-message");
        if (!input) {
            return;
        }
        let message: IMessageModel = {
            delivered: true,
            originalText: input.value,
            translatedText: "",
            userId: this.userId,
            friendId: this.friendId,
            dateCreated: new Date(),
            languageTo: this.languageTo,
            languageFrom: this.languageFrom,
            messageId: this.messages.length + 1,
            chatId: this.chatId,
            isSender: true
        };
        this.messageService.sendMessage(message).subscribe(() => {
            input.value = null;
        })
    }
}
