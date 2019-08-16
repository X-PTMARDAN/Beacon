import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as CanvasJS from './../../../assets/js/canvasjs.min';
import {SKUService} from '../../services/sku.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('createPlanModalCancel') createPlanModalCancel: ElementRef;

  public skus: any = [];

  constructor(
    private router: Router,
    private skuService: SKUService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.skuService.getItems().subscribe((res: any) => {
      this.skus = res;
    });
  }

  ngOnDestroy(): void {

  }

  public createPlan(data: any) {
    this.createPlanModalCancel.nativeElement.click();
  }
}

