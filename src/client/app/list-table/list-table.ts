import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {FinanceService} from '../yahoo.service';

@Component({
  selector: 'list-table',
  templateUrl: 'app\/list-table/list-table.html',
  styleUrls: ['app\/list-table/list-table.css']
})
export class ListTable implements OnInit {
  public all;
  public quotes;
  @Output('select') select: EventEmitter<any> = new EventEmitter();

  private order = {
    sD: false,
    nA: false,
    nD: false,
    pA: false,
    pD: false,
    mA: false,
    mD: false,
    sA: true
  };
  private ths = [
    { a: 's', n: 'Symbol' },
    { a: 'n', n: 'Name' },
    { a: 'p', n: 'Price' },
    { a: 'm', n: 'Market Cap' }
  ];

  constructor(private _financeService: FinanceService) {}

  ngOnInit() {
    this._financeService.list()
      .subscribe(quotes => this.quotes = this.all = quotes);
  }

  compare(a, b, by) {
    if (by === 'A') return a > b;
    if (by === 'D') return a < b;
  }

  sortBy(order) {
    for (let by in this.order) this.order[by] = false;
    this.order[order] = true;
    let by = order.charAt(1);
    let name = order.charAt(0);
    if (name === 's') this.quotes.sort((a, b) => this.compare(a.Symbol, b.Symbol, by));
    if (name === 'n') this.quotes.sort((a, b) => this.compare(a.Name, b.Name, by));
    if (name === 'p') this.quotes.sort((a, b) => this.compare(parseFloat(a.LastTradePriceOnly), parseFloat(b.LastTradePriceOnly), by));
    if (name === 'm') this.quotes.sort((a, b) => this.compare(parseFloat(a.MarketCapitalization), parseFloat(b.MarketCapitalization), by));
  }

  sort(name) {
    if (this.order[name + 'A']) this.sortBy(name + 'D');
    else this.sortBy(name + 'A');
  }

  filter(q) {
    let re = new RegExp(q, 'ig');
    this.quotes = this.all.filter(quote => re.test(quote.Symbol) || re.test(quote.Name));
  }
}
