import { StockLevel } from "./interfaces/stock.interface";

import TRANSACTIONS from '../transactions.json';
import STOCK from '../stock.json';


export const calculateStockLevel = (sku: string): Promise<StockLevel> => {
    return Promise.resolve({ sku: '', qty: 0 })
}
