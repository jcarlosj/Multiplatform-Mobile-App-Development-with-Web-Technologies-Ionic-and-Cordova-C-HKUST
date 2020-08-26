import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishDetailPage } from './dish-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DishDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DishDetailPageRoutingModule {}
