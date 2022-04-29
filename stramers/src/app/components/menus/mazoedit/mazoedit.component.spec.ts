import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazoeditComponent } from './mazoedit.component';

describe('MazoeditComponent', () => {
  let component: MazoeditComponent;
  let fixture: ComponentFixture<MazoeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazoeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
