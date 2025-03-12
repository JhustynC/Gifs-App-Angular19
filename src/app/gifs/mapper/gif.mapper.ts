import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy.interface';


export class GifMapper{
  static mapGiphyItemToGif({id, title, url}: GiphyItem): Gif{
    return {id, title, url}
  }
  static mapGiphyItemToGifArray(items: GiphyItem[]): Gif[] {
    return items.map((item: GiphyItem)=>{
      return {id: item.id, title: item.title, url: item.images.original.url}
    });
  }
}
