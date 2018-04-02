import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {CounterComponent} from './counter/counter.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
    title = 'app';
    @ViewChild('manual') counterComponent: CounterComponent;

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
    }

    finished(): void {
        console.log('koniec');
    }
}
