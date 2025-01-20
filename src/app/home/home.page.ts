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
    // Beste elementu batzuk gehitu ditzakezu behar izanez gero
  ];

  constructor(private dataService: DataService, private alertController: AlertController) {}

  ngOnInit() {
    // Zerbitzuari deitu datuak lortzeko osagaia inicializatzean
    this.dataService.getData().subscribe(
      (data) => {
        this.dataArray = data.data; // JSON-etik datuak arrayan bete
        console.log('Datuak kargatuta:', this.dataArray);
      },
      (error) => {
        console.error('Errorea datuak kargatzean:', error);
      }
    );
  }

  // Idazle bat gehitzeko metodoa (oraindik guztiz inplementatu gabe)
  addIdazle() {
    console.log('Idazlea gehitu');
    // Hemen modal edo formulario bat ireki dezakezu idazle berri bat gehitzeko
  }

  // Idazle bat editatzeko metodoa
  async editIdazle(idazle: any) {
    const alert = await this.alertController.create({
      header: 'Idazlea editatu',
      inputs: [
        {
          name: 'first_name',
          type: 'text',
          value: idazle.first_name,
          placeholder: 'Izena',
        },
        {
          name: 'last_name',
          type: 'text',
          value: idazle.last_name,
          placeholder: 'Abizena',
        },
        {
          name: 'email',
          type: 'email',
          value: idazle.email,
          placeholder: 'Posta Elektronikoa',
        },
      ],
      buttons: [
        {
          text: 'Utzi',
          role: 'cancel',
          handler: () => {
            console.log('Edizioa bertan behera utzi da');
          },
        },
        {
          text: 'Gorde',
          handler: (data) => {
            // Idazlearen datuak formularioaren balio berriekin eguneratu
            idazle.first_name = data.first_name;
            idazle.last_name = data.last_name;
            idazle.email = data.email;
            console.log('Idazlea eguneratua:', idazle);
          },
        },
      ],
    });

    await alert.present();
  }

  // Idazle bat ezabatzeko metodoa baieztapenarekin
  async deleteIdazle(id: number) {
    const alert = await this.alertController.create({
      header: 'Ezabapena baieztatu',
      message: 'Ziur zaude idazle hau ezabatu nahi duzula?',
      buttons: [
        {
          text: 'Utzi',
          role: 'cancel',
          handler: () => {
            console.log('Ezabaketa bertan behera utzi da');
          },
        },
        {
          text: 'Ezabatu',
          role: 'destructive',
          handler: () => {
            this.confirmDelete(id);
          },
        },
      ],
    });

    await alert.present();
  }

  // Ezabaketa baieztatu
  confirmDelete(id: number) {
    this.dataArray = this.dataArray.filter((item) => item.id !== id); //
    console.log(`ID ${id} duen idazlea ezabatua`);
  }
}
