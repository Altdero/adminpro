import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  @Input() leyenda = 'Leyenda';
  @Input() progreso = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cambiarValor( valor: number ) {
    if ( this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }

    if ( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    this.cambioValor.emit( this.progreso );

    this.txtProgreso.nativeElement.focus();
  }

  _onChange( event: number ) {
    if (event >= 100) {
      this.progreso = 100;
    } else if (event <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = event;
    }

    this.txtProgreso.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );
  }

}
