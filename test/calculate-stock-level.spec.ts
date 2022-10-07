import { calculateStockLevel } from "../src/calculate-stock-level";


describe('calculateStockLevel', () => {
    xit('should throw error if SKU not found in stock & transactions', async () => {
        // Arrange...
        const sku = ''

        // Act...

        // Assert...
        await expect(calculateStockLevel(sku)).rejects.toMatch('SKU not found');
    });

    xit('should reflect start quantity of 0 if SKU not in stock, but in transactions', async () => {
        // Arrange...
        const sku = 'KED089097/68/09';
        const qty = 10;

        // Act...
        const response = await calculateStockLevel('');

        // Assert...
        expect(response).toHaveProperty('qty');
        expect(response).toHaveProperty('sku');
        expect(response.sku).toEqual(sku);
        expect(response.qty).toEqual(qty);
    });

    xit('should return correct stock level for a given SKU', async () => {
        // Arrange...
        const sku = 'KED089097/68/09';
        const qty = 100;

        // Act...
        const response = await calculateStockLevel('');

        // Assert...
        expect(response).toHaveProperty('qty');
        expect(response).toHaveProperty('sku');
        expect(response.sku).toEqual(sku);
        expect(response.qty).toEqual(qty);
    })
})

