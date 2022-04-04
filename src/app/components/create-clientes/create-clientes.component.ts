import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-create-clientes',
  templateUrl: './create-clientes.component.html',
  styleUrls: ['./create-clientes.component.css']
})
export class CreateClientesComponent implements OnInit {

  createCliente: FormGroup;
  submitted = false;
  loading = false;
  constructor(private fb: FormBuilder,
              private _clienteService:ClienteService,
              private router : Router,
              private toastr: ToastrService ){ 
    this.createCliente = this.fb.group(
      {
        cliente: ['', Validators.required],
        Email: ['', Validators.required],
        Telefono: ['', Validators.required],
        Producto: ['', Validators.required]
      }
    )

  }

  ngOnInit(): void {
  }

  agregarCliente(){
    this.submitted = true;
    if(this.createCliente.invalid){
     return;
    }
    const cliente: any ={
      cliente: this.createCliente.value.cliente,
      Email: this.createCliente.value.Email,
      Telefono: this.createCliente.value.Telefono,
      Producto: this.createCliente.value.Producto,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()

    }
    this.loading = true;
    
    this._clienteService.agregarCliente(cliente).then(()=>{
      this.toastr.success('el cliente fue registrado con exito','cliente registrado', {positionClass :'toast-bottom-right'});
      this.loading = false;
      this.router.navigate(['/list-clientes']);
      }).catch(error=>{
      console.log('error');
      this.loading = false;
   })
    
    
   
  }

}
