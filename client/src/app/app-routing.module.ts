import { DefiPageComponent } from './components/page/defi-page/defi-page.component';
import { NotConnectedGuard } from './guards/not-connected.guard';
import { HomePageComponent } from './components/page/home-page/home-page.component';
import { ConnexionGuard } from './guards/connexion.guard';
import { LoginPageComponent } from './components/page/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/page/profile/profile.component';
import { GamePageComponent } from './components/page/game-page/game-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [NotConnectedGuard]},
  { path: '', component: HomePageComponent, canActivate: [ConnexionGuard] },
  { path: 'defi', component: DefiPageComponent, canActivate: [ConnexionGuard] },
  { path: 'home', component: HomePageComponent, canActivate: [ConnexionGuard] },
  { path: 'user', component: ProfileComponent, canActivate: [ConnexionGuard] },
  { path: 'user/:userId', component: ProfileComponent, canActivate: [ConnexionGuard] },
  { path: 'game', component: GamePageComponent, canActivate: [ConnexionGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
