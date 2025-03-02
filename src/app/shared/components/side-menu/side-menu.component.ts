import { Component } from '@angular/core';
import reactiveRoutes from '../../../reactive/country.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItem = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class SideMenuComponent {

  reactiveMenu: MenuItem[] = reactiveItem
    .filter( (item) => item.path != '**')
    .map( item => ({
      title: `${item.title}`,
      route: `reactive/${item.path}`,
    }))

    authMenu: MenuItem[] = [
      {
        title: 'Registro',
        route: './auth'
      }
    ]

    countryMenu: MenuItem[] = [
      {
        title: 'Paises',
        route: './country'
      }
    ]

}
