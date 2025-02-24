import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  imageUrls: string[] = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
  ];

  // private _tagHistory: string[] = [];
  // private _apiKey: string = 'QyKJrFYzZGtyMofFILHb5ODvcJiLWoMu';
  // private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  // public listGifs: IDataGif[] = [];

  // constructor(private http: HttpClient) {
  //   this.loadLocalStorage();
  //   this.loadFirstHistoryTag();
  // }

  // get tagsHistory() {
  //   return [...this._tagHistory];
  // }

  // private searchLocalStorage(): void {
  //   localStorage.setItem('history', JSON.stringify(this._tagHistory));
  // }

  // private loadLocalStorage(): void {
  //   const temporal = localStorage.getItem('history');
  //   if (!temporal) return;
  //   console.log('Existe un historial');
  //   this._tagHistory = JSON.parse(temporal!);
  // }

  // private loadFirstHistoryTag(): void {
  //   if (this._tagHistory.length > 0) this.searchTag(this._tagHistory[0]);
  // }

  // public searchTag(tag: string): void {
  //   //Validaciones
  //   if (tag.length === 0) return;
  //   this.organizeHistory(tag);

  //   //QueryParameters
  //   const params = new HttpParams()
  //     .set('api_key', this._apiKey)
  //     .set('limit', '10')
  //     .set('q', tag);

  //   //Peticion
  //   this.http
  //     .get<IGiphySearchResponse>(`${this._serviceUrl}/search`, {
  //       params: params,
  //     })
  //     .subscribe({
  //       next: (resp) => {
  //         this.listGifs = resp.data;
  //         resp.data.forEach((g) => console.log(g.url));
  //       },
  //       error: (err) => console.error(err),
  //       complete: () => console.info('Complete'),
  //     });
  // }

  // private organizeHistory(tag: string): void {
  //   if (this._tagHistory.includes(tag)) {
  //     this._tagHistory = this._tagHistory.filter((t) => t !== tag);
  //   }
  //   this._tagHistory.unshift(tag);
  //   this._tagHistory = this._tagHistory.splice(0, 10);
  //   this.searchLocalStorage();
  // }

}
