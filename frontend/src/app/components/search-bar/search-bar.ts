import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {

  text = ''; // Signal to hold the search text

  type = '';
  
  location = '';

  nameAction = input<string>(''); // Input to hold the action name

  action = output<any>();

  click(){
    const data = {
      search: this.text,
      type: this.type,
      location: this.location
    };
    this.action.emit(data);
  }
}
