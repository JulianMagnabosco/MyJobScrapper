import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Job } from '../models/job';
import { environment } from '../../environments/environment';
import { Url } from '../models/url';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  url = environment.API_URL; // Replace with your actual API endpoint
  httpClient=inject(HttpClient);

  getJobs(params: any) {
    return this.httpClient.get<Job>(this.url+'/jobs',{
      params: params
    });
  }

  hideJob(id: string) {
    return this.httpClient.put<any>(this.url + '/hide/' + id,{});
  }
  
  deleteJob(id: string) {
    return this.httpClient.delete<any>(this.url + '/jobs/' + id);
  }
  
  crawl(data: any) {
    return this.httpClient.post<any>(this.url + '/crawl', data);
  }
  checkCrawl() {
    return this.httpClient.get<any>(this.url + '/status');
  }


  
  getSpiders() {
    return this.httpClient.get<any>(this.url+'/spiders');
  }
  
  getUrls() {
    return this.httpClient.get<any>(this.url+'/urls');
  }
  addUrl(data:any) {
    return this.httpClient.post<Url>(this.url+'/urls',data);
  }
  deleteUrl(id:string) {
    return this.httpClient.delete<Url>(this.url+'/urls/'+id);
  }
}
