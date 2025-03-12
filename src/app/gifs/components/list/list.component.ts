import { Component, input } from "@angular/core";
import { ListItemComponent } from "./list-item/list-item.component";
import { Gif } from "../../interfaces/gif.interface";


@Component({
  selector: 'component-list',
  templateUrl: './list.component.html',
  imports: [ListItemComponent],

})
export class ListComponent {
  listItems = input.required<Gif[]>();
}
