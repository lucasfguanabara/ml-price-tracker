import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MlSearchResult, MlItemDetail } from './models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // curl.exe -i "https://api.mercadolibre.com/sites/MLB/search?q=ps5"
// curl -i "https://api.mercadolibre.com/sites/MLB/search?q=ps5"

  private base = 'https://api.mercadolibre.com/items';

  constructor(private http: HttpClient) {}

  search(site = 'MLB', q = '', limit = 20): Observable<MlSearchResult[]> {
    const url = `${this.base}/sites/${site}/search?q=${encodeURIComponent(q)}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map(res => (res.results || []).map((r: any) => ({
        id: r.id,
        title: r.title,
        price: r.price,
        thumbnail: r.thumbnail,
        permalink: r.permalink
      } as MlSearchResult)))
    );
  }

  getItem(itemId: string): Observable<MlItemDetail> {
    const url = `${this.base}/items/${encodeURIComponent(itemId)}`;
    return this.http.get<MlItemDetail>(url);
  }
}
