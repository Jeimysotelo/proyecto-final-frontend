import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLocationComponent } from './show-location.component';

describe('ShowLocationComponent', () => {
  let component: ShowLocationComponent;
  let fixture: ComponentFixture<ShowLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
