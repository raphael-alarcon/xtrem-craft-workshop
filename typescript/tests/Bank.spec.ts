import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'
import { Money } from './Money.spec'
import { map } from 'fp-ts/lib/Functor'

class BankBuilder {
  private pivotCurrency: Currency
  private exchangeRates = []

  add(currency: Currency, rate: number) {
    this.exchangeRates.push({currency:currency, rate:rate})
  }

  static aBank(): BankBuilder {
    return new BankBuilder; 
  }

  static aEuropeanBank = () => BankBuilder.aBank().withPivotCurrency(Currency.EUR); 

  withPivotCurrency(currency: Currency): BankBuilder {
    this.pivotCurrency = currency;
    return this; 
  }

  withExchangeRate(currency: Currency, rate: number): BankBuilder {
    this.exchangeRates.push(currency, rate);
    return this; 
  }

  build(){
    const bank = Bank.withExchangeRate(this.pivotCurrency, this.exchangeRates[0].currency, this.exchangeRates[0].rate);
    this.exchangeRates.forEach(exchangeRates => {
      bank.addExchangeRate(this.pivotCurrency, exchangeRates.currency, exchangeRates.rate);
      bank.addExchangeRate(exchangeRates.currency, this.pivotCurrency, 1/exchangeRates.rate);
    }); 
    return Bank; 
  }
}




describe('Bank', function () {

  test('convert from eur to usd returns number', () => {
    const myBank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)

    expect(myBank.convert(Currency.USD, new Money(10, Currency.EUR))["amount"]).toBe(12)
  })

  test('convert from current money to the same money returns same value', () => {
    const myBank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    
    expect(myBank.convert(Currency.EUR, new Money(10, Currency.EUR))["amount"]).toBe(10)
  })

  test('convert throws error in case of missing exchange rates', () => {
    const myBank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    
    expect(() => myBank.convert(Currency.KRW, new Money(10, Currency.EUR)))
      .toThrow(MissingExchangeRateError)
      .toThrow('EUR-> KRW')
  })

  test('convert with different exchange rates returns different numbers', () => {
    const myBank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const myBank2 = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.3)
    const myBank3 = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.5)
    
    expect(myBank.convert(Currency.USD, new Money(10, Currency.EUR))["amount"]).toBe(12)
    expect(myBank2.convert(Currency.USD, new Money(10, Currency.EUR))["amount"]).toBe(13)
    expect(myBank3.convert(Currency.USD, new Money(10, Currency.EUR))["amount"]).toBe(15)
  })
})
