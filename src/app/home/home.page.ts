import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  dataArray = [
    {
      id: 1,
      first_name: 'Michael',
      last_name: 'Lawson',
      email: 'michael.lawson@reqres.in',
      avatar: 'https://reqres.in/img/faces/7-image.jpg',
    },
    // Agrega más elementos según sea necesario
  ];

  constructor(private dataService: DataService, private alertController: AlertController) {}

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
  
  async editIdazle(idazle: any) {
    const alert = await this.alertController.create({
      header: 'Editatu Idazlea',
      inputs: [
        {
          name: 'first_name',
          type: 'text',
          value: idazle.first_name,
          placeholder: 'Nombre',
        },
        {
          name: 'last_name',
          type: 'text',
          value: idazle.last_name,
          placeholder: 'Apellido',
        },
        {
          name: 'email',
          type: 'email',
          value: idazle.email,
          placeholder: 'Correo Electrónico',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Edición cancelada');
          },
        },
        {
          text: 'Gorde',
          handler: (data) => {
            // Actualizar los datos del idazle
            idazle.first_name = data.first_name;
            idazle.last_name = data.last_name;
            idazle.email = data.email;
            console.log('Idazle actualizado:', idazle);
          },
        },
      ],
    });

    await alert.present();
  }
  
  deleteIdazle(id: number) {
    console.log('Eliminar idazle con ID:', id);
    // Lógica para eliminar un idazle (por ejemplo, eliminar del array y actualizar la vista)
  }
  
}
