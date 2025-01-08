import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { StockManagementComponent } from './component/stock-management/stock-management.component';
import { OrdersComponent } from './component/orders/orders.component';
import { CreateOrderComponent } from './component/create-order/create-order.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component:HomeComponent },
  {path: 'register',component:RegisterComponent},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'products',component:ProductListComponent},
  { path: 'edit-product/:id', component: ProductEditComponent },
  {path: 'add-product',component:AddProductComponent},
  {path: 'stock-management',component:StockManagementComponent},
  {path: 'orders',component:OrdersComponent},
  {path: 'create-order',component:CreateOrderComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
