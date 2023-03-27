import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(x => x.AdminModule)
      },
      {
        path: 'debt',
        loadChildren: () => import('./modules/view-debt/view-debt.module').then(x => x.ViewDebtModule)
      },
      {
        path: '',
        redirectTo: '/debt',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
