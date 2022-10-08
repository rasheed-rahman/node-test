import { StockLevel } from './interfaces/stock.interface'
import { TransactionType } from './interfaces/transaction.interface'
import { findTransactionsBySKU, getStockBySKU } from './repository'


/**
 * Calculate stock level
 *
 * @param sku
 */
export const calculateStockLevel = (sku: string): Promise<StockLevel> => {
    // get data for given sku...
    const stock = getStockBySKU(sku)
    const transactions = findTransactionsBySKU(sku)

    // throw error if SKU not found in stock & transactions...
    if (!stock && !transactions.length) {
        return Promise.reject('SKU not found')
    }

    // construct response...
    const stockLevel: StockLevel = {
        sku,
        qty: stock?.stock || 0 // default to 0 if not in stock
    }

    // iterate through each transaction...
    for (const transaction of transactions) {
        switch (transaction.type) {
            case TransactionType.Order:
                stockLevel.qty = stockLevel.qty - transaction.qty
                break

            case TransactionType.Refund:
                stockLevel.qty = stockLevel.qty + transaction.qty
                break
        }
    }

    return Promise.resolve(stockLevel)
}
