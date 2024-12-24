import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ProductInfoComponent } from "../shared/components/product-info/product-info.component";
import { ProductReviewsComponent } from "../shared/components/product-reviews/product-reviews.component";
import {
  ProductCharacteristicsComponent
} from "../shared/components/product-characteristics/product-characteristics.component";
import { ProductBasketComponent } from './product-basket/product-basket.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { ProductResolver } from '../shared/resolvers/product.resolver';
import { BuyingPageComponent } from './buying-page/buying-page.component';

enum MainRoutingPaths {
  Main = '',
  ProductPage = 'productPage/:id',
  HomePage = 'homePage',
  ProductBasket = 'productBasket',
  CatalogPage = 'catalogPage',
  BuyingPage = 'buyingPage',
}

const routes: Routes = [
  {
    path: MainRoutingPaths.Main,
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: MainRoutingPaths.HomePage,
        pathMatch: 'full'
      },
      {
        path: MainRoutingPaths.HomePage,
        component: HomePageComponent
      },
      {
        path: MainRoutingPaths.CatalogPage,
        component: CatalogPageComponent
      },
      {
        path: MainRoutingPaths.ProductPage,
        component: ProductPageComponent,
        resolve: { product: ProductResolver },
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: ProductInfoComponent
          },
          {
            path: 'characteristics',
            component: ProductCharacteristicsComponent
          },
          {
            path: 'reviews',
            component: ProductReviewsComponent
          }
        ]
      },
      {
        path: MainRoutingPaths.ProductBasket,
        component: ProductBasketComponent,
      },
      {
        path: MainRoutingPaths.BuyingPage,
        component: BuyingPageComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
