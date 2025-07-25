import { Component, inject, OnInit, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { SearchBar } from "../search-bar/search-bar";
import { JobService } from '../../services/job-service';
import { Url } from '../../models/url';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, SearchBar],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings implements OnInit {
  urls = signal<Url[]>([
  ]);
  service= inject(JobService);

  ngOnInit(): void {
    this.service.getUrls().subscribe({
      next: (data) => {
        this.urls.set(data.data);
      }
    })
  }

  addUrl(text: string) {
    const data = {"path": text}
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
