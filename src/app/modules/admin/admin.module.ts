import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListDebtComponent } from './components/list-debt/list-debt.component';
import { DebtItemComponent } from './components/debt-item/debt-item.component';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    ListDebtComponent,
    DebtItemComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
