import { Component } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";
import { List } from "../list/list";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Job } from '../../models/job';

@Component({
  selector: 'app-search',
  imports: [SearchBar, List, MatGridListModule, MatCardModule, MatChipsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  selectedJob?: Job = {
    title: 'Titulo del trabajo',
    company: 'comañia',
    location: 'Remoto',
    description: 'Descripción del trabajo, incluyendo los requisitos y responsabilidades.',
    datePosted: new Date(),
    url: '',
    salary: '1000',
    type: 'Full-time',
    id: 0
  }; // Variable to hold the selected job
}
