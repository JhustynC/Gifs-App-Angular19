import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-trending-component',
  imports: [],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent { }
