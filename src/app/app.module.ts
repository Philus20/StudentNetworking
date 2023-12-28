import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CenterComponent } from './center/center.component';
import { RightComponent } from './right/right.component';
import { TopProfileComponent } from './top-profile/top-profile.component';
import { UserInterestComponent } from './user-interest/user-interest.component';
import { SignalrService } from './services/signalr.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CouroserComponent } from './couroser/couroser.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TabsComponent } from './tabs/tabs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ToastsComponent } from './toasts/toasts.component';

import { AuthService } from './services/auth.service';
import { MainPageComponent } from './main-page/main-page.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    NavbarComponent,
    HomeComponent,
    CenterComponent,
    RightComponent,
    TopProfileComponent,
    UserInterestComponent,
    CouroserComponent,
    RegisterComponent,
    LoginComponent,
    TabsComponent,
    ToastsComponent,
    MainPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgbCarouselModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })

  ],
  providers: [SignalrService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
