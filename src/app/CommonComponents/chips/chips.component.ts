import { Component, Input, OnInit } from '@angular/core';

export interface IElement {
  icon: string;
  elements: string[];
}

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.sass'],
})
export class ChipsComponent implements OnInit {
  @Input('element') element: IElement | null = null;
  constructor() {}

  ngOnInit(): void {}
}
