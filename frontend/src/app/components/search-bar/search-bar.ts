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

  nameAction = input<string>(''); // Input to hold the action name

  action = output<string>();

  click(){
    this.action.emit(this.text);
    this.text= ''; // Clear the input after emitting the action
  }
}
