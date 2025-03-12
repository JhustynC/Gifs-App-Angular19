import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';
// import { ListComponent } from '../../components/list/list.czomponent';

@Component({
  selector: 'page-trending-component',
  // imports: [ListComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent implements AfterViewInit {
  readonly gifService = inject(GifService);
  readonly scrollStateService = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('scrollDiv');

  constructor() {
    this.gifService.fetchTrendingGifs();
  }

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.getTrendingScrollState();
  }

  refreshGifs() {
    this.gifService.fetchTrendingGifs(true);
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeigth = scrollDiv.clientHeight;
    const scrollHeigth = scrollDiv.scrollHeight;

    console.log({
      scrollTop,
      clientHeigth,
      scrollHeigth,
      totalScroll: scrollTop + clientHeigth,
    });
    const isAtBottom = scrollTop + clientHeigth + 300 >= scrollHeigth;
    // console.log(isAtBottom);
    this.scrollStateService.setTrendingScrollState(scrollTop);

    if (isAtBottom) {
      this.gifService.fetchTrendingGifs();
    }
  }
}
