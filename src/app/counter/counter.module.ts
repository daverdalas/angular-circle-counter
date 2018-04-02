import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CounterComponent} from './counter.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CounterComponent
    ],
    imports: [
        CommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        CounterComponent
    ]
})
export class CounterModule {
}
