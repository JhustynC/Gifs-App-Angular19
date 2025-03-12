import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { ListComponent } from "../../components/list/list.component";
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'page-gif-history',
  templateUrl: './gis-history.component.html',
  imports: [UpperCasePipe, ListComponent],
  // inputs: [],
  // outputs: [],
  // styleUrls: [],
  // providers: [],
  // changeDetection: ChangeDetectionStrategy.OnPush
  // standalone: true,
})
export default class GifHistory {

  gifsService = inject(GifService);


  // Forma de obtener los parametros mediante Observables
  // paramOnUrl =  inject(ActivatedRoute).params.subscribe({
  //   next: (param) => console.log(`Esto es lo que vamos a buscar: ${param['query']}`),
  //   error: (err) => console.error(err),
  //   complete: () => console.log("Param obtained")
  // })


  // Metodo de obtener los parametros mediante Signals
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map( params =>  params['query']))
  );

  gifsByKey = computed(() => this.gifsService.getHistoryGifs(this.query()));
}
