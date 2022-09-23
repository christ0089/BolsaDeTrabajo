import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GeoPoint } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/Models/Forms/question-base';
import { IQuestion } from 'src/app/Models/question';
import { AddressComponents } from 'src/app/Shared/Mapbox/mapbox.service';
import { QuestionControlService } from 'src/app/Shared/QuestionsService/question-control-service';
import { environment } from 'src/environments/environment';

declare let mapboxgl: any;

export interface IAddress {
  street: string;
  coords?: GeoPoint | null;
  hash_coords?: string | null;
  state: string;
  colonia: string;
  zip: string;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.sass'],
})
export class LocationComponent implements OnInit, OnChanges {
  @Input('locations') location: any = {
    lng: -102.5528,
    lat: 23.6345,
  };

  @Input() address: IAddress = {
    street: '',
    colonia: '',
    state: '',
    zip: '',
    coords: null,
  };

  @Output('onFormSave') onFormSave = new EventEmitter();
  @ViewChild('mapbox', { static: false }) mapbox!: ElementRef;

  form!: FormGroup;
  questions!: IQuestion;
  map!: any;
  marker: any = null;

  // address: any =

  constructor(private qcs: QuestionControlService) {}

  ngOnInit(): void {
   // this.questions = this.qcs.employerLocationQuestionaire();
   /// this.form = this.qcs.toFormGroup(this.questions.questions);
  }

  ngOnChanges() {
    //  this.openMap(this.location.lat, this.location.lon);

    if (this.address) {
      const questions: QuestionBase<any>[] = this.qcs.mapToQuestion(
        this.questions.questions,
        this.address
      );
      this.form = this.qcs.toFormGroup(questions);

      if (this.map && this.location) {
        this.map.flyTo({
          center: {
            lng: this.address.coords?.longitude,
            lat: this.address.coords?.latitude,
          },
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });

        this.marker = new mapboxgl.Marker({
          draggable: false,
        })
          .setLngLat({
            lng: this.address.coords?.longitude,
            lat: this.address.coords?.latitude,
          })
          .addTo(this.map);
      }
    }
  }

  ngAfterViewInit() {
    this.openMap(this.location.lat, this.location.lng);
  }

  openMap(lat: number, lng: number) {
    mapboxgl.accessToken = environment.mapbox;
    this.map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: {
        lng,
        lat,
      },
      zoom: 12,
      pitch: 55,
      container: 'mapbox',
      antialias: true,
    });

    this.map.on('load', async () => {
      this.map.addSource('zones', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://raw.githubusercontent.com/christ0089/PrtyGeoJson/main/map%20(2).geojson',
      });
      this.map.addLayer({
        id: 'avail_zones',
        type: 'fill',
        source: 'zones', // reference the data source
        layout: {},
        paint: {
          'fill-color': '#e70de0', // blue color fill
          'fill-opacity': 0.1,
        },
      });
    });
  }

  locationSelected(address: AddressComponents[]) {
    address.forEach((element) => {
      if (element.types.indexOf('route') > -1) {
        this.address.street = element.long_name;
      }
      if (element.types.indexOf('sublocality') > -1) {
        this.address.colonia = element.long_name;
      }
      if (element.types.indexOf('administrative_area_level_1') > -1) {
        this.address.state = element.long_name;
      }
      if (element.types.indexOf('postal_code') > -1) {
        this.address.zip = element.long_name;
        this.form.patchValue({ zip: element.long_name });
      }
      if (element.types.indexOf('geo_code') > -1) {
        this.address.coords = element.geo_code;
        this.address.hash_coords = element.geo_hash;

        this.map.flyTo({
          center: {
            lng: element.geo_code?.longitude,
            lat: element.geo_code?.latitude,
          },
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });

        if (this.marker === null) {
          this.marker = new mapboxgl.Marker({
            draggable: false,
          })
            .setLngLat({
              lng: element.geo_code?.longitude,
              lat: element.geo_code?.latitude,
            })
            .addTo(this.map);
        } else {
          this.marker
            .setLngLat({
              lng: element.geo_code?.longitude,
              lat: element.geo_code?.latitude,
            })
            .setDraggable(false);
        }
      }
    });
  }

  save() {
    this.onFormSave.emit({ address: this.address });
  }
}
