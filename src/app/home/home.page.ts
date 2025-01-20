import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';

interface RootObject {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Datum[];
  support: Support;
}

interface Support {
  url: string;
  text: string;
}

interface Datum {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  auxemail!:string;
  auxfirstname!:string;
  auxlastname!:string;

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

  async addIdazle() {
    console.log('Sortu idazle');
    const alert = await this.alertController.create({
      header: 'Sortu Idazlea',
      inputs: [
        {
          name: 'first_name',
          type: 'text',
          value: this.auxfirstname,
          placeholder: 'Izena',
        },
        {
          name: 'last_name',
          type: 'text',
          value: this.auxlastname,
          placeholder: 'Abizena',
        },
        {
          name: 'email',
          type: 'email',
          value: this.auxemail,
          placeholder: 'Email',
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
            this.auxfirstname = data.first_name;
            this.auxlastname = data.last_name;
            this.auxemail = data.email;
            this.dataArray.push(data)
            console.log('Idazle sortuta:');
          },
        },
      ],
    });

    await alert.present();
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
          placeholder: 'Email',
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
