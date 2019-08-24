import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {PhaseComponent} from './components/phase/phase.component';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CreatePlanComponent } from './components/create-plan/create-plan.component';
import {FilterPipe} from './pipe/filter.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { WizardComponent } from './wizard/wizard.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreatePlanComponent,
	PortfolioComponent,
	PhaseComponent,
    FilterPipe,
    WizardComponent
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
