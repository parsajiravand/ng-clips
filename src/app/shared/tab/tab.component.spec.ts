import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';
import { By } from '@angular/platform-browser';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should have .hidden class', () => {
    const element = fixture.debugElement.query(By.css('.hidden'));

    expect(element).toBeTruthy();
  });
  it('Should not have .hidden class', () => {
    component.active = true;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.hidden'));

    expect(element).not.toBeTruthy();
  });
});
