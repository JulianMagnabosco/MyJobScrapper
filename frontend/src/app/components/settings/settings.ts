import { Component, inject, OnInit, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { SearchBar } from "../search-bar/search-bar";
import { JobService } from '../../services/job-service';
import { Url } from '../../models/url';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings implements OnInit {
  urls = signal<Url[]>([
  ]);
  service= inject(JobService);

  state = signal<'running'|'stop'>('stop'); // Signal to hold the state of the component

  spiders = signal<string[]>([]);
  spiderSelected = ''; // Variable to hold the selected spider
  text = ''; // Signal to hold the input text for adding URLs

  ngOnInit(): void {
    this.service.getUrls().subscribe({
      next: (data) => {
        this.urls.set(data.data);
      }
    })
    this.service.getSpiders().subscribe({
      next: (data) => {
        this.spiders.set(data.spiders);
        this.spiderSelected= this.spiders().length > 0 ? this.spiders()[0] : ''; // Set the first spider as default if available
      }
    })
    this.checkCrawl();
  }

  crawl(){
    if (!confirm('Quieres regenerar la base?')) {
      return
    }
    const data = { urls: this.urls() };
    this.service.crawl(data).subscribe({
      next: (data:any) => {
        this.state.set('running');
        console.log('Database updated:', data);
      }
    });
  }

  checkCrawl() {
    this.service.checkCrawl().subscribe({
      next: (data:any) => {
        this.state.set(data.code === 2 ? 'running' : 'stop');
      }
    });
  }

  addUrl() {
    const data:Url = {"path": this.text, "spider": this.spiderSelected};
    if (!data.path || !data.spider) return;
    this.service.addUrl(data).subscribe({
      next: (data:any) => {
        this.urls.update(urls => [...urls, data["object"]]);
        this.text = ''; // Clear the input field after adding
      }
    })

  }

  removeItem(index: number) {
    const url = this.urls().at(index);
    this.service.deleteUrl(url?._id.$oid).subscribe({
      next: (data) => {
        this.urls.update(urls => urls.filter((_, i) => i !== index));
      }
    })
  }
}
