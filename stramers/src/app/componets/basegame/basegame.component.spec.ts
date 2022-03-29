import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasegameComponent } from './basegame.component';

describe('BasegameComponent', () => {
  let component: BasegameComponent;
  let fixture: ComponentFixture<BasegameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasegameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
