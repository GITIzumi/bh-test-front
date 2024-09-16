import { Component, inject } from '@angular/core';
import { GraphComponent } from "../../components/graph/graph.component";
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, timer } from 'rxjs';
import { RawData } from '../../interfaces/data.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, GraphComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

  private http = inject(HttpClient);

  $rawValues: Observable<RawData[]> = timer(0, 4000).pipe(
    switchMap(() => this.fetchRawValues())
  )

  private fetchRawValues(): Observable<RawData[]> {
    return this.http.get<RawData[]>('http://localhost:3001/data-point/raw');
  }

}
