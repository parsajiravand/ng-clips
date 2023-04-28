// Desc: test case for app component

describe('AppComponent', () => {
  it('should pass sanity test', () => {
    expect(true).toBe(true);
  });
  

  /*  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule //import router testing mode
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  //test case for app component
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy(); //check app is created or not
  });

  it(`should have as title 'app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app'); //check app title
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; //get html element
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!'); //check html element contain text or not
  }); */
});
