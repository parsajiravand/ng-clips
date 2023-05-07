import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabContainerComponent } from './tab-container.component';
import { Component } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { By } from '@angular/platform-browser';
@Component({
  template: `
    <app-tab-container>
      <app-tab title="Tab 1">
        <p>Tab 1 content</p>
      </app-tab>
      <app-tab title="Tab 2">
        <p>Tab 2 content</p>
      </app-tab>
    </app-tab-container>
  `,
})
class TestHostComponent {}

describe('TabContainerComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabContainerComponent, TabComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shoould have 2 tabs', () => {
    const element = fixture.debugElement.queryAll(By.css('li'));
    const containerComponent = fixture.debugElement.query(
      By.directive(TabContainerComponent)
    );

    const tabsProps = containerComponent.componentInstance.tabs;
    console.log(tabsProps);

    expect(element.length).withContext('Tabs did not render').toBe(2);
    expect(tabsProps.length).withContext('Could not grab component property').toBe(2);
  });
});
