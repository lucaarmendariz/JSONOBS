import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = 'assets/data/data.json'; // Ruta del archivo JSON

  constructor(private http: HttpClient) {}

  // Método para obtener los datos del JSON
  getData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
