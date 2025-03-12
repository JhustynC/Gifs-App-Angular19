import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuOption } from 'src/app/gifs/interfaces/menu-option.interface';
import { GifService } from 'src/app/gifs/services/gifs.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'component-side-menu-options',
  templateUrl: './side-menu-options.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class SideMenuOptionsComponent {

  gifsService = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Popular Gifs',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      subLabel: 'Search Gifs',
      route: '/dashboard/search'
    }
  ]
}
