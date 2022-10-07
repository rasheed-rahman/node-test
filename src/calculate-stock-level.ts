import { StockLevel } from "./interfaces/stock.interface";


export const calculateStockLevel = (sku: string): Promise<StockLevel> => {
    return Promise.resolve({ sku, qty: 0 })
}
