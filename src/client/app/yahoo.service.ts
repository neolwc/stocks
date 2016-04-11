import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FinanceService {
	symbols = ["AAPL", "AMZN", "FB", "GOOG", "IBM", "LNKD", "MSFT", "NFLX", "TWTR", "YHOO"];

	constructor(private http: Http) {}

	list(ary = this.symbols) {
		let q = `select Symbol,Name,LastTradePriceOnly,MarketCapitalization
		from yahoo.finance.quotes where symbol in ("${this.symbols.join()}")`;
		let url = `https://query.yahooapis.com/v1/public/yql?q=${q}
		&format=json&env=store://datatables.org/alltableswithkeys`;
		return this.http.get(encodeURI(url))
			.map(data => data.json().query.results.quote);
	}
}
