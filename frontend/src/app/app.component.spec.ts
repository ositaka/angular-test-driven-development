import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
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
      const page = fixture.nativeElement.querySelector('[data-testid="homepage"]');
      expect(page).toBeTruthy();
    });
  });
});
