import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  URL: string = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) {}

  agregarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/save`, cliente);
  }

  getClientes(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.URL}`);
  }

  eliminarCliente(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}/delete/${id}`);
  }
}
