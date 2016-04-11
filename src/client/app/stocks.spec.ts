import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {StocksApp} from '../app/stocks';

beforeEachProviders(() => [StocksApp]);

describe('App: Stocks', () => {
  it('should have the `defaultMeaning` as 42', inject([StocksApp], (app: StocksApp) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([StocksApp], (app: StocksApp) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

