import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { HeaderComponent } from './component/header/header.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProductListComponent } from './component/product-list/product-list.component'; // Import AuthInterceptor
import { ToastrModule } from 'ngx-toastr';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AddProductComponent } from './component/add-product/add-product.component';
import { StockManagementComponent } from './component/stock-management/stock-management.component';
import { CreateOrderComponent } from './component/create-order/create-order.component';
import { OrdersComponent } from './component/orders/orders.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    DashboardComponent,
    ProductListComponent,
    ProductEditComponent,
    AddProductComponent,
    StockManagementComponent,
    OrdersComponent,
    CreateOrderComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,// Add FormsModule here
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
