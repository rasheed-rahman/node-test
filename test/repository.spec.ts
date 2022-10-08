import { findTransactionsBySKU, getStockBySKU } from '../src/repository'
import _TRANSACTIONS from '.././transactions.json'
import _STOCK from '.././stock.json'

describe('repository', () => {
    describe('findTransactionsBySKU', () => {
        it('should return an array', () => {
            expect(findTransactionsBySKU(_TRANSACTIONS[0].sku)).toContain(_TRANSACTIONS[0])
        })
    })

    describe('getStockBySKU', () => {
        it('should return a stock', () => {
            expect(getStockBySKU(_STOCK[0].sku)).toEqual(_STOCK[0])
        })
        it('should return null if ont found', () => {
            expect(getStockBySKU('')).toEqual(null)
        })
    })
})
