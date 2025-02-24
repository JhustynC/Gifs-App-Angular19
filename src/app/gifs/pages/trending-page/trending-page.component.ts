import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'page-trending-component',
  imports: [ListComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent {
  readonly gifsService = inject(GifsService);
}
