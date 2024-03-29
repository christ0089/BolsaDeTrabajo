import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { QuestionBase } from 'src/app/Models/Forms/question-base';
import { MapboxService } from 'src/app/Shared/Mapbox/mapbox.service';

@Component({
  selector: 'geo-question',
  templateUrl: './geo-question.component.html',
  styleUrls: ['./geo-question.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: '0',
        }),
        animate('.3s ease-in'),
      ]),
    ]),
  ],
})
export class GeoQuestionComponent implements OnInit {
  @Input() question!: QuestionBase<string | number | boolean | Date>;
  @Input() idx!: number;
  @Input() form!: FormGroup;
  @Output() geoLocation = new EventEmitter();
  modelChanged: Subject<string> = new Subject<string>();

  @ViewChild('input', { read: true, static: true }) inputElRef!: ElementRef;

  autocompleteItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private mapbox: MapboxService) {
    this.modelChanged
      .pipe(
        debounceTime(300), // wait 300ms after the last event before emitting last event
        distinctUntilChanged() // only emit if value is different from previous value
      )
      .subscribe((model) => {
        this.mapbox.search_word(model, (address: any) => {
          this.autocompleteItems.next(address);
        });
      });
  }

  chooseItem(item: any) {
    this.question.value = item.description;
    this.mapbox.geoCode(item.description, (res: any) => {
      this.geoLocation.emit(res);
      this.autocompleteItems.next([]);
    });
  }

  ngOnInit() {}

  updateSearch($event: any) {
    const val = $event.target.value.toLowerCase();
    if (val === '') {
      this.autocompleteItems.next([]);
      return;
    } else {
      this.modelChanged.next(val);
    }
  }
}
