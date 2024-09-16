import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RawData } from '../../interfaces/data.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent {

  @Input()
  rawValues!: RawData[];

  @ViewChild('myCanvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  context!: CanvasRenderingContext2D;

  graphSize = {
    width: 1200,
    height: 300
  }

  interval = {
    start: 0,
    end: 24
  }

  intervals: any;

  maxValue = 150 + 10; // +10 for negative range 

  constructor() {
    this.intervals = this.getIntervals();
  }

  ngAfterViewInit(): void {

    this.context = this.canvas.nativeElement.getContext('2d')!;

    this.canvas.nativeElement.width = this.graphSize.width;
    this.canvas.nativeElement.height = this.graphSize.height;

    this

    this.drawAxisX(0, '#ff000045');
    this.drawAxisY();

    this.drawGraph();

  }

  getPositionOfValue(value: number): number {
    return this.graphSize.height - ((value + 10) * this.graphSize.height / this.maxValue);
  }

  test = [
    {
      date: "2024-09-12T21:30:50.116Z",
      id: "db04bd54-90b9-4b39-a92e-a7363e8d20f8",
      rawValue: 50
    },
    {
      date: "2024-09-12T21:30:50.116Z",
      id: "db04bd54-90b9-4b39-a92e-a7363e8d20f8",
      rawValue: 0
    },
    {
      date: "2024-09-12T21:30:50.116Z",
      id: "db04bd54-90b9-4b39-a92e-a7363e8d20f8",
      rawValue: 100
    },
  ]

  private getIntervals() {
    let start = this.interval.start;
    let end = this.interval.end;

    let intervals = [];

    while (start <= end) {
      intervals.push(start);
      start++;
    }

    return intervals;
  }

  private getPositionInDay(date: string): number {

    let hours = new Date(date).getHours() + (new Date(date).getMinutes() + new Date(date).getSeconds() / 60) / 60;

    return this.graphSize.width * hours / 24;
  }

  private drawGraph(): void {

    let ctx = this.context;

    ctx.beginPath();
    ctx.lineWidth = 1;

    let first = true;

    let pointSize = 4;

    ctx.strokeStyle = 'white';
    // Draw line
    this.rawValues.forEach((value) => {
      let position = this.getPositionInDay(value.date);

      if (first) {
        ctx.moveTo(position, this.getPositionOfValue(value.rawValue));
        first = false;
      } else {
        ctx.lineTo(position, this.getPositionOfValue(value.rawValue));
      }
    });
    ctx.stroke();

    // Draw points
    this.rawValues.forEach((value) => {
      let position = this.getPositionInDay(value.date);

      let point = new Path2D();
      ctx.fillStyle = 'blue';
      point.rect(position - pointSize / 2, this.getPositionOfValue(value.rawValue) - pointSize / 2, pointSize, pointSize);
      ctx.fill(point);
    });

  }

  private drawAxisX(value: number, color: string): void {
    let ctx = this.context;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(0, this.getPositionOfValue(value));
    ctx.lineTo(this.graphSize.width, this.getPositionOfValue(value));
    ctx.stroke();
  }

  private drawAxisY(): void {
    let ctx = this.context;

    let i = 0;

    while (i < Math.abs(this.interval.start - this.interval.end) + 1) {
      let position = this.graphSize.width * i / Math.abs(this.interval.start - this.interval.end);

      ctx.beginPath();

      // if (i % 2 == 1) {
      //   ctx.strokeStyle = '#808080a6';
      // } else {
      ctx.strokeStyle = '#80808038';
      // }

      ctx.moveTo(position, 0);
      ctx.lineTo(position, this.graphSize.height);
      ctx.stroke();

      i++;
    }
  }
}
