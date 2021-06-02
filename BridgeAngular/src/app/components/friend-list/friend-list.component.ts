import { Component, OnInit } from '@angular/core';
import { IFriendListModel } from 'src/app/models/ifriend-list-model';
import { FriendListService } from 'src/app/services/friend-list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-friend-list',
    templateUrl: './friend-list.component.html',
    styleUrls: ['./friend-list.component.sass']
})
export class FriendListComponent implements OnInit {
    friendIds: number[] = [];
    friendsData: string[] = [];
    userId: number = 1;

    constructor(friendsService: FriendListService, userService: UserService) {
        // get the userIds for all friends of the user
        friendsService.getFriendList(this.userId).subscribe((result: IFriendListModel) => {
            this.friendIds = result.friends;
            // get the names of all friends using userId
            for (let i = 0; i < this.friendIds.length; i++) {
                userService.getName(this.friendIds[i]).subscribe((name: string) => {
                    this.friendsData.push(name);
                });
            }
        });

    }
    ngOnInit(): void {
    }

}
