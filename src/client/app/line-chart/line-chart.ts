import {Component, Input, OnInit, OnChanges} from 'angular2/core';
import {FinanceService} from '../yahoo.service';

declare var Chart: any;

@Component({
  selector: 'line-chart',
  templateUrl: 'app//line-chart/line-chart.html',
  styleUrls: ['app//line-chart/line-chart.css']
})
export class LineChart implements OnInit, OnChanges {
  @Input() selected;
  public chart;

  private _today: Date;
  private _start: Date;
  private _end: Date;
  private history;

  constructor(private _financeService: FinanceService) {}

  ngOnInit() {
    this._today = new Date();
    this._start = new Date();
    this._end = new Date();
    this._start.setDate(this._today.getDate() - 7);
    this._end.setDate(this._today.getDate() - 1);
    this._financeService.history(this._start, this._end)
      .subscribe(history => {
        this.history = this.handleHistory(history);
        let data = {
          labels: this.history.labels,
          datasets: [
            {
              label: "Average",
              fill: false,
              backgroundColor: '#ff5252',
              borderColor: '#ff8a80',
              pointBorderColor: '#ff5252',
              pointBackgroundColor: '#ff8a80',
              pointHoverRadius: 5,
              data: this.history.data
            }
          ]
        };
        this.chart = new Chart(document.querySelector('canvas'), {
          data: data,
          type: 'line'
        });
      });
  }

  ngOnChanges() {
    if (this.selected) {
      if (this.chart.data.datasets.length === 2) this.chart.data.datasets.pop();
      this.chart.data.datasets.push({
        label: this.selected,
        fill: false,
        backgroundColor: '#80D8FF',
        borderColor: '#40C4FF',
        pointBorderColor: '#80D8FF',
        pointBackgroundColor: '#40C4FF',
        pointHoverRadius: 5,
        data: this.history.symbol[this.selected]
      });
      this.chart.update();
    }
  }

  handleHistory(prices) {
    let obj = {}, averages = [], symbols = {};
    prices.forEach(price => {
      (obj[price.Date]) ? obj[price.Date].push(price.Adj_Close) : obj[price.Date] = [price.Adj_Close];
      (symbols[price.Symbol]) ? symbols[price.Symbol].push(price.Adj_Close) : symbols[price.Symbol] = [price.Adj_Close];
    });
    for (let date in obj) {
      let sum = obj[date].reduce((prev, curr) => parseFloat(prev) + parseFloat(curr));
      averages.push(sum / obj[date].length);
    }
    return {labels: Object.keys(obj), data: averages, symbol: symbols};
  }
}
