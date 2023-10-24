import { Currency } from '../src/Currency'
import { Bank } from '../src/Bank'
import { MoneyCalculator } from '../src/MoneyCalculator';


export class DifferentCurrencyError extends Error {
    constructor(currency1: Currency,currency2:Currency) {
        super('imposible to add: ' + currency1 +" + " + currency2)
    }
    message: string
}


export class Money {

    public amount: number;
    public currency: Currency;

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
    times(value:number): Money {
    
        return new Money(this.amount * value, this.currency);
    }
    divide(value:number): Money {
    
        return new Money(this.amount / value, this.currency);
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

    test('should not add money when currency is different', () => {
        const money: Money = new Money(5, Currency.EUR);

        expect(() => money.add(new Money(10, Currency.USD)))
            .toThrow(DifferentCurrencyError)
    })
  
    
    test('should times money when currency is same', () => {
        const money: Money = new Money(5, Currency.USD);
        const times = money.times(10);

        expect(times).toEqual(new Money(50, Currency.USD));
        expect(money).toEqual(new Money(5, Currency.USD));
    })



    test('should divide money when currency is same', () => {
        const money: Money = new Money(50, Currency.USD);
        const divide = money.divide(10);

        expect(divide).toEqual(new Money(5, Currency.USD));
        expect(money).toEqual(new Money(50, Currency.USD));
    })



})

