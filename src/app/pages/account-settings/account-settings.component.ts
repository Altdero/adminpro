import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _settingsService: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiaTema(e: any) {
    this.aplicarCheck(e.target);
    this._settingsService.aplicarTema( e.srcElement.dataset.theme );
  }

  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('working');

    for (const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._settingsService.ajustes.tema;

    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
