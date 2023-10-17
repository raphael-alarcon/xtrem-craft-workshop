import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'
import { map } from 'fp-ts/lib/Functor'
import { threadId } from 'worker_threads'


class Portfolio{
    private wallet = []

    add(amount: number, currency: Currency) {
      this.wallet.push({amount:amount,currency:currency})
    }
    
    evaluate(currency :Currency ,bank:Bank ): number{
        return this.wallet.reduce((acc,curr)=>{
            return acc+curr.amount;
        },0)
        
    }
}

describe('Portfolio', function () {

  test('5 USD + 10 USD = 15 USD', () => {
    const portfolio = new Portfolio()
    const bank = Bank.withExchangeRate(Currency.EUR,Currency.USD,1.2)
    portfolio.add(5,Currency.USD)
    portfolio.add(10,Currency.USD)

    const evaluation = portfolio.evaluate(Currency.USD,bank)

    expect(evaluation).toBe(15)
  })
  test('7 USD + 10 USD = 17 USD', () => {
    const portfolio = new Portfolio()
    const bank = Bank.withExchangeRate(Currency.EUR,Currency.USD,1.2)
    portfolio.add(7,Currency.USD)
    portfolio.add(10,Currency.USD)

    const evaluation = portfolio.evaluate(Currency.USD,bank)

    expect(evaluation).toBe(17)
  })

/*
  test('5 EUR + 10 USD = 17 USD', () => {
    const portfolio = new Portfolio()
    const bank = Bank.withExchangeRate(Currency.EUR,Currency.USD,1.2)
    portfolio.add(5,Currency.EUR)
    portfolio.add(10,Currency.USD)

    const evaluation = portfolio.evaluate(Currency.USD,bank)

    expect(evaluation).toBe(17)
  })
*/
})
