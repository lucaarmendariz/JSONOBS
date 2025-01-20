import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  dataArray: any[] = []; // Array para almacenar los datos

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Llamar al servicio para obtener los datos
    this.dataService.getData().subscribe(
      (data) => {
        this.dataArray = data.data; // Rellenar el array con los datos del JSON
        console.log('Datos cargados:', this.dataArray);
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  addIdazle() {
    console.log('Añadir idazle');
    // Lógica para añadir un idazle (por ejemplo, abrir un modal o formulario)
  }
  
  editIdazle(idazle: any) {
    console.log('Editar idazle:', idazle);
    // Lógica para editar un idazle (por ejemplo, abrir un modal con los datos del idazle)
  }
  
  deleteIdazle(id: number) {
    console.log('Eliminar idazle con ID:', id);
    // Lógica para eliminar un idazle (por ejemplo, eliminar del array y actualizar la vista)
  }
  
}
