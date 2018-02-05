import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalFilterComponent } from './regional-filter.component';

describe('RegionalFilterComponent', () => {
  let component: RegionalFilterComponent;
  let fixture: ComponentFixture<RegionalFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
