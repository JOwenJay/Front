import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css'],
})
export class ListClientesComponent implements OnInit {
  clientes: Customer[] = [];
  constructor(
    private _clienteService: ClienteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this._clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  eliminarClientes(id: string) {
    this._clienteService.eliminarCliente(id).subscribe(() => {
      console.log('cliente eliminado');
      this.toastr.error('Cliente Eliminado', 'Registro eliminado!', {
        positionClass: 'toast-top-right',
      });

      this.getClientes();
    });
  }
}
