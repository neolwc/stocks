import {Component, Input, OnInit} from 'angular2/core';
import {FinanceService} from '../yahoo.service';

declare var Chart: any;

@Component({
  selector: 'line-chart',
  templateUrl: 'app//line-chart/line-chart.html',
  styleUrls: ['app//line-chart/line-chart.css']
})
export class LineChart implements OnInit {
  @Input() selected;
  public chart;
  public data;

  constructor(private _financeService: FinanceService) {}

  ngOnInit() {
    this.data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      datasets: [
        {
          label: "Average",
          fill: false,
          pointBorderColor: '#ff5252',
          pointBackgroundColor: '#ff8a80',
          pointHoverRadius: 5,
          data: [200*Math.random(),200*Math.random(),200*Math.random(),200*Math.random(),200*Math.random()]
        }
      ]
    }
    this.chart = new Chart(document.querySelector('canvas'), {
      type: 'line',
      data: this.data
    });
  }
}
