import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-create-clientes',
  templateUrl: './create-clientes.component.html',
  styleUrls: ['./create-clientes.component.css'],
})
export class CreateClientesComponent implements OnInit {
  createCliente: FormGroup;
  submitted = false;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private _clienteService: ClienteService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.createCliente = this.fb.group({
      cliente: ['', Validators.required],
      lastname: ['', Validators.required],
      Email: ['', Validators.required],
      Telefono: ['', Validators.required],
      Documento: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarCliente() {
    this.submitted = true;
    if (this.createCliente.invalid) {
      return;
    }
    const cliente: any = {
      name: this.createCliente.value.cliente,
      lastname: this.createCliente.value.lastname,
      email: this.createCliente.value.Email,
      Telefono: this.createCliente.value.Telefono,
      document: this.createCliente.value.Documento,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    this.loading = true;

    this._clienteService.agregarCliente(cliente).subscribe(() => {
      this.toastr.success(
        'el cliente fue registrado con exito',
        'cliente registrado',
        { positionClass: 'toast-bottom-right' }
      );
      this.loading = false;
      this.router.navigate(['/list-clientes']);
    });
  }
}
