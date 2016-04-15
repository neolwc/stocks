import {Component} from 'angular2/core';
import {ListTable} from './list-table/list-table';

@Component({
	selector: 'watchlist',
	template: '<list-table></list-table>',
	directives: [ListTable]
})
export class Watchlist {}
