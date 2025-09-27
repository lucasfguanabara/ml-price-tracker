export interface MlSearchResult {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  permalink: string;
}

export interface MlItemDetail {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  pictures?: { url: string }[];
  sold_quantity?: number;
  permalink?: string;
  thumbnail?: string;
}
