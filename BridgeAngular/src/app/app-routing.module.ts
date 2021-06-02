import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

const routes: Routes = [
    { path: '', redirectTo: '/chat/1', pathMatch: "full" },
    { path: 'friends', component: FriendListComponent },
    { path: 'chat/:chatId', component: ChatWindowComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
