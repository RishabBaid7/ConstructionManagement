import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkforceComponent } from './manage-workforce.component';

describe('ManageWorkforceComponent', () => {
  let component: ManageWorkforceComponent;
  let fixture: ComponentFixture<ManageWorkforceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageWorkforceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWorkforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
