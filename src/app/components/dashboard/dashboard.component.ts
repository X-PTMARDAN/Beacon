import {Component, OnDestroy, OnInit} from '@angular/core';
import * as CanvasJS from './../../../assets/js/canvasjs.min';
import {SKUService} from '../../services/sku.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {catchError, debounceTime, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as $ from 'jquery';

enum STEPS {
  'SELECT_HORIZON' = 1,
  'FILTER_SKU' = 2,
  'SELECT_CPG_AND_PLANT' = 3
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public minEndWeek: string;

  // Planning Horizon
  public startWeek: string;
  public endWeek: string;

  // Active Step Order
  public activeStepOrder: number;

  // Select Sku
  public brands = [];
  public segments = [];
  public packs = [];
  public SKUs = [];
  public selectedSKUs = [];
  public searchFormGroup: FormGroup;

  public subs: any = {
    items$: null,
    brands$: null,
    segments$: null,
    packs$: null,
  };

  constructor(
    private router: Router,
    private skuService: SKUService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.subs.brands$ = this.skuService.getBrands().subscribe((response: any) => {
      this.brands = response;
    });
    this.subs.segments$ = this.skuService.getSegments().subscribe((response: any) => {
      this.segments = response;
    });
    this.subs.packs$ = this.skuService.getPacks().subscribe((response: any) => {
      this.packs = response;

    });
    this.subs.items$ = this.skuService.getItems().subscribe((response: any) => {
      this.SKUs = response;
    });

    this.activeStepOrder = STEPS.SELECT_HORIZON;
    const currentDate = new Date();
    this.startWeek = currentDate.getFullYear() + '-W' + DashboardComponent.getCurrentWeek(currentDate);
    currentDate.setDate(currentDate.getDate() + 7);
    this.minEndWeek = currentDate.getFullYear() + '-W' + DashboardComponent.getCurrentWeek(currentDate);

    this.searchFormGroup = this.fb.group({
      search: this.fb.control('')
    });
    this.setValueChangeOfSearchControl(this.searchFormGroup.get('search') as FormControl);
  }

  ngOnDestroy(): void {
    this.subs.brands$.unsubscribe();
    this.subs.packs$.unsubscribe();
    this.subs.segments$.unsubscribe();
    this.subs.items$.unsubscribe();
  }

  private static getCurrentWeek(date: Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  public addWeeks(numOfWeeks: number) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7 * numOfWeeks);
    this.endWeek = currentDate.getFullYear() + '-W' + DashboardComponent.getCurrentWeek(currentDate);
  }

  public openCalender() {
    const elem = document.getElementById('endWeek');
    elem.focus();
  }

  public addItems(all = false) {
    if (all) {
      for (const item of this.SKUs) {
        this.selectedSKUs.push(item);
      }
      this.SKUs = [];
    } else {
      const selectedItemIndexes = $('#SKUs').val();

      for (const index of selectedItemIndexes) {
        this.selectedSKUs.push(this.SKUs[index]);
      }

      const selectedItemValues = selectedItemIndexes.map((index) => this.SKUs[index]);

      for (const value of selectedItemValues) {
        const index = this.SKUs.findIndex(item => item === value);
        if (index > -1) {
          this.SKUs.splice(index, 1);
        }
      }
    }
  }

  public removeItems(all = false) {
    if (all) {
      for (const item of this.selectedSKUs) {
        this.SKUs.push(item);
      }
      this.selectedSKUs = [];
    } else {
      const selectedItemIndexes = $('#selectedSKUs').val();

      for (const index of selectedItemIndexes) {
        this.SKUs.push(this.selectedSKUs[index]);
      }

      const selectedItemValues = selectedItemIndexes.map((index) => this.selectedSKUs[index]);

      // Todo: Remove Elements from selectItems
      for (const value of selectedItemValues) {
        const index = this.selectedSKUs.findIndex(item => item === value);
        if (index > -1) {
          this.selectedSKUs.splice(index, 1);
        }
      }
    }
  }

  public onFilterCheckboxClick($event) {
    const reqBody = this.getFiltersObject();

    this.subs.items$ = this.skuService.getItems(reqBody).subscribe((response: any) => {
      this.SKUs = response;
      this.selectedSKUs = [];
    });
  }

  private getFiltersObject() {
    const brands = [];
    const segments = [];
    const packs = [];

    for (const brand of this.brands) {
      if (brand.isChecked) {
        brands.push(brand.name);
      }
    }

    for (const segment of this.segments) {
      if (segment.isChecked) {
        segments.push(segment.name);
      }
    }

    for (const pack of this.packs) {
      if (pack.isChecked) {
        segments.push(pack.name);
      }
    }

    return {
      brand: brands.join(','),
      segment: segments.join(','),
      pack: packs.join(','),
    };
  }

  public setValueChangeOfSearchControl(searchControl: FormControl) {
    searchControl.valueChanges
      .pipe(
        debounceTime(200),
        switchMap((value: string) => {
          const reqBody = this.getFiltersObject();
          return this.skuService.getItems(Object.assign(reqBody, {search: value.trim()})).pipe(
            catchError((error) => of([]))
          );
        })
      ).subscribe((response: any) => {
      this.SKUs = response;
      this.selectedSKUs = [];
    });
  }
}

