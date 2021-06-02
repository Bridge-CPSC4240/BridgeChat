import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        MessageListComponent,
        FriendListComponent,
        ChatWindowComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatListModule,
        MatCardModule,
        MatInputModule,
        MatGridListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
