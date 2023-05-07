import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  const mockedAuthService = jasmine.createSpyObj(
    'AuthService',
    ['createUser', 'logout'],
    {
      isAuthenticated$: of(true),
    }
  );
  const mockModalService = jasmine.createSpyObj('ModalService', [
    'toggleModal',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockedAuthService },
        {
          provide: ModalService,
          useValue: mockModalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should logout', () => {
    const logoutLink = fixture.debugElement.query(By.css('.logout'));
    expect(logoutLink).toBeTruthy(); // check if logout method has been called


    logoutLink.triggerEventHandler('click', null); // trigger click event
    const service = TestBed.inject(AuthService); // get AuthService from TestBed
    expect(service.logout).withContext('Could not click logout button').toHaveBeenCalledTimes(1); // check if logout method has been called
  });
});
