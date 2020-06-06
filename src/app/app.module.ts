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

import {SearchPipe} from './pipe/search.pipe';

import {PlantPipe} from './pipe/plant.pipe';

import {CPGPipe} from './pipe/cpg.pipe';

import {BrandPipe} from './pipe/brand.pipe';

import {LoadFilter} from './pipe/loadfilter.pipe';

import { LoginComponent } from './components/login/login.component';

import { SettingComponent} from './components/setting/setting.component';
import {PropercasePipe} from './pipe/propercase.pipe';
import { ComingsoonComponent } from './components/comingsoon/comingsoon.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreatePlanComponent,
    PortfolioComponent,
    PhaseComponent,
    FilterPipe,
    LoadFilter,
    BrandPipe,
    SearchPipe,
    PlantPipe,
    CPGPipe,
    PropercasePipe,
    WizardComponent,
    SidebarComponent,
    FotterComponent,
    HomeComponent,
    LoginComponent,
    SettingComponent,
    ComingsoonComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}