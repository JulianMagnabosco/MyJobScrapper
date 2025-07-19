import { Component, input, output } from '@angular/core';
import { Job } from '../../models/job';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {

  clickJob = output<Job>();

  jobs = input<Job[]>([
  ]);
}
