import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FilterComponent } from './filter/filter.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LocationRoutingModule
  ]
})
export class LocationModule { }
