import { Component, OnInit } from '@angular/core';

import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import { Hospital } from '../../models/hospital.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  loading = false;
  totalHospitales = 0;
  hospitales: Hospital[] = [];
  desde = 0;

  constructor(
    private _hospitalService: HospitalService,
    private _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe((res: any) => this.cargarHospitales());
  }

  cargarHospitales(): void {
    this.loading = true;

    this._hospitalService.cargarHospitales(this.desde).subscribe((res: any) => {
      this.totalHospitales = res.total;
      this.hospitales = res.hospitales;
      this.loading = false;
    });
  }

  paginacion(desde: number): void {
    const pagina = this.desde + desde;

    if (pagina < 0 || pagina >= this.totalHospitales) {
      return;
    }

    this.desde = pagina;

    this.cargarHospitales();
  }

  buscarHospital(termino: string): void {
    this.loading = true;

    if (termino.length >= 1) {
      this._hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.loading = false;
      });
    } else {
      this.cargarHospitales();
    }
  }

  crearHospital(): void {
    Swal.fire({
      title: 'Crear hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result: any) => {
      if (result.value) {
        this._hospitalService.crearHospital(result.value).subscribe((res: boolean) => {
          Swal.fire('Hospital creado', result.value, 'success');
          this.cargarHospitales();
        });
      }
    });
  }

  actualizarHospital(hospital: Hospital): void {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital): void {
    // ---> Sweetalert2 con botones de Bootstrap
    /* const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    }); */

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de borrar "${hospital.nombre}"`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._hospitalService.borrarHospital(hospital._id).subscribe((res: any) => {
          this.cargarHospitales();
        });
      }
    });
  }

  mostrarModal(id: string): void {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

}
