import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazoupdateComponent } from './mazoupdate.component';

describe('MazoupdateComponent', () => {
  let component: MazoupdateComponent;
  let fixture: ComponentFixture<MazoupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazoupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazoupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
