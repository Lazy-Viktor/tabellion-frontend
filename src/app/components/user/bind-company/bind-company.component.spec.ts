import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindCompanyComponent } from './bind-company.component';

describe('BindCompanyComponent', () => {
  let component: BindCompanyComponent;
  let fixture: ComponentFixture<BindCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BindCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BindCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
