import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  let appComponent: HTMLElement;

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
    appComponent = fixture.nativeElement;
  });

  describe('Routing', () => {

    const routingTests = [
      { path: '/', pageId: 'home-page' },
      { path: '/signup', pageId: 'sign-up-page' },
      { path: '/login', pageId: 'login-page' },
      { path: '/user/1', pageId: 'user-page' },
      { path: '/user/2', pageId: 'user-page' },
      { path: '/activate/123', pageId: 'activation-page' },
      { path: '/activate/456', pageId: 'activation-page' },
    ];

    routingTests.forEach(({ path, pageId }) => {
      it(`displays ${pageId} when path is ${path}`, async () => {
        await router.navigate([`${path}`]);
        const page = appComponent.querySelector(`[data-testid="${pageId}"]`);
        expect(page).toBeTruthy();
      });
    });

    const linkTests = [
      { path: '/', title: 'Home' },
      // { path: '/signup', title: 'Sign Up' },
      // { path: '/login', title: 'Login' },
    ]

    linkTests.forEach(({ path, title }) => {
      it(`has link with title ${title} to ${path}`, () => {
        const linkElement = appComponent.querySelector(`a[title="${title}"]`) as HTMLAnchorElement;
        expect(linkElement.pathname).toEqual(path);
      })
    });

    const navigationTests = [
      {
        initialPath: '/',
        clickingTo: 'Sign Up',
        visiblePage: 'sign-up-page',
      },
      {
        initialPath: '/signup',
        clickingTo: 'Home',
        visiblePage: 'home-page',
      },
      {
        initialPath: '/',
        clickingTo: 'Login',
        visiblePage: 'login-page',
      },
    ]

    navigationTests.forEach(({ initialPath, clickingTo, visiblePage }) => {
      it(`displays ${visiblePage} after clicking ${clickingTo}link `, fakeAsync(
        async () => {
          await router.navigate([initialPath]);
          const linkElement = appComponent.querySelector(`a[title="${clickingTo}"]`) as HTMLAnchorElement;
          linkElement.click();
          tick(); // equivatent to await
          fixture.detectChanges();
          const page = appComponent.querySelector(`[data-testid="${visiblePage}"]`);
          expect(page).toBeTruthy();
        }
      ));
    });
  });
});
