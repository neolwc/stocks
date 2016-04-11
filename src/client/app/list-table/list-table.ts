import {Component, OnInit} from 'angular2/core';
import {FinanceService} from '../yahoo.service';

@Component({
  selector: 'list-table',
  templateUrl: 'app\/list-table/list-table.html',
  styleUrls: ['app\/list-table/list-table.css']
})
export class ListTable implements OnInit {
  public quotes;

  constructor(private _financeService: FinanceService) {}

  ngOnInit() {
    this._financeService.list()
      .subscribe(quotes => this.quotes = quotes);
  }
}
