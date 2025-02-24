import { Component, input } from '@angular/core';

@Component({
  selector: 'component-list-item',
  templateUrl: './list-item.component.html',
  imports: []
})
export class ListItemComponent {
  itemUrl = input<string>();
 }
