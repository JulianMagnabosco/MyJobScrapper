import { Component, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { SearchBar } from "../search-bar/search-bar";

@Component({
  selector: 'app-settings',
  imports: [FormsModule, SearchBar],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  urls = signal([
    { url: '/settings/general' },  
  ]);


  addUrl(text: string) {
    this.urls.update(urls => [...urls, { url: text }]);
  }

  removeItem(index: number) {
    this.urls.update(urls => urls.filter((_, i) => i !== index));
  }
}
