import {Component, OnInit} from '@angular/core';
import * as CanvasJS from './../../../assets/js/canvasjs.min';

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

  constructor() {
  }

  ngOnInit() {
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
}

