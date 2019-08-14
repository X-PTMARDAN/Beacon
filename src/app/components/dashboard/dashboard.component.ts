import {Component, OnInit} from '@angular/core';
import * as CanvasJS from './../../../assets/js/canvasjs.min';
import {SKUService} from '../../services/sku.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

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
export class DashboardComponent implements OnInit {
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

  constructor(
    private router: Router,
    private skuService: SKUService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.activeStepOrder = STEPS.SELECT_HORIZON;
    const currentDate = new Date();
    this.startWeek = currentDate.getFullYear() + '-W' + DashboardComponent.getCurrentWeek(currentDate);
    currentDate.setDate(currentDate.getDate() + 7);
    this.minEndWeek = currentDate.getFullYear() + '-W' + DashboardComponent.getCurrentWeek(currentDate);
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
}

