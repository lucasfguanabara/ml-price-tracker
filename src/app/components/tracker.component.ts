import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerService, TrackedItem } from '../tracker.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracker.component.html'
})
export class TrackerComponent {
  items$!: Observable<TrackedItem[]>;

  constructor(public tracker: TrackerService) {
    this.items$ = this.tracker.items$;
  }

  remove(id: string) {
    if (confirm('Remover item do rastreador?')) {
      this.tracker.remove(id);
    }
  }
}
