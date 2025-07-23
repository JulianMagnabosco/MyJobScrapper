import { Component, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  urls = signal([
    { url: '/settings/general' },  
  ]);

  text = '';

  addUrl() {
    this.urls.update(urls => [...urls, { url: this.text }]);
  }

  removeItem(index: number) {
    this.urls.update(urls => urls.filter((_, i) => i !== index));
  }
}
