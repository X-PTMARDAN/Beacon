import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {PhaseComponent} from './components/phase/phase.component';
import {HomeComponent} from './components/home/home.component';
import {WizardComponent} from './components/wizard/wizard.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {FotterComponent} from './components/fotter/fotter.component';
import {CreatePlanComponent} from './components/create-plan/create-plan.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FilterPipe} from './pipe/filter.pipe';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { LoginComponent } from './components/login/login.component';
import {PropercasePipe} from './pipe/propercase.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreatePlanComponent,
    PortfolioComponent,
    PhaseComponent,
    FilterPipe,
    PropercasePipe,
    WizardComponent,
    SidebarComponent,
    FotterComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
