import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";
import { List } from "../list/list";
import { Job } from '../../models/job';
import { JobService } from '../../services/job-service';

@Component({
  selector: 'app-search',
  imports: [SearchBar, List],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  jobs = signal<Job[]>([
  ]);

  selectedJob?: Job;
  // selectedJob?: Job = {
  //   title: 'Titulo del trabajo',
  //   company: 'comañia',
  //   location: 'Remoto',
  //   description: 'Descripción del trabajo, incluyendo los requisitos y responsabilidades.',
  //   datePosted: new Date(),
  //   url: '',
  //   salary: '1000',
  //   type: 'Full-time',
  //   id: 0
  // }; // Variable to hold the selected job

  service= inject(JobService);

  selectJob(job: Job) {
    this.selectedJob = job; // Set the selected job when a job is clicked
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.search()
  }

  search(text: string = '') {
    this.service.getJobs().subscribe((jobs: any) => {
      console.log('Jobs fetched:', jobs);
      this.jobs.set(jobs["data"]);
    });
  }
}
