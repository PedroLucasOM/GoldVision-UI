import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  exibirMenu: boolean;

  constructor() {
  }

  onMudarExibicaoMenu() {
    this.exibirMenu = !this.exibirMenu;
  }

  onEsconderMenu() {
    this.exibirMenu = false;
  }
}
