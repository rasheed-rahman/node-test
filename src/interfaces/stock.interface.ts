export type Stock = {
    sku: string;
    stock: number;
}

/**
 * Represents the stock level of a product.
 * @typedef {Object} StockLevel
 * @property {string} sku - The SKU (Stock Keeping Unit) of the product.
 * @property {number} qty - The quantity of the product in stock.
 */
export type StockLevel = {
    sku: string;
    qty: number;
}
