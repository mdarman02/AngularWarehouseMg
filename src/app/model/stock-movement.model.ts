export class StockMovement {
    productId: number;
    quantity: number;
    reason: string;
    movementType: string;
    constructor() {
        this.productId = 0;
        this.quantity = 0;
        this.reason = '';
        this.movementType = '';
    }
  }
