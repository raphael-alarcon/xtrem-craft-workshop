import { Currency } from "../src/Currency"
import { MoneyCalculator } from '../src/MoneyCalculator'

describe('Money', function () {
  test('add in usd returns number', () => {
    const sum = MoneyCalculator.Add(5, Currency.USD, 10)
    
    expect(sum).toBeNumber()
    expect(sum).not.toBeNull()
    //expect(sum).toBe(15)
  })

  test('multiply in eur returns positive number', () => {
    const sum = MoneyCalculator.Times(10, Currency.EUR, 2)
    
    expect(sum).toBeGreaterThan(0)
  })

  test('divide in korean won returns number', () => {
    const sum = MoneyCalculator.Divide(4002, Currency.KRW, 4)
    
    expect(1000.5, ).toBe(sum)
  })
})
