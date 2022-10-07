export interface Transaction {
    sku: string;
    type: TransactionType;
    qty: number;
}

export enum TransactionType {
    Order = 'order',
    Refund = 'refund'
}

