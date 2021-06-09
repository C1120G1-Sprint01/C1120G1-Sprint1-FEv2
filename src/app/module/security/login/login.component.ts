import {Component, ElementRef, Injectable, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecurityService} from "../../../service/security/security.service";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {Router} from "@angular/router";
import {AuthLogin} from "../../../model/AuthLogin";
import {MainHeaderComponent} from "../../main/main-layout/main-header/main-header.component";
import {AppComponent} from "../../../app.component";
import {UserSocial} from "../../../model/UserSocial";

const defaultImage:string = "https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/login%2Fuser.jpg?alt=media&token=d3149a38-f6f3-42d2-b8bf-b79d78049b89";
const accessToken:string = "EAAG5AW0TdCABAHAg66E1z9vutIS9KXZCDvd5ikGYAyCILTNOSrjVRnYaWOHYRFXiEDWZCZCDIBI723IEZAwXUnhZCXUyQObZAxXLV1HrsdKf0d8unc5yX3r20PlGNGvm8u3fTVayy2J17fg0Y0yxw0jcWscFZCMZBDnqhvIV9dy4PQZDZD";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MainHeaderComponent]
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  fieldTextType: boolean = false;
  authLogin: AuthLogin;
  role: string = '';
  username: string;
  errorMessage: string;

  auth2: any;
  user:UserSocial;
  id:any;
  fullName:string;
  token:any;

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  constructor(private formBuilder:FormBuilder,
              private securityService:SecurityService,
              private tokenStorageService:TokenStorageService,
              private router:Router,
              private headerComponent:MainHeaderComponent,
              private appComponent:AppComponent)
  { }

  ngOnInit(): void {
    this.googleSDK();
    this.fbLibrary();

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$'),
        Validators.minLength(6), Validators.maxLength(45)]],
      password: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(45)]],
      remember_me: ['']
    });

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.role = user.authorities[0].authority;
      this.username = user.username;
    }
  }

  submitForm() {
    this.authLogin = new AuthLogin(this.formUsername.value,this.formPassword.value);
    this.login(this.authLogin);
  }

  get formUsername() {
    return this.form.get('username');
  }
  get formPassword() {
    return this.form.get('password');
  }

  public login(authLogin) {
    this.securityService.login(authLogin).subscribe(
      data => {
        if (this.form.value.remember_me) {
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        }

        this.securityService.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.role = this.tokenStorageService.getUser().authorities[0].authority;
        this.form.reset();

        this.appComponent.ngOnInit().then();
        this.headerComponent.ngOnInit();
        this.router.navigateByUrl("/");

      },
      err => {
        console.log("Error at login function on LoginComponent")
        this.errorMessage = "Tên đăng nhập hoặc mật khẩu không chính xác.Vui lòng nhập lại.";
        this.securityService.isLoggedIn = false;
      }
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  prepareLoginButton() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        this.id = profile.getId();
        this.user = new UserSocial( googleUser.getAuthResponse().id_token,
                                    profile.getName(),
                                    profile.getImageUrl(),
                                    profile.getEmail()
                                  );

        this.securityService.createUserGoogle(this.user).subscribe(data => {
          console.log("Success : "+data);
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);

          this.securityService.isLoggedIn = true;
          this.username = this.tokenStorageService.getUser().username;
          this.role = this.tokenStorageService.getUser().authorities[0].authority;

          this.appComponent.ngOnInit().then();
          this.headerComponent.ngOnInit();
          this.router.navigateByUrl("/"); //it need a real path, not like this "" or "/"

        }, error => {
          console.log("get "+error.err.message+" at prepareLoginButton()");
        })
      });

  }
  googleSDK() {

    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '985003416413-jksvvf1pugd663prbv15vf3gtd7uc06s.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }

  fbLibrary() {

    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '484890752807968',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  loginFacebook() {
    window['FB'].login((response) => {
      if (response.authResponse) {

        window['FB'].api('/me', {
          fields: 'last_name, first_name, email'
        }, (userInfo) => {
          this.fullName = userInfo.first_name +" "+ userInfo.last_name;
          this.user = new UserSocial(
            accessToken,
            this.fullName,
            defaultImage,
            userInfo.email
          );
          console.log(userInfo);
          this.securityService.createUserFacebook(this.user).subscribe(data => {
            console.log("Success : "+data);
            this.tokenStorageService.saveTokenLocal(data.accessToken);
            this.tokenStorageService.saveUserLocal(data);

            this.securityService.isLoggedIn = true;
            this.username = this.tokenStorageService.getUser().username;
            this.role = this.tokenStorageService.getUser().authorities[0].authority;

            this.appComponent.ngOnInit().then();
            this.headerComponent.ngOnInit();
            this.router.navigateByUrl("/");

          }, error => {
            console.log(error.err.message);
          })
        });
      } else {
        console.log('User login failed');
      }
    }, {scope: 'email'});
  }
}
