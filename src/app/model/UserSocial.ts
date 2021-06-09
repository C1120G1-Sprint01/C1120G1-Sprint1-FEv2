export class UserSocial {
  token:string;
  name:string;
  avatarUrl:string;
  email:string;


  constructor(token: string, name: string, avatarUrl: string, email: string) {
    this.token = token;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.email = email;
  }
}
