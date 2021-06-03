import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "./service/security/token-storage.service";
import {ChatService} from "./service/chat-box/chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sprint01-fe';
  account: Account;
  role: string[];

  constructor(private router: Router,
              private tokenStorage: TokenStorageService,
              private chatService: ChatService) {
    let username = this.tokenStorage.getUser();
    this.chatService.findAccountByUserName('sonblack').subscribe( data => {
      this.account = data;
    });
  }
}
