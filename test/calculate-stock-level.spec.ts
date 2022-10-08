import { calculateStockLevel } from '../src/calculate-stock-level'
import * as Repository from '../src/repository'
import { TransactionType } from '../src/interfaces/transaction.interface'

describe('calculateStockLevel', () => {
    let spyOnTransactions: jest.SpyInstance
    let spyOnStock: jest.SpyInstance

    beforeEach(() => {
        spyOnTransactions = jest.spyOn(Repository, 'findTransactionsBySKU')
        spyOnStock = jest.spyOn(Repository, 'getStockBySKU')
    })

    afterEach(() => {
        spyOnTransactions.mockRestore()
        spyOnStock.mockRestore()
    })

    it('should throw error if SKU not found in stock & transactions', async () => {
        // Arrange...
        spyOnStock.mockReturnValue(null)
        spyOnTransactions.mockReturnValue([])

        // Act & Assert...
        await expect(calculateStockLevel('sku')).rejects.toMatch('SKU not found')
    })

    it('should reflect start quantity of 0 if SKU not in stock, but in transactions', async () => {
        // Arrange...
        const sku = 'KED089097/22/09'

        spyOnStock.mockReturnValue(null)
        spyOnTransactions.mockReturnValue([
            { sku, type: TransactionType.Refund, qty: 25 }, // refund 25
            { sku, type: TransactionType.Order, qty: 5 } // order 5
        ])

        // Act...
        const response = await calculateStockLevel(sku)

        // Assert...
        expect(response).toHaveProperty('qty')
        expect(response).toHaveProperty('sku')
        expect(response.sku).toEqual(sku)
        expect(response.qty).toEqual(20)
    })

    it('should return correct stock level for a given SKU', async () => {
        // Arrange...
        const sku = 'KED089097/68/09'
        const qty = 100

        spyOnStock.mockReturnValue({ sku, stock: qty })
        spyOnTransactions.mockReturnValue([
            { sku, type: TransactionType.Order, qty: 50 }, // order 50
            { sku, type: TransactionType.Refund, qty: 25 }, // refund 25
            { sku, type: TransactionType.Order, qty: 5 } // order 5
        ])

        // Act...
        const response = await calculateStockLevel(sku)

        // Assert...
        expect(response).toHaveProperty('qty')
        expect(response).toHaveProperty('sku')
        expect(response.sku).toEqual(sku)
        expect(response.qty).toEqual(70)
    })

    it('should return original stock level if no transactions found', async () => {
        // Arrange...
        const sku = 'KED089097/68/09'
        const qty = 88

        spyOnStock.mockReturnValue({ sku, stock: qty })
        spyOnTransactions.mockReturnValue([])

        // Act...
        const response = await calculateStockLevel(sku)

        // Assert...
        expect(response).toHaveProperty('qty')
        expect(response).toHaveProperty('sku')
        expect(response.sku).toEqual(sku)
        expect(response.qty).toEqual(88)
    })
})

