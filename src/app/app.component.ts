import {Component, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "./service/security/token-storage.service";
import {ChatService} from "./service/chat-box/chat.service";
import {Account} from "./model/Account";
@Injectable({
  providedIn:'root'
  })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sprint01-fe';
  account: Account;
  role: string;

  constructor(private router: Router,
              private tokenStorage: TokenStorageService,
              private chatService: ChatService) {
  }

  async ngOnInit() {
    let username = this.tokenStorage.getUser();
    await new Promise((resolve) => {
      if (username != null) {
        this.chatService.findAccountByUserName(username.username).subscribe(data => {
          this.account = data;
          this.chatService.findAccountRoleByAccount(this.account).subscribe(data => {
            this.role = data.roleName;
          })
        });
        this.role = this.tokenStorage.getUser().authorities[0].authority;
        console.log("ROLE for chat : "+this.role)
      } else {
        this.role = 'ROLE_ADMIN';
      }
      return resolve(1);
    })
  }
}
