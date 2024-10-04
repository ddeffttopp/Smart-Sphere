import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './store/reducers/app.reducers';
import { UserEffects } from './store/effects/user.effects';
import { ProductEffects } from './store/effects/product.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([UserEffects, ProductEffects]),
    StoreDevtoolsModule.instrument()
  ]
})
export class CoreModule {
}
