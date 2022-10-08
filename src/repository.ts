import _TRANSACTIONS from '../transactions.json'
import _STOCK from '../stock.json'

import { Transaction } from './interfaces/transaction.interface'
import { Stock } from './interfaces/stock.interface'

const TRANSACTIONS: Transaction[] = <Transaction[]>_TRANSACTIONS
const STOCK: Stock[] = <Stock[]>_STOCK


export function findTransactionsBySKU(sku: string): Transaction[] {
    return TRANSACTIONS.filter(transaction => transaction.sku === sku)
}

export function getStockBySKU(sku: string): Stock | null {
    return STOCK.find(stock => stock.sku === sku) || null
}
