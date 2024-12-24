import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarCatalogComponent } from "./components/sidebar-catalog/sidebar-catalog.component";
import { SwiperDirective } from "./directives/swiper.directive";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import {
  ProductCharacteristicsComponent
} from './components/product-characteristics/product-characteristics.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NumberCountButtonComponent } from './components/number-count-button/number-count-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { MatMenuModule } from '@angular/material/menu';
import { DeliveryItemComponent } from './components/delivery-item/delivery-item.component';
import { DeliveryCityComponent } from './components/delivery-city/delivery-city.component';
import { MatInputModule } from '@angular/material/input';
import { ProductAlikeComponent } from './components/product-alike/product-alike.component';
import { AverageStarsComponent } from './components/average-stars/average-stars.component';
import { StarsComponent } from './components/stars/stars.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { WriteReviewsComponent } from './components/write-reviews/write-reviews.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { CatalogFiltersComponent } from './components/catalog-filters/catalog-filters.component';
import { MatSliderModule } from '@angular/material/slider';
import { ProductBuyingComponent } from './components/product-buying/product-buying.component';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { BuyingDetailsComponent } from './components/buying-details/buying-details.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductCardComponent,
    FooterComponent,
    SidebarComponent,
    SidebarCatalogComponent,
    ProductCharacteristicsComponent,
    ProductReviewsComponent,
    NumberCountButtonComponent,
    DeliveryItemComponent,
    DeliveryCityComponent,
    ProductAlikeComponent,
    AverageStarsComponent,
    StarsComponent,
    WriteReviewsComponent,
    HeaderSearchComponent,
    CatalogFiltersComponent,
    ProductBuyingComponent,
    DialogHeaderComponent,
    BuyingDetailsComponent,
  ],
  imports: [
    CommonModule,
    SwiperDirective,
    RouterLink,
    MatDialogModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    RouterOutlet,
    FormsModule,
    CdkMenuTrigger,
    MatMenuModule,
    MatInputModule,
    ReactiveFormsModule,
    ClickOutsideDirective,
    NgOptimizedImage,
    MatSliderModule,
    MatTooltipModule,
    MatStepperModule
  ],
  exports: [
    HeaderComponent,
    ProductCardComponent,
    SidebarComponent,
    SidebarCatalogComponent,
    FooterComponent,
    NumberCountButtonComponent,
    DeliveryItemComponent,
    ProductAlikeComponent,
    StarsComponent,
    AverageStarsComponent,
    CatalogFiltersComponent,
    DialogHeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService]
})
export class SharedModule {
}
