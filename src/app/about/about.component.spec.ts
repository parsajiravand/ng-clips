import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AboutComponent } from "./about.component";


describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let component: AboutComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create about component', () => {
    expect(component).toBeTruthy();
  });
});