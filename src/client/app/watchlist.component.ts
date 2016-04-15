import {Component} from 'angular2/core';
import {ListTable} from './list-table/list-table';
import {LineChart} from './line-chart/line-chart';

@Component({
	selector: 'watchlist',
	template: '<main><line-chart [selected]="selected"></line-chart><list-table (select)="select($event)"></list-table></main>',
	styles: ['main{max-width:800px;margin:0 auto;}'],
	directives: [ListTable, LineChart]
})
export class Watchlist {
	public selected;

	select(symbol) {
		this.selected = symbol;
	}
}
