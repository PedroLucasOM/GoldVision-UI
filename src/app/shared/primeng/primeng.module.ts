import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {CalendarModule, DropdownModule, InputMaskModule, InputTextareaModule, SelectButtonModule, TooltipModule} from 'primeng/primeng';
import {CurrencyMaskModule} from 'ng2-currency-mask';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    CurrencyMaskModule,
    InputMaskModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    CurrencyMaskModule,
    InputMaskModule
  ]
})
export class PrimengModule { }
