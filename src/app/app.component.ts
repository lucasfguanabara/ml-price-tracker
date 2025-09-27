import { Component } from '@angular/core';
import { SearchComponent } from './components/search.component';
import { TrackerComponent } from './components/tracker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchComponent, TrackerComponent],
  template: `
    <div class="container">
      <h1>Rastreador de Preços</h1>
      <app-search></app-search>
      <hr />
      <app-tracker></app-tracker>
    </div>
  `,
  // styleUrls: ['./styles.css']
})
export class AppComponent {}

