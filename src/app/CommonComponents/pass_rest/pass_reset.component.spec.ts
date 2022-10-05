import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassRestComponent } from './pass_reset.component';

describe('PassRestComponent', () => {
  let component: PassRestComponent;
  let fixture: ComponentFixture<PassRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
