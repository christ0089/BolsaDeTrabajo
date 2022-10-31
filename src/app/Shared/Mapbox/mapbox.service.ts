import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeoPoint } from '@firebase/firestore';
import { Geohash, geohashForLocation } from 'geofire-common';
declare let google: any;

export interface MapboxOutput {
  attribution: string[];
  features: Feature[];
  query: string;
}

export interface Feature {
  place_name: string;
  context: Context[];
}

export interface Context {
  id: string;
  text: string;
}

export interface AddressComponents {
  long_name: string;
  short_name: string;
  geo_code?: GeoPoint;
  geo_hash?: Geohash,
  types: string;
}

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  service = new google.maps.places.AutocompleteService();

  constructor(private http: HttpClient) {}

  search_word(query: string, _predictions: any) {
    let me = this;
    this.service.getPlacePredictions(
      {
        input: query,
        componentRestrictions: {
          country: 'mx',
        },
      },
      (predictions: any, status: any) => {
        _predictions(predictions);
      }
    );
  }

  geoCode(address: string, res: any) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results: any, status: any) => {
      const locationComponents: any = [
        results[0].geometry.location.lng(),
        results[0].geometry.location.lat(),
      ];

      const lon = locationComponents[0];
      const lat = locationComponents[1];

      const address_components: AddressComponents[] =
        results[0].address_components;

      address_components.push({
        long_name: '',
        short_name: '',
        types: 'geo_code',
        geo_code: new GeoPoint(lat, lon),
        geo_hash: geohashForLocation([lat,lon])
      });
      res(address_components);
    });
  }
}
