import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey("CompanyName=YStrategists B.V.,LicensedGroup=YGroup - DCD GRID,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=2,AssetReference=AG-008806,ExpiryDate=7_July_2021_[v2]_MTYyNTYxMjQwMDAwMA==1b8d7ca822a08e10928e771bdaa0d469");

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
