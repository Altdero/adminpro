import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Usuario } from '../models/usuario.models';

import swal from 'sweetalert2';
declare function blabla(): any; // ---> Inicialización de las funciones del template de Admin Pro

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  /**
   * Crea una instancia de RegisterComponent.
   *
   * @param router - Librería para navegar entre componentes
   * @param _usuarioService - Servicio de usuario
   */
  constructor(
    private router: Router,
    private _usuarioService: UsuarioService
  ) {
    blabla();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
      contrasena2: new FormControl(null, Validators.required),
      termcond: new FormControl(false),
    }, {validators: this.sonIguales('contrasena', 'contrasena2')});

    this.forma.setValue({
      nombre: 'Test 1',
      correo: 'test1@test.com',
      contrasena: '123456',
      contrasena2: '123456',
      termcond: true,
    });
  }

  ngOnInit() {
  }

  /**
   * Valida que 2 cadenas de texto sean diferentes
   *
   * @param campo1 - Cadena de texto 1 para comparar
   * @param campo2 - Cadena de texto 2 para comparar
   * @returns - Regresa un valor nulo en caso de que las cadenas sean iguales o un objeto en caso de que sean diferentes
   */
  sonIguales(campo1: string, campo2: string): ValidatorFn {
    return (group: FormGroup) => {
      const texto1 = group.controls[campo1].value;
      const texto2 = group.controls[campo2].value;

      if (texto1 === texto2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  /**
   * Realiza el registro del usuario
   *
   * @returns - Sin retorno
   */
  registrarUsuario(): void {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.termcond) {
      swal.fire('Uuups...', 'Debes aceptar los Términos y Condiciones', 'warning');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.contrasena
    );

    this._usuarioService.crearUsuario(usuario).subscribe(
      () => this.router.navigate(['/login']),
      (err: any) => swal.fire('¡Lo sentimos!', err.error.mensaje, 'error')
    );
  }

}
