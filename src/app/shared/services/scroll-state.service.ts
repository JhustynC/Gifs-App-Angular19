import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  private trendingScrollStete = signal<number>(0);
  constructor() {}

  setTrendingScrollState(val: number) {
    this.trendingScrollStete.set(val);
  }

  getTrendingScrollState() {
    return this.trendingScrollStete();
  }
}
