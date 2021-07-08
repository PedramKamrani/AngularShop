import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './Shared/site-header/site-header.component';
import { SiteFooterComponent } from './Shared/site-footer/site-footer.component';
import { HomeComponent } from './Pages/home/home.component';
import { SliderComponent } from './Pages/home/slider/slider.component';
import { SpecialProductsComponent } from './Pages/home/special-products/special-products.component';
import { NewProductsComponent } from './Pages/home/new-products/new-products.component';
import { FavoriteProductsComponent } from './Pages/home/favorite-products/favorite-products.component';
import { LaestNewsComponent } from './Pages/home/laest-news/laest-news.component';
import { BrandsComponent } from './Pages/home/brands/brands.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {SliderService} from './services/slider.service';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { ShopInterceptor } from './services/Shopinterceptor';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './services/register.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    HomeComponent,
    SliderComponent,
    SpecialProductsComponent,
    NewProductsComponent,
    FavoriteProductsComponent,
    LaestNewsComponent,
    BrandsComponent,
    ContactUsComponent,
    AboutUsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [SliderService,
    RegisterService,
  {
    provide:HTTP_INTERCEPTORS,
   useClass:ShopInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
