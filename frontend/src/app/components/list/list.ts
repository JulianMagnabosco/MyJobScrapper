import { Component } from '@angular/core';
import { Job } from '../../models/job';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-list',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {

  jobs: Job[] = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Solutions',
      location: 'New York, NY',
      description: 'Develop and maintain web applications.',
      datePosted: new Date('2023-10-01'),
      url: 'https://example.com/job/1',
      salary: '$100,000 - $120,000',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Data Insights',
      location: 'San Francisco, CA',
      description: 'Analyze data and generate reports.',
      datePosted: new Date('2023-10-05'),
      url: 'https://example.com/job/2',
      salary: '$80,000 - $95,000',
      type: 'Part-time'
    }
  ]; // Array to hold job listings
}
