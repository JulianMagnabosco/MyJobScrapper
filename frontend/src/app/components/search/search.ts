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
    this.search({}); // Initial search with empty parameters
  }

  hide(){
    if (!this.selectedJob) return;
    this.service.hideJob(this.selectedJob._id.$oid).subscribe({
      next: (data) => {
        console.log('Job hidden:', data);
        this.jobs.update(jobs => jobs.map(job => 
          job._id.$oid === this.selectedJob?._id.$oid ? {...job, hidden: true} : job
        )); // Update the jobs list to reflect the hidden status
        this.selectedJob = undefined; // Clear the selected job after hiding
      },
      error: (error) => {
        console.error('Error hiding job:', error);
      }
    });
  }

  deleteJob(){
    if (!confirm('Are you sure you want to delete this job?')) {
      return; // Exit if the user cancels the deletion
    }
    this.service.deleteJob(this.selectedJob?._id.$oid).subscribe({
      next: (data) => {
        console.log('Job deleted:', data);
        this.jobs.update(jobs => jobs.filter(job => job._id.$oid !== this.selectedJob?._id.$oid)); 
        this.selectedJob = undefined; // Clear the selected job after deletion
      }
      , error: (error) => {
        console.error('Error deleting job:', error);
      }
    });

  }

  search(data: any) {
    this.service.getJobs(data).subscribe((jobs: any) => {
      console.log('Jobs fetched:', jobs);
      this.jobs.set(jobs["data"]);
    });
  }
}
