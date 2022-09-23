import { Component } from '@angular/core';
import { ScriptService } from './Shared/Script/script.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'BolsaDeTrabajo';

  constructor(private scriptService: ScriptService) {
    this.scriptService.loadScript('googlemaps');
  }
}
