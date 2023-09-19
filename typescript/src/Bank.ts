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
    this._exchangeRates.set(currentCurrency + '->' + convertedCurrency, rate)
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
  convert(amount: number, currentCurrency: Currency, convertedCurrency: Currency): number {
    if (!(currentCurrency === convertedCurrency || this._exchangeRates.has(currentCurrency + '->' + convertedCurrency))) { throw new MissingExchangeRateError(currentCurrency, convertedCurrency) }

    return convertedCurrency === currentCurrency
      ? amount
      : amount * this._exchangeRates.get(currentCurrency + '->' + convertedCurrency)
  }
}
