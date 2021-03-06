import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterRoutingModule } from './character-routing.module';
import { DetailComponent } from './detail/detail.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DetailComponent,
    FilterComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CharacterRoutingModule
  ]
})
export class CharacterModule { }
