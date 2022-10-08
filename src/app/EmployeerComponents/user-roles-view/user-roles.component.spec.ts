import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesViewComponent } from './user-roles.component';

describe('UserRolesComponent', () => {
  let component: UserRolesViewComponent;
  let fixture: ComponentFixture<UserRolesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRolesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRolesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
