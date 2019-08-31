import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {SKUService} from '../../services/sku.service';
import {Observable} from 'rxjs';

enum STEPS {
  'SELECT_OPTION' = 1,
}

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit, OnDestroy {
  @Input('events') events: Observable<void>;
  @Output('submit') outputDateEmitter = new EventEmitter();
  public minEndWeek: string;
  public createPlanLoader = false;

  public showPanels = {
    showPlanDemand: false,
    showRevisitPlan: false,
    showRevisitView: false,
    showPortfolioMgmt: false
  };
  public dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  // Planning Horizon
  public startWeek: string;
  public endWeek: string;

  // Select CPG and Plant
  public plants = [];
  public customerPlanningGroups = [];
  public selectedPlants = [];
  public selectedCustomerPlanningGroups = [];

  // Active Step Order
  public activeStepOrder: number;

  // Select Sku
  public brands = [];
  public segments = [];
  public packs = [];
  public SKUs = [];
  public selectedSKUs = [];
  public searchText = '';
  public selectedSearchText = '';

  public subs: any = {
    items$: null,
    brands$: null,
    segments$: null,
    packs$: null,
    customerPlanningGroup$: null,
    plants$: null,
  };

  public toggleClass: any = {
    isBrandExpanded: false,
    isSegmentExpanded: false,
    isPackExpanded: false,
  };

  public wizardList = [
    {
      text: 'Select Option'
    }
  ];

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
    this.subs.items$ = this.skuService.getSkUList({
      filterBrands: []
    }).subscribe((response: any) => {
      this.SKUs = response;
    });

    this.subs.plants$ = this.skuService.getPlants().subscribe((response: any) => {
      this.plants = response;
    });

    this.subs.customerPlanningGroup$ = this.skuService.getCustomerPlanningGroup().subscribe((response: any) => {
      this.customerPlanningGroups = response;
    });

    // Active Page
    this.activeStepOrder = STEPS.SELECT_OPTION;

    // Select Horizon init
    const currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() + (1 + 7 - currentDate.getDay()) % 7);
    this.startWeek = currentDate.getFullYear() + '-W' + (CreatePlanComponent.getCurrentWeek(currentDate));


    currentDate.setDate(currentDate.getDate());
    this.minEndWeek = currentDate.getFullYear() + '-W' + CreatePlanComponent.getCurrentWeek(currentDate);

    // Reset Modal Event
    this.events.subscribe((data: any) => {
      if (data.page === null && data.reset) {
        this.resetState();
        return;
      }

      this.resetState();

      if (data.page === 'create-plan') {
        this.showPlanDemand();
      } else if (data.page === 'revisit-plan') {
        this.showRevisitPlan();
      } else if (data.page === 'revisit-view') {
        this.showRevisitView();
      }
    });
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

  private static transformWeek(weekString: string) {
    const data = weekString.split('-');
    const year = data[0];
    const week = data[1].substr(1);
    return parseInt(year + week, 10);
  }

  private resetState() {
    this.activeStepOrder = STEPS.SELECT_OPTION;
    this.wizardList = [
      {
        text: 'Select Option'
      }
    ];
    this.showPanels.showPlanDemand = false;
    this.showPanels.showRevisitPlan = false;
    this.showPanels.showRevisitView = false;
    this.showPanels.showPortfolioMgmt = false;
    this.endWeek = '';
    this.SKUs = this.SKUs.concat(this.selectedSKUs);
    this.selectedSKUs = [];
    this.selectedPlants = [];
    this.selectedCustomerPlanningGroups = [];
    this.createPlanLoader = false;
  }

  public addWeeks(numOfWeeks: number) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7 * numOfWeeks);
    this.endWeek = currentDate.getFullYear() + '-W' + CreatePlanComponent.getCurrentWeek(currentDate);
  }

  public addYears(numOfYears: number) {

  }

  public openCalender() {
    const elem = document.getElementById('endWeek');
    elem.focus();
  }

  public selectOrClearAll(clearAll = false) {
    const value = !clearAll;
    this.brands = this.brands.map((item) => {
      item.isChecked = value;
      return item;
    });

    this.segments = this.segments.map((item) => {
      item.isChecked = value;
      return item;
    });

    this.packs = this.packs.map((item) => {
      item.isChecked = value;
      return item;
    });
  }

  public addItems(itemId: number) {
    const itemIndex = this.SKUs.findIndex((item) => item.id === itemId);
    const item = this.SKUs[itemIndex];
    item.isFiltered = false;
    this.selectedSKUs.push(item);
    this.SKUs.splice(itemIndex, 1);
  }

  public addItemsAll() {
    const onlyAddFiltered = this.searchText.trim();
    const toBeRemovedItemIds = [];

    for (const item of this.SKUs) {
      if (onlyAddFiltered) {
        if (item.isFiltered) {
          this.selectedSKUs.push(item);
          toBeRemovedItemIds.push(item.id);
        }
      } else {
        this.selectedSKUs.push(item);
      }
    }

    if (!onlyAddFiltered) {
      this.SKUs = [];
    } else {
      for (const itemId of toBeRemovedItemIds) {
        const itemIndex = this.SKUs.findIndex((item) => item.id === itemId);
        this.SKUs.splice(itemIndex, 1);
      }
    }
  }

  public removeItems(itemId: number) {
    const itemIndex = this.selectedSKUs.findIndex((item) => item.id === itemId);
    const item = this.selectedSKUs[itemIndex];
    item.isFiltered = false;
    this.SKUs.push(item);
    this.selectedSKUs.splice(itemIndex, 1);
  }

  public removeItemsAll() {
    const onlyRemoveFiltered = this.selectedSearchText.trim();
    const toBeRemovedItemIds = [];

    for (const item of this.selectedSKUs) {
      if (onlyRemoveFiltered) {
        if (item.isFiltered) {
          this.SKUs.push(item);
          toBeRemovedItemIds.push(item.id);
        }
      } else {
        this.SKUs.push(item);
      }
    }

    if (!onlyRemoveFiltered) {
      this.selectedSKUs = [];
    } else {
      for (const itemId of toBeRemovedItemIds) {
        const itemIndex = this.selectedSKUs.findIndex((item) => item.id === itemId);
        this.selectedSKUs.splice(itemIndex, 1);
      }
    }
  }

  public onFilterCheckboxClick($event) {
    const reqBody = this.getFiltersObject();

    this.subs.items$ = this.skuService.getSkUList(reqBody).subscribe((response: any) => {
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
      filterBrands: brands,
      filterSegments: segments,
      filterPacks: packs,
    };
  }

  // Create Plan Handler
  public createPlan() {
    this.createPlanLoader = true;
    const data = {
      startWeek: CreatePlanComponent.transformWeek(this.startWeek),
      endWeek: CreatePlanComponent.transformWeek(this.endWeek),
      forecastingGroups: JSON.parse(JSON.stringify(this.selectedSKUs)),
      customerPlanningGroup: this.selectedCustomerPlanningGroups.map(item => item.name),
      plants: this.selectedPlants.map(item => item.name),
    };
    this.outputDateEmitter.emit(data);
  }

  // Filter SKUs handlers
  public getFilteredSKUCount(): number {
    let cnt = 0;

    for (let index = 0; index < this.SKUs.length; index += 1) {
      if (this.SKUs[index].isFiltered) {
        cnt += 1;
      }
    }

    return cnt;
  }

  public getCallback(isSelected = false) {
    if (isSelected) {
      return this.filterSelectedSKUs.bind(this);
    }
    return this.filterSKUs.bind(this);
  }

  public filterSKUs(sku: string) {
    if (!this.searchText || !this.searchText.trim()) {
      return true;
    }
    const regex = new RegExp(this.searchText && this.searchText.trim(), 'ig');
    return regex.test(sku);
  }

  public filterSelectedSKUs(sku: string) {
    if (!this.selectedSearchText || !this.selectedSearchText.trim()) {
      return true;
    }
    const regex = new RegExp(this.selectedSearchText && this.selectedSearchText.trim(), 'ig');
    return regex.test(sku);
  }

  // Modal wizard handlers
  public changeActiveStep(step) {
    if (step === 1) {
      this.showPanels.showPlanDemand = false;
      this.showPanels.showRevisitPlan = false;
      this.showPanels.showRevisitView = false;
      this.showPanels.showPortfolioMgmt = false;
      this.wizardList = [
        {
          text: 'Select Option'
        }
      ];
    }

    this.activeStepOrder = step;
  }

  public showPlanDemand() {
    this.showPanels.showPlanDemand = true;
    this.activeStepOrder = 2;
    this.wizardList = [
      {
        text: 'Select Option'
      },
      {
        text: 'Select Planning Horizon'
      },
      {
        text: 'Filter SKUs'
      },
      {
        text: 'Select CPG and Plant'
      }
    ];

  }

  public showRevisitPlan() {
    this.showPanels.showRevisitPlan = true;
    this.activeStepOrder = 2;
    this.wizardList = [
      {
        text: 'Select Option'
      },
      {
        text: 'Chose Plan'
      }
    ];
  }

  public showRevisitView() {
    this.showPanels.showRevisitView = true;
    this.activeStepOrder = 2;
    this.wizardList = [
      {
        text: 'Select Option'
      },
      {
        text: 'Chose View'
      }
    ];
  }

  public showPortfolioMgmt() {
    this.showPanels.showPortfolioMgmt = true;
    this.activeStepOrder = 2;
    this.wizardList = [
      {
        text: 'Select Option'
      },
      {
        text: 'PM1'
      },
      {
        text: 'PM2'
      },
      {
        text: 'PM3'
      }
    ];
  }
}
