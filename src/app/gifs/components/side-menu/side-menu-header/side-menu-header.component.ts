import { Component } from "@angular/core";
import { environment } from "@enviroments/environment";


@Component({
  selector: 'component-side-menu-header',
  templateUrl: './side-menu-header.component.html'
})
export class SideMenuHeaderComponent {
  envs = environment;
}
