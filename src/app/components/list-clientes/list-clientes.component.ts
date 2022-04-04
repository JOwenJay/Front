import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  clientes: any[] = [];
  constructor(private _clienteService: ClienteService,
    private toastr: ToastrService) { 
   }

  ngOnInit(): void {
    this.getClientes()
  }

  getClientes(){
    this._clienteService.getClientes().subscribe(data=>{
      this.clientes = [];
      data.forEach((element:any) => {
       /* console.log(element.payload.doc.id); */
       /* console.log(element.payload.doc.data()); */
       this.clientes.push({
         id: element.payload.doc.id,
         ...element.payload.doc.data()
       })
      });
      console.log(this.clientes);
    });
  }

  eliminarClientes(id : string){
    this._clienteService.eliminarCliente(id).then(()=>{
      console.log('cliente eliminado')
      this.toastr.error('Cliente Eliminado','Registro eliminado!',{
        positionClass: 'toast-top-right'
      })
    }).catch(error=>{
      console.log(error);
    })
  }

}
