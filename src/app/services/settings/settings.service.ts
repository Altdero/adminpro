import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem( 'ajustes', JSON.stringify(this.ajustes) );
  }

  cargarAjustes() {
    this.ajustes = ( localStorage.getItem( 'ajustes' ) ) ? JSON.parse( localStorage.getItem( 'ajustes' ) ) : this.ajustes;

    this.aplicarTema( this.ajustes.tema );
  }

  aplicarTema( tema: string ) {
    const temaUrl = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('theme').setAttribute('href', temaUrl);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = temaUrl;

    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
