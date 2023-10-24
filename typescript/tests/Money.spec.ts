import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MoneyCalculator } from '../src/MoneyCalculator';


export class DifferentCurrencyError extends Error {
    constructor(currency1: Currency,currency2:Currency) {
        super('imposible to add: ' + currency1 +" + " + currency2)
    }
    message: string
}


class Money {

    private amount: number;
    private currency: Currency;

    constructor(amount: number, currency: Currency) {
        this.amount = amount;
        this.currency = currency;
    }

    add(money: Money): Money {
        if(money.currency !== this.currency){
            throw new DifferentCurrencyError(this.currency,money.currency);
        }
        return new Money(this.amount + money.amount, this.currency);
    }
}


describe('Money', () => {
    test('add in usd returns number', () => {
        expect(MoneyCalculator.Add(5, Currency.USD, 10)).toBeNumber();
        expect(MoneyCalculator.Add(5, Currency.USD, 10)).not.toBeNull();
    })


    test('should add money when currency is same', () => {
        const money: Money = new Money(5, Currency.USD);
        const sum = money.add(new Money(10, Currency.USD));

        expect(sum).toEqual(new Money(15, Currency.USD));
        expect(money).toEqual(new Money(5, Currency.USD));
    })

    test('should add money when currency is different', () => {
        const money: Money = new Money(5, Currency.EUR);

        expect(() => money.add(new Money(10, Currency.USD)))
            .toThrow(DifferentCurrencyError)
    })
})

