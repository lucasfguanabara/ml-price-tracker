import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { TrackerService } from '../tracker.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  q = '';
  results: any[] = [];
  loading = false;
  constructor(private api: ProductService, private tracker: TrackerService) {}

  search() {
    if (!this.q.trim()) return;
    this.loading = true;
    this.api.search('MLB', this.q, 30).subscribe({
      next: r => { this.results = r; this.loading = false; },
      error: e => { console.error(e); this.loading = false; alert('Erro na busca'); }
    });
  }

  track(item: any) {
    this.tracker.addFromSearch(item);
    alert('Item adicionado ao rastreador');
  }
}
