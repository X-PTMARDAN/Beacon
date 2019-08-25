import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {PhaseComponent} from './components/phase/phase.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children:
      [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        {path: 'dashboard', component: DashboardComponent},
        {path: 'portfolio', component: PortfolioComponent},
        {path: 'phase', component: PhaseComponent}
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
