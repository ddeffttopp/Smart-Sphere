import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SidebarCatalogComponent} from "./components/sidebar-catalog/sidebar-catalog.component";


@NgModule({
  declarations: [
    HeaderComponent,
    ProductCardComponent,
    FooterComponent,
    SidebarComponent,
    SidebarCatalogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ProductCardComponent,
    SidebarComponent,
    SidebarCatalogComponent
  ]
})
export class SharedModule {
}
