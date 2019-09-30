import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {PhaseComponent} from './components/phase/phase.component';

import {SettingComponent} from './components/setting/setting.component'
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {GuestGuardService} from './services/guest-guard.service';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuardService],
    children:
      [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'portfolio', component: PortfolioComponent},
        {path: 'phase', component: PhaseComponent},
        {path: 'setting', component: SettingComponent}

      ]
  },
  {path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [GuestGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
