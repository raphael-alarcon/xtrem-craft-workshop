import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'
import { Money } from './Money.spec'

describe('Bank', function () {

  test('convert from eur to usd returns number', () => {
    const myBank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)

    expect(myBank.convert(Currency.USD, new Money(10, Currency.EUR))).toBe(12)
  })

  test('convert from current money to the same money returns same value', () => {
    const myBank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    
    expect(myBank.convert(Currency.EUR, new Money(10, Currency.EUR))).toBe(10)
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
    
    expect(myBank.convert(Currency.USD, new Money(10, Currency.EUR))).toBe(12)
    expect(myBank2.convert(Currency.USD, new Money(10, Currency.EUR))).toBe(13)
    expect(myBank3.convert(Currency.USD, new Money(10, Currency.EUR))).toBe(15)
  })
})
