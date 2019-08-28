import {Component, OnInit, Input, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'wizard-component',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  @Input() activeStepOrder;
  @Input() wizardList;

  @Output('activeStepEmitter') activeStepEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  emitActiveStep(step) {
    this.activeStepOrder = step;
    this.activeStepEmitter.emit(step);
  }
}
