import { Component, OnInit } from '@angular/core';
import { Functions } from '@angular/fire/functions';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { httpsCallable } from '@firebase/functions';
import * as json2csv from 'json2csv';
import { IEmployer } from 'src/app/Models/employer';
import { IJobApplication } from 'src/app/Models/job_application';
import { IJobPosition } from 'src/app/Models/job_postition';
import { Timestamp } from '@firebase/firestore';

@Component({
  selector: 'app-reported-applications',
  templateUrl: './reported-applications.component.html',
  styleUrls: ['./reported-applications.component.sass'],
})
export class ReportedApplicationsComponent implements OnInit {
  campaignOne!: FormGroup;
  link: SafeUrl | null = null;
  loading = false;

  constructor(
    private functions: Functions,
    private snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, day - 7)),
      end: new FormControl(new Date(year, month, day + 1)),
    });
  }

  ngOnInit(): void {}

  async applicationStatusReport() {
    this.loading = true;
    const report = httpsCallable<any>(
      this.functions,
      'applicationStatusReport'
    );
    await report({
      min_date: this.campaignOne.get('start')?.value,
      max_date: this.campaignOne.get('end')?.value,
    }).then((res: any) => {
      console.log(res);
      this.link = this.applicationToFlat(res.data[0]);
      if (!this.link) {
        throw new Error('No data');
      }
    });

    this.loading = false;
  }
  async employeerCreationReport() {
    this.loading = true;
    this.link = null;
    const report = httpsCallable<any>(
      this.functions,
      'employeerCreationReport'
    );

   


    await report({
      min_date: this.campaignOne.get('start')?.value,
      max_date: this.campaignOne.get('end')?.value,
    })
      .then((res: any) => {
        console.log(res);
        this.link = this.companyToFlat(res.data[0]);
        if (!this.link) {
          throw new Error('No data');
        }
      })
      .catch((e) => {
        this.snackBar.open(
          'Se ha actualizado correctamente la aplicación',
          '',
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['red-snackbar'],
            duration: 2000,
          }
        );
        console.error(e);
      });
    this.loading = false;
  }
  async hiringReport() {
    this.loading = true;
    this.link = null;
    const report = httpsCallable(this.functions, 'hiringReport');
    report({
      min_date: this.campaignOne.get('start')?.value,
      max_date: this.campaignOne.get('end')?.value,
    })
      .then((res: any) => {
        const flattenedArray = [].concat.apply([], res.data);

        console.log(flattenedArray);
        
        this.link = this.statusToFlat(flattenedArray);
        if (!this.link) {
          throw new Error('No data');
        }
      })
      .catch((e) => {
        this.snackBar.open(
          'No se genero el reporte',
          '',
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['red-snackbar'],
            duration: 2000,
          }
        );
        console.error(e);
      });

    this.loading = false;
  }

  statusToFlat(data: any[]) {
    console.log(data);
    const res = data.map((job: IJobApplication) => {

      let jsDate = "" 
      if (job.contractDate) {
        const milliseconds = job.contractDate._seconds * 1000 + job.contractDate._nanoseconds / 100000;
        console.log(milliseconds)
        jsDate = new Date(+milliseconds).toDateString()
      } 
      
      return {
        Id: job.id,
        'Nombre del trabajo': job.job_position.name,
        Estatus: job.status,
        'Nombre de usuario':
          job.personal_data.fname + job.personal_data.lname,
        'Nivel de educacion' : job.personal_data.school_level || "",
        'Nacionalidad': job.personal_data.nationality || "",
        'Fecha de Decision': jsDate || "",
        Empresa: job.employer.company_name,
        // "Fecha de Creacion": (job.job.createdAt as Timestamp).toDate().toUTCString() || "-",
        // "Fecha de Actualizacion":  (job.job.updated as Timestamp).toDate().toUTCString() || "-",
      };
    });
    return this.objectToCSV(res);
  }

  applicationToFlat(data: IJobPosition[]) {
    const res = data.map((position: IJobPosition) => {
      return {
        Id: position.id,
        Estatus: position.closing_reason || '-',
        Empresa: position.employer.company_name || '-',
        'Email de contacto': position.employer.contact_email,
        'Teléfono de contacto': position.employer.contact_phone,
        'Descripción': position.description || '-',
        "Numero de Aplicantes": position.applicants,
        // "Fecha de Creacion": (job.job.createdAt as Timestamp).toDate().toUTCString() || "-",
        // "Fecha de Actualizacion":  (job.job.updated as Timestamp).toDate().toUTCString() || "-",
      };
    });
    return this.objectToCSV(res);
  }

  companyToFlat(data: IEmployer[]) {
    const res = data.map((employer: IEmployer) => {
      let jsDate = "" 
      if (employer.createdAt) {
        const milliseconds = employer.createdAt._seconds * 1000 + employer.createdAt._nanoseconds / 100000;
        console.log(milliseconds)
        jsDate = new Date(+milliseconds).toDateString()
      } 

      return {
        Id: employer.id,
        Estatus: employer.status,
        Empresa: employer.company_name,
        'Email de contacto': employer.contact_email,
        'Teléfono de contacto': employer.contact_phone,
        'Descripción': employer.description || '-',
        Direccion: employer.street,
        "Fecha de Creacion": jsDate || "-",
        // "Fecha de Actualizacion":  (job.job.updated as Timestamp).toDate().toUTCString() || "-",
      };
    });
    return this.objectToCSV(res);
  }

  objectToCSV(flatOrder: any[]) {
    console.log(flatOrder.length);
    if (flatOrder.length > 0) {
      const fields = [...Object.keys(flatOrder[0])];
      const ops = { fields, output: 'report_file.csv' };
      const csv = json2csv.parse(flatOrder, ops);
      return this.domSanitizer.bypassSecurityTrustUrl(
        'data:text/csv,' + encodeURIComponent(csv)
      );
    }
    return null;
  }
}
