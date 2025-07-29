import { Component, input, output } from '@angular/core';
import { Job } from '../../models/job';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [DatePipe],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {

  clickJob = output<Job>();

  jobs = input<Job[]>([
  ]);
}
