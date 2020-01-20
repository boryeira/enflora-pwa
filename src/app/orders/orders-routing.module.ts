import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
  },
  {
    path: ':id',
    loadChildren: () => import('./show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: ':id/flow',
    loadChildren: () => import('./flow/flow.module').then( m => m.FlowPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
