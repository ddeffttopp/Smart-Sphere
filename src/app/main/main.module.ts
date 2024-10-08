import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SharedModule } from "../shared/shared.module";
import { MainRoutingModule } from "./main-routing.module";
import { LoginComponent } from './auth/login/login.component';
import { RegComponent } from './auth/reg/reg.component';
import { ProductPageComponent } from "./product-page/product-page.component";
import { SwiperDirective } from "../shared/directives/swiper.directive";
import { HomePageComponent } from './home-page/home-page.component';
import { ProductInfoComponent } from '../shared/components/product-info/product-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductBasketComponent } from './product-basket/product-basket.component';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegComponent,
    ProductPageComponent,
    HomePageComponent,
    ProductInfoComponent,
    ProductBasketComponent,
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    SwiperDirective,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatSidenavModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {
}
