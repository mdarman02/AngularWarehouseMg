// filepath: /d:/project/AngularP/warehousemanagement/src/app/models/product.model.ts
export class Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  description: string;
  currentStock: number;
  constructor() {
    this.id = 0;
    this.name = '';
    this.sku = '';
    this.category = '';
    this.price = 0;
    this.description = '';
    this.currentStock = 0;
  }
}