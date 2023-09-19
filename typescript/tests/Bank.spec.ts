import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'

describe('Bank', function () {

  test('convert from eur to usd returns number', () => {
    const myBank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)

    expect(myBank.convert(10, Currency.EUR, Currency.USD)).toBe(12)
  })

  test('convert from current money to the same money returns same value', () => {
    const myBank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    
    expect(myBank.convert(10, Currency.EUR, Currency.EUR)).toBe(10)
  })

  test('convert throws error in case of missing exchange rates', () => {
    const myBank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    
    expect(() => myBank.convert(10, Currency.EUR, Currency.KRW))
      .toThrow(MissingExchangeRateError)
  })

  test('convert with different exchange rates returns different numbers', () => {
    const myBank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    const myBank2 = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.3)
    const myBank3 = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.5)
    
    expect(myBank.convert(10, Currency.EUR, Currency.USD)).toBe(12)
    expect(myBank2.convert(10, Currency.EUR, Currency.USD)).toBe(13)
    expect(myBank3.convert(10, Currency.EUR, Currency.USD)).toBe(15)
  })
})
