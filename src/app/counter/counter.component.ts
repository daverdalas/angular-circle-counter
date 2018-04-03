import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import * as ease from 'ease-component';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit {
    @Input() mode: string = 'onInit';
    @Input() from: number = 0;
    @Input() to: number = 0;
    @Input() of: number;
    @Input() animationTime: number = 4000;
    @Input() animationType: string = 'linear';
    @Input() showCircle: boolean = true;
    @Input() circleColor: string = '#307bbb';
    @Input() fontSize: number = 150;
    @Input() delay: number = 0;
    @Output() finished = new EventEmitter();
    private _hold: boolean = true;
    private _count: number;
    private _startTime: number;
    private _percentDone: number = 0;
    private _holdProgress: number = 0;
    private _nativeElement: HTMLElement;
    private _startTimeout;

    @HostListener('window:scroll', ['$event'])
    @HostListener('window:resize', ['$event'])
    onWindowChange($event) {
        if (this.mode !== 'viewport') {
            return;
        }
        if (this.hold && this.isElementInViewport()) {
            this.start();
        }
    }

    constructor(private hostElement: ElementRef) {
        this.nativeElement = hostElement.nativeElement as HTMLElement;
    }

    get startTimeout() {
        return this._startTimeout;
    }

    set startTimeout(value) {
        this._startTimeout = value;
    }

    get nativeElement(): HTMLElement {
        return this._nativeElement;
    }

    set nativeElement(value: HTMLElement) {
        this._nativeElement = value;
    }

    get holdProgress(): number {
        return this._holdProgress;
    }

    set holdProgress(value: number) {
        this._holdProgress = value;
    }

    get percentDone(): number {
        return this._percentDone;
    }

    set percentDone(value: number) {
        this._percentDone = value;
    }

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        this._count = value;
    }

    get startTime(): number {
        return this._startTime;
    }

    set startTime(value: number) {
        this._startTime = value;
    }

    get hold(): boolean {
        return this._hold;
    }

    set hold(value: boolean) {
        this._hold = value;
    }

    ngOnInit(): void {
        this.init();
    }

    start(): void {
        if (this.delay > 0) {
            this.startTimeout = window.setTimeout(() => {
                this.startAction();
            }, this.delay);
            return;
        }
        this.startAction();
    }

    stop(): void {
        window.clearTimeout(this.startTimeout);
        this.hold = true;
    }

    restart(): void {
        this.init();
    }

    init(): void {
        this.hold = true;
        this.count = this.from;
        this.holdProgress = 0;
        this.startTime = undefined;
        this.percentDone = 0;
        window.clearTimeout(this.startTimeout);
        if (typeof this.of === 'undefined') {
            this.of = this.to;
        }
        if (this.mode === 'onInit') {
            this.start();
        }
    }

    private startAction(): void {
        this.hold = false;
        this.requestFrame();
    }

    private step(timestamp): void {
        if (!this.startTime) {
            this.startTime = timestamp;
        }
        let progress = timestamp - this.startTime;
        progress += this.holdProgress;
        if (this.hold) {
            this.holdProgress = progress;
            this.startTime = undefined;
            return;
        }
        const easeValue = ease[this.animationType](progress / this.animationTime);
        let currentCount = Math.round(easeValue * this.to);
        if (currentCount >= this.to) {
            currentCount = this.to;
        }
        this.count = currentCount;
        this.percentDone = currentCount / this.of;
        if (progress < this.animationTime) {
            this.requestFrame();
            return;
        }
        // Finished
        this.finished.emit();
    }

    private requestFrame(): void {
        window.requestAnimationFrame(this.step.bind(this));
    }

    private isElementInViewport(): boolean {
        const rect = this.nativeElement.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    private getCircleStyle(): any {
        return {
            'clip': this.percentDone >= 0.5 ? 'rect(auto, auto, auto, auto)' : 'rect(0em, 1em, 1em, 0.5em)'
        };
    }

    private getBarStyle(): any {
        const rotateDeg = 360 * this.percentDone;
        return {
            'transform': `rotate(${rotateDeg}deg)`,
            'border-color': this.circleColor
        };
    }

    private getFillStyle(): any {
        const rotateDeg = this.percentDone > 0.5 ? 180 : 0;
        return {
            'display': this.percentDone <= 0.5 ? 'none' : 'block',
            'transform': `rotate(${rotateDeg}deg)`,
            'border-color': this.circleColor
        };
    }
}
