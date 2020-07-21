import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimengModule} from './primeng/primeng.module';
import {ExtrasModule} from './extras/extras.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengModule,
    ExtrasModule
  ],
  exports: [
    PrimengModule,
    ExtrasModule
  ]
})
export class SharedModule {
}
