import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

enum AppRoutingPaths {
  Main = ''
}

const routes: Routes = [
  {
    path: AppRoutingPaths.Main,
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
