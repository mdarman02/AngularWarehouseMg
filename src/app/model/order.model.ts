import { OrderItem, OrderItemDto } from "./orderItem.model";

export interface Order {
    id: number;
    createdAt: Date;
    totalItems?: number;
    totalAmount: number;
    status: string;
    notes: string;
    items: OrderItem[];
  }
  
//   export interface OrderDto {
//     totalAmount: number;
//     status: string;
//     notes: string;
//     items: OrderItemDto[];
//   }
export interface OrderDto {
    totalAmount: number;
  status: string;
  notes: string;
  items: OrderItemDto[];
  }