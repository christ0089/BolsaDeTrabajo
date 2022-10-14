import { Component, OnInit } from '@angular/core';
import { Functions } from '@angular/fire/functions';
import { httpsCallable } from '@firebase/functions';

@Component({
  selector: 'app-reported-applications',
  templateUrl: './reported-applications.component.html',
  styleUrls: ['./reported-applications.component.sass'],
})
export class ReportedApplicationsComponent implements OnInit {
  constructor(private functions: Functions) {}

  ngOnInit(): void {}

  applicationStatusReport() {
    const report = httpsCallable(this.functions, "applicationStatusReport")
    report().then(console.log)
  }
  applicationNumberReport() {
    const report = httpsCallable(this.functions, "applicationNumberReport")
    report().then(console.log)
  }
  employeerCreationReport() {
    const report = httpsCallable(this.functions, "employeerCreationReport")
    report().then(console.log)
  }
  hiringReport() {
    const report = httpsCallable(this.functions, "hiringReport")
    report().then(console.log)
  }
}
