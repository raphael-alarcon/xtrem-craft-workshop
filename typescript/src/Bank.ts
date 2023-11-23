import { Money } from '../tests/Money.spec'
import { Currency } from './Currency'
import { MissingExchangeRateError } from './MissingExchangeRateError'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()

  /**
   * Create a new bank with an exchange rate between two currency 
   * 
   * @param currentCurrency 
   * @param convertedCurrency 
   * @param rate 
   * 
   * @returns {Bank}
   */
  static withExchangeRate(currentCurrency: Currency, convertedCurrency: Currency, rate: number): Bank {
    const bank = new Bank()
    bank.addExchangeRate(currentCurrency, convertedCurrency, rate)
    return bank
  }

  /**
   * Add an exchange rate to the bank
   * 
   * @param currentCurrency
   * @param convertedCurrency
   * @param rate
   */
  addExchangeRate(currentCurrency: Currency, convertedCurrency: Currency, rate: number): void {
    const money: Money = new Money(rate, currentCurrency);
    this._exchangeRates.set(money.currency + '->' + convertedCurrency, money.amount)
  }

  /**
   * convert a currency in another one 
   * 
   * @param amount
   * @param currentCurrency
   * @param convertedCurrency
   * 
   * @return {number} the convertion result 
   */
  convert(convertedCurrency: Currency, money: Money): Money {
    if (!(money.currency === convertedCurrency || this._exchangeRates.has(money.currency + '->' + convertedCurrency))) { throw new MissingExchangeRateError(money.currency, convertedCurrency) }

    return money.hasCurrency(convertedCurrency)
    ? money
    : money.convert(this._exchangeRates.get(money.currency + '->' + convertedCurrency), convertedCurrency);
  }
}
