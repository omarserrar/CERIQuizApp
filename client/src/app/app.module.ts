import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './components/page/login-page/login-page.component';
import { ProfileComponent } from './components/page/profile/profile.component';
import { NotificationBannerComponent } from './components/notification-banner/notification-banner.component';
import { HomePageComponent } from './components/page/home-page/home-page.component';
import { NotificationButtonComponent } from './components/notification-button/notification-button.component';
import { AvatarComponent } from './components/user/avatar/avatar.component';
import { GamePageComponent } from './components/page/game-page/game-page.component';
import { QuizzComponent } from './components/quizz/quizz.component';
import { QuestionComponent } from './components/question/question.component';
import { ChronoComponent } from './components/chrono/chrono.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { ConnectedUserComponent } from './components/connected-user/connected-user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DefiComponent } from './components/defi/defi.component';
import { NotificationDefiComponent } from './components/notification-defi/notification-defi.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { DefiPageComponent } from './components/page/defi-page/defi-page.component';
import { TopTenComponent } from './components/top-ten/top-ten.component';
import { HistoriqueDefiComponent } from './components/historique-defi/historique-defi.component'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    ProfileComponent,
    NotificationBannerComponent,
    HomePageComponent,
    NotificationButtonComponent,
    AvatarComponent,
    GamePageComponent,
    QuizzComponent,
    QuestionComponent,
    ChronoComponent,
    HistoriqueComponent,
    ConnectedUserComponent,
    LogoutComponent,
    DefiComponent,
    NotificationDefiComponent,
    NotificationsComponent,
    DefiPageComponent,
    TopTenComponent,
    HistoriqueDefiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
