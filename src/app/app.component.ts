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
      <footer>
        Desenvolvido por <strong>Lucas</strong> |
        <a href="https://github.com/lucasfguanabara" target="_blank">GitHub</a>
      </footer>
    </div>
  `,

  styles: [`
    body, html { margin: 0; font-family: 'Segoe UI', sans-serif; background: #f0f2f5; }
    .container { max-width: 900px; margin: 20px auto; padding: 10px; }
    h1 { text-align: center; color: #1a73e8; margin-bottom: 25px; }
    hr { margin: 20px 0; border-color: #ccc; }
    footer { text-align: center; margin-top: 30px; font-size: 13px; color: #777; }
    footer a { color: #1a73e8; text-decoration: none; font-weight: 500; }
    footer a:hover { text-decoration: underline; }
  `]
  // styleUrls: ['./styles.css']
})
export class AppComponent {}

