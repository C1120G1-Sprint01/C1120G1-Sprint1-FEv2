import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {MainModule} from './module/main/main.module';
import {SecurityModule} from './module/security/security.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AdminModule} from "./module/admin/admin.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
    SecurityModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
