import { calculateStockLevel } from './calculate-stock-level'
import _TRANSACTIONS from '.././transactions.json'
import _STOCK from '.././stock.json'

(async () => {
    //  can run with some random samples here...
    console.log(await calculateStockLevel(_TRANSACTIONS[0].sku))
    console.log(await calculateStockLevel(_STOCK[0].sku))
})()
