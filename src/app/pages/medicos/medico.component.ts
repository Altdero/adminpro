import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HospitalService, MedicoService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medico: Medico = new Medico('', '', '', null, '');
  hospital: Hospital = new Hospital('', '', '');
  hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _hospitalService: HospitalService,
    private _medicoService: MedicoService,
    private _modalUploadService: ModalUploadService,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      if (params.params.id !== 'nuevo') {
        this.cargarMedico(params.params.id);
      }
    });
  }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe((res: any) => {
      this.medico.img = res.medico.img;
    });
  }

  cargarMedico(idMedico: string) {
    this._medicoService.cargarMedico(idMedico).subscribe((medico: any) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital( this.medico.hospital );
    });
  }

  cargarHospitales(): void {
    this._hospitalService.cargarHospitales().subscribe((res: any) => {
      this.hospitales = res.hospitales;
    });
  }

  cambioHospital(idHospital: string) {
    this._hospitalService.obtenerHospital(idHospital).subscribe((hospital: Hospital) => this.hospital = hospital);
  }

  guardarMedico(f: NgForm): void {
    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe((medico: Medico) => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
