export interface OrderItem {
    id: number;
    productId: number;
    orderId: number;
    quantity: number;
    unitPrice: number;
  }
  
  export interface OrderItemDto {
    productId: number;
    quantity: number;
    unitPrice: number;
  }