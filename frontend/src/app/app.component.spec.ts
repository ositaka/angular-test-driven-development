import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { UserService } from './core/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [
        provideRouter(routes),
        withHashLocation(),
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Routing', () => {
    it('displays homepage at /', async () => {
      await router.navigate(['/']);
      const page = fixture.nativeElement.querySelector('[data-testid="home-page"]');
      expect(page).toBeTruthy();
    });

    it('displays sign up page at /signup', async () => {
      await router.navigate(['/signup']);
      const page = fixture.nativeElement.querySelector('[data-testid="signup-page"]');
      expect(page).toBeTruthy();
    });

    it('displays login page at /login', async () => {
      await router.navigate(['/login']);
      const page = fixture.nativeElement.querySelector('[data-testid="login-page"]');
      expect(page).toBeTruthy();
    });

    it('displays user page at /user', async () => {
      await router.navigate(['/user']);
      const page = fixture.nativeElement.querySelector('[data-testid="user-page"]');
      expect(page).toBeTruthy();
    });
  });
});
