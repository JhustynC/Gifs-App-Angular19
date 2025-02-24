import { Component, input } from "@angular/core";
import { ListItemComponent } from "./list-item/list-item.component";
import { ListItem } from "../../interfaces/list-item.interface";


@Component({
  selector: 'component-list',
  templateUrl: './list.component.html',
  imports: [ListItemComponent],

})
export class ListComponent {
  listItems = input.required<string[]>();
}
