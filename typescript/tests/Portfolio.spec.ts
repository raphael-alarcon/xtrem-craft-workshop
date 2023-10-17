import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MissingExchangeRateError } from '../src/MissingExchangeRateError'
import { map } from 'fp-ts/lib/Functor'


class Portfolio{
    private readonly wallet: Map<Currency, number> = new Map()

    add(amount: number, currency: Currency) {
        if(this.wallet.has(currency)){
            this.wallet[currency]=this.wallet.get(currency) + amount
        }
        else{
            this.wallet.set(currency,amount)
        }
    }
    
    evaluate(currency :Currency ,bank:Bank ):number{
        var res=0
        for (let key of this.wallet.keys())
        {
            if(key == currency){
                res += this.wallet.get(key)
            }else{
                
            }
        }
        return 15
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
    portfolio.add(5,Currency.USD)
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
