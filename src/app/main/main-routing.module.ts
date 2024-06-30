import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";

enum MainRoutingPaths {
  Main = ''
}

const routes: Routes = [
  {
    path: MainRoutingPaths.Main,
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
