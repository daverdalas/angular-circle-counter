import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {CounterComponent} from './counter/counter.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
    public from: number = 0;
    public to: number = 98;
    public of: number = 100;
    public mode: string = 'manual';
    public animationTime: number = 4000;
    public animationType: string = 'linear';
    public showCircle: boolean = true;
    public circleColor: string = '#307bbb';
    public fontSize: number = 150;
    public delay: number = 0;
    public suffix: any = '%';
    public prefix: any = '';
    public finishedText: string = '';
    @ViewChild('manual') counterComponent: CounterComponent;

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
    }
}
