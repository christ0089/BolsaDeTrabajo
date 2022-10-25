import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-listing-filter',
  templateUrl: './job-listing-filter.component.html',
  styleUrls: ['./job-listing-filter.component.sass']
})
export class JobListingFilterComponent implements OnInit {

  filters = [
    {
      name: "Educación",
      selected: false,
      values: [
        "Secundaria", 
      "Preparatiria",
      "Bachillerato",
      "Liciensatura",
      ""
    ]
    },
    {
      name: "Industria",
      values: [
        
      ]
    },
    {
      name: "Remo",
      values: ""
    },
    {
      name: "Educación",
      values: ""
    },
    {
      name: "Educación",
      values: ""
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
