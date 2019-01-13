import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { UserServiceService } from './user-service.service';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogoutComponent } from './logout/logout.component';
import { StartComponent } from './start/start.component';

const appRoutes:Routes=
[
{path:'start',component:StartComponent},
{path:'home',component:HomeComponent},
{path:'user',component:UsersComponent},
{path:'login',component:LoginComponent},
{path:'logout',component:LogoutComponent},
{path:'registration',component:RegistrationComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    LogoutComponent,
    StartComponent
  ],
  imports: [
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }