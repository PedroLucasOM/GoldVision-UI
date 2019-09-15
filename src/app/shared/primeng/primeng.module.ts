import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/primeng';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ]
})
export class PrimengModule { }
