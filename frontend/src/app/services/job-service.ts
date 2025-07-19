import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Job } from '../models/job';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  url = environment.API_URL+'/jobs'; // Replace with your actual API endpoint
  httpClient=inject(HttpClient);

  getJobs() {
    return this.httpClient.get<Job>(this.url);
  }
  
  getJob(id: number) {
    return this.httpClient.get<any>(this.url + '/' + id);
  }
}
