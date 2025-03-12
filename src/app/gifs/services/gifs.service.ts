import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@enviroments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

// Record<string, Gif[]>
// {
//   'goku': [gif1, gif2, gif3];
//   'saitma': [gif1, gif2, gif3];
//   'jujutsu': [gif1, gif2, gif3];
// }

const GIF_HISTORY_KEY = 'gif-history';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_HISTORY_KEY);
  return gifsFromLocalStorage ? JSON.parse(gifsFromLocalStorage) : {};
};

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed<string[]>(() => {
    console.log(`AQUI ESTAN LAS LLAVES: ${Object.keys(this.searchHistory())}`);
    return Object.keys(this.searchHistory());
  });

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoaded = signal<boolean>(false);
  trendingGifsLoading = signal<boolean>(false);
  private trendingPage = signal<number>(0);

  trendingGroupsOf3GifsList = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    // console.log({ groups });
    return groups;
  });

  gifsByQuery = signal<Gif[]>([]);
  gifsByQueryLoading = signal<boolean>(true);

  constructor() {}

  fetchTrendingGifs(forceReSearch: boolean = true): void {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    // Only fetch if data hasn't been loaded yet or if forceRefresh is true
    if (!this.trendingGifsLoaded() || forceReSearch) {
      this.trendingGifsLoading.set(true);

      this.http
        .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
          params: {
            api_key: environment.giphyKey,
            limit: 20,
            offset: this.trendingPage() * 20,
          },
        })
        .subscribe((res) => {
          // console.log({ res });
          const gifs = GifMapper.mapGiphyItemToGifArray(res.data);
          this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
          this.trendingPage.update((page) => page + 1);
          this.trendingGifsLoaded.set(false); //Always in false for "infinite scroll" works
          this.trendingGifsLoading.set(false);
        });
    }
  }

  async fetchGifsByQuerySignal(query: string): Promise<void> {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyKey,
          limit: 20,
          q: query,
        },
      })
      .subscribe((res) => {
        const gifs = GifMapper.mapGiphyItemToGifArray(res.data);
        this.gifsByQuery.set(gifs);
      });
  }

  featchGifsByQueryObservable(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyKey,
          limit: 10,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemToGifArray(items)),

        // History
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

  //! Que los efectos solo hagan una y sola un cosa
  saveToLocalStorage = effect(() => {
    console.log('Saving gif-history');
    localStorage.setItem(GIF_HISTORY_KEY, JSON.stringify(this.searchHistory()));
  });
}
