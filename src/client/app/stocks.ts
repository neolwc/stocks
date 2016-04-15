import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {CliRouteConfig} from './route-config';
import {FinanceService} from './yahoo.service';
import {Watchlist} from './watchlist.component';

@Component({
  selector: 'stocks-app',
  providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, FinanceService],
  templateUrl: 'app/stocks.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
    { path: '/', name: 'Watchlist', component: Watchlist, useAsDefault: true }
].concat(CliRouteConfig))

export class StocksApp {}
