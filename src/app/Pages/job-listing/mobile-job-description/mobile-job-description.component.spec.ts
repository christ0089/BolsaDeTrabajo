import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileJobDescriptionComponent } from './mobile-job-description.component';

describe('MobileJobDescriptionComponent', () => {
  let component: MobileJobDescriptionComponent;
  let fixture: ComponentFixture<MobileJobDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileJobDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileJobDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
