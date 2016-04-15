import {Component, Input} from 'angular2/core';
import {FinanceService} from '../yahoo.service';

@Component({
  selector: 'line-chart',
  templateUrl: 'app//line-chart/line-chart.html',
  styleUrls: ['app//line-chart/line-chart.css']
})
export class LineChart {
  @Input() selected;

  constructor(private _financeService: FinanceService) {}

}
