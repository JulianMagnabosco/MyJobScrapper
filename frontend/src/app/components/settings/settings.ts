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
      }
    })
  }

  crawl(){
    if (!confirm('Quieres regenerar la base?')) {
      return
    }
    const data = { urls: this.urls() };
    this.service.crawl(data).subscribe({
      next: (data:any) => {
        console.log('Database updated:', data);
      }
    });
  }

  addUrl() {
    const data:Url = {"path": this.text, "spider": this.spiderSelected};
    if (!data.path || !data.spider) return;
    this.service.addUrl(data).subscribe({
      next: (data:any) => {
        this.urls.update(urls => [...urls, data["object"]]);
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
