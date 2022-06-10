import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodeRoutingModule } from './episode-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    EpisodeRoutingModule
  ]
})
export class EpisodeModule { }
