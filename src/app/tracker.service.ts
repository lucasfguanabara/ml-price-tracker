import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { MlItemDetail } from './models';
import { BehaviorSubject, interval, switchMap } from 'rxjs';

export interface TrackedItem {
  id: string;
  title: string;
  history: { price: number; ts: number }[];
  thumbnail?: string;
  permalink?: string;
}

const STORAGE_KEY = 'price-tracker-items-v1';

@Injectable({ providedIn: 'root' })
export class TrackerService {
  private list: TrackedItem[] = [];
  private $items = new BehaviorSubject<TrackedItem[]>([]);
  items$ = this.$items.asObservable();

  constructor(private api: ProductService) {
    this.load();
    // opcional: refrescar preços a cada 30 minutos (client-side)
    // aqui mostramos como configurar, mas o usuário pode alterar o intervalo.
    interval(1000 * 60 * 30).pipe(
      switchMap(() => this.refreshAll())
    ).subscribe();
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list));
    this.$items.next(this.list.slice());
  }

  private load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { this.list = JSON.parse(raw); } catch { this.list = []; }
    } else this.list = [];
    this.$items.next(this.list.slice());
  }

  addFromSearch(item: { id: string; title: string; price: number; thumbnail?: string; permalink?: string }) {
    let found = this.list.find(i => i.id === item.id);
    const ts = Date.now();
    if (!found) {
      found = {
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        permalink: item.permalink,
        history: [{ price: item.price, ts }]
      };
      this.list.push(found);
    } else {
      found.history.unshift({ price: item.price, ts });
    }
    this.save();
  }

  remove(id: string) {
    this.list = this.list.filter(i => i.id !== id);
    this.save();
  }

async refreshAll(): Promise<void> {
  const promises = this.list.map(async li => {
    try {
      const detail = await this.api.getItem(li.id).toPromise();
      if (detail) {
        li.history.unshift({ price: detail.price, ts: Date.now() });
        li.title = detail.title || li.title;
        li.thumbnail = detail.thumbnail || li.thumbnail;
        li.permalink = detail.permalink || li.permalink;
      }
    } catch (e) {
      console.warn('Erro ao atualizar item', li.id, e);
    }
  });
  await Promise.all(promises);
  this.save();
}}