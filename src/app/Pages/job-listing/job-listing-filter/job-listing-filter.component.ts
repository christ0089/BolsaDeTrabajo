import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-job-listing-filter',
  templateUrl: './job-listing-filter.component.html',
  styleUrls: ['./job-listing-filter.component.sass'],
})
export class JobListingFilterComponent implements OnInit, OnChanges {
  @Input('company') companies: string[] = [];
  @Input('filters') filters: any[] = [
    {
      name: 'Educación',
      filter: 'school_level',
      selected: false,
      values: [
        'Todos',
        'Secundaria',
        'Preparatoria',
        'Licienciatura',
        'Maestría',
      ],
      keys: ['', 'middleschool', 'highschool', 'university', 'masters'],
    },
    {
      name: 'Empresa',
      filter: 'company',
      values: ["Todos"],
      keys: [""],
    },
    {
      name: 'Salarios',
      filter: 'salaries',
      values: ['Todos', '+5 mil', '+10 mil', '+15 mil', '+25 mil'],
      keys: [0, 5000, 10000, 15000, 25000],
    },
  ];

  @Input('filterform') filterForm: FormGroup = this.formBuilder.group({
    school_level: [''],
    company: [''],
    salaries: [0],
  });

  @Output('onFilterChanges') onFilterChanges = new EventEmitter<string[]>();

  filtersChips: string[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.companies.length > 0) {
      this.filters[1].values = this.companies.concat('Todos');
      this.filters[1].keys = this.companies.concat('');
    }

    if (this.filters) {
    }

    if (this.filterForm) {
      this.filterForm.valueChanges.subscribe((val: any) => {
        this.filtersChips = [];
        Object.values<string | number>(this.filterForm.value).forEach(
          (v, i) => {
            if (v != '') {
              this.filtersChips.push(this.filters[i].name);
            }
          }
        );
        this.onFilterChanges.emit(this.filterForm.value);
      });
    }
  }

  removeFilter(filter: string) {
    const index = this.filtersChips.indexOf(filter);

    if (index >= 0) {
      this.filtersChips.splice(index, 1);
    }

    const filterIndex = this.filters.findIndex((v) => {
      console.log(v.name);
      return v.name === filter;
    });

    if (filterIndex > -1) {
      this.filterForm.get(this.filters[filterIndex].filter)?.setValue('');
    }
  }
}
