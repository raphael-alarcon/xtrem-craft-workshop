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
            if(curr.currency !== currency){
                return acc+bank.convert(curr.amount,curr.currency,currency)
            }
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


  test('5 EUR + 10 USD = 16 USD', () => {
    const portfolio = new Portfolio()
    const bank = Bank.withExchangeRate(Currency.EUR,Currency.USD,1.2)
    portfolio.add(5,Currency.EUR)
    portfolio.add(10,Currency.USD)

    const evaluation = portfolio.evaluate(Currency.USD,bank)

    expect(evaluation).toBe(16)
  })


  test('5 EUR + 10 USD  + 12 KRW = 40 USD', () => {
    const portfolio = new Portfolio()
    const bank = Bank.withExchangeRate(Currency.EUR,Currency.USD,1.2)
    bank.addExchangeRate(Currency.KRW,Currency.USD,2)
    portfolio.add(5,Currency.EUR)
    portfolio.add(10,Currency.USD)
    portfolio.add(12,Currency.KRW)
    
    const evaluation = portfolio.evaluate(Currency.USD,bank)

    expect(evaluation).toBe(40)
  })

  test('5 EUR + 10 USD = 26 USD', () => {
    const portfolio = new Portfolio()
    const bank = Bank.withExchangeRate(Currency.EUR,Currency.KRW,1.2)
    bank.addExchangeRate(Currency.USD,Currency.KRW,2)
    portfolio.add(5,Currency.EUR)
    portfolio.add(10,Currency.USD)
    
    const evaluation = portfolio.evaluate(Currency.KRW,bank)

    expect(evaluation).toBe(26)
  })

})
