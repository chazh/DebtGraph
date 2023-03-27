import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListDebtComponent } from './components/list-debt/list-debt.component';

const routes: Routes = [
  {
    path: '',
    component: ListDebtComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
