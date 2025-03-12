import { Component, inject, signal,  } from "@angular/core";
import { ListComponent } from "../../components/list/list.component";
import { GifService } from "../../services/gifs.service";
import { Gif } from '../../interfaces/gif.interface';
import { Subject, takeUntil } from "rxjs";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-search-component',
  templateUrl: './search-page.component.html',
  imports: [CommonModule, ListComponent],
})
export default class SearchPageComponent {

  gifSevice = inject(GifService)
  searchedGifs = signal<Gif[]>([]);

  //unsubscriber
  private destroy$ = new Subject<void>();

  async onSearchObservable(value: string){
    this.gifSevice.featchGifsByQueryObservable(value)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.searchedGifs.set(res);
    });
  }

  async onSearchSignal(value: string){
    await this.gifSevice.fetchGifsByQuerySignal(value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    console.log("DETROY");
  }
}
