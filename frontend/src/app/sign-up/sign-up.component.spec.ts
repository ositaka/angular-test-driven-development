import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlertComponent } from '../shared/alert/alert.component';
import { ButtonComponent } from '../shared/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, HttpClientTestingModule, AlertComponent, ButtonComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Layout', () => {
    it('has Sign Up header', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const h1 = signUp.querySelector('h1');
      expect(h1?.textContent).toBe('Sign Up');
    });

    it('has username input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="username"]');
      const input = signUp.querySelector('input[id="username"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Username');
    });

    it('has email input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="email"]');
      const input = signUp.querySelector('input[id="email"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('E-mail');
    });

    it('has password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="password"]');
      const input = signUp.querySelector('input[id="password"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Password');
    });

    it('has password type for password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector('input[id="password"]') as HTMLInputElement;
      expect(input?.type).toBe('password');
    });

    it('has password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="passwordRepeat"]');
      const input = signUp.querySelector('input[id="passwordRepeat"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Password');
    });

    it('has password repeat type for password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector('input[id="passwordRepeat"]') as HTMLInputElement;
      expect(input?.type).toBe('password');
    });

    it('has Sign Up button', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.textContent).toContain('Sign Up');
    });

    it('disables the button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });

    // ------------------------------------------------------------------
    // Example of a test that uses the same test as the Jest test,
    // but instead of using expect(header).toBeInTheDocument();,
    // it uses expect(header).toBeTruthy();.
    // ------------------------------------------------------------------
    // import { render, screen } from '@testing-library/angular';
    // import { SignUpComponent } from './sign-up.component';

    // it('has Sign Up header', async () => {
    //   await render(SignUpComponent);
    //   const header = screen.getByRole('heading', { name: 'Sign Up' });
    //   expect(header).toBeTruthy();
    // });
  });

  describe('Interactions', () => {

    let button: any;
    let httpTestingController: HttpTestingController;
    let signUp: HTMLElement;

    const setupForm = async () => {
      httpTestingController = TestBed.inject(HttpTestingController);

      signUp = fixture.nativeElement as HTMLElement;

      await fixture.whenStable();
      const usernameInput = signUp.querySelector('input[id="username"]') as HTMLInputElement;
      const emailInput = signUp.querySelector('input[id="email"]') as HTMLInputElement;
      const passwordInput = signUp.querySelector('input[id="password"]') as HTMLInputElement;
      usernameInput.value = 'user1';
      usernameInput.dispatchEvent(new Event('input'));
      emailInput.value = 'user1@mail.com';
      emailInput.dispatchEvent(new Event('input'));
      emailInput.dispatchEvent(new Event('blur'));
      passwordInput.value = 'P4ssword';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      button = signUp.querySelector('button');
    }

    xit('enables the button when all the fields have vaid input', async () => {
      await setupForm();
      expect(button?.disabled).toBeFalsy();
    });

    xit('sends username, email and password to backend after clicking the button', async () => {
      await setupForm();
      // -------------------------------------------------------
      // The code below didn't work as expected from the course.
      // -------------------------------------------------------
      const req = httpTestingController.expectOne("/api/1.0/users");
      const requestBody = req.request.body;
      expect(requestBody).toEqual({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword'
      });
    });

    xit('disabled button when there is an ongoing api call', async () => {
      await setupForm();
      button.click();
      fixture.detectChanges();
      button.click();
      httpTestingController.expectOne("/api/1.0/users");
      expect(button.disabled).toBeTruthy();
    })

    xit('displays spinner while the api request is in progress', async () => {
      await setupForm();
      expect(signUp.querySelector('span[role="status"]')).toBeFalsy();
      button.click();
      fixture.detectChanges();
      expect(signUp.querySelector('span[role="status"]')).toBeTruthy();
    });

    xit('displays account activation notification after successful sign up request', async () => {
      await setupForm();
      expect(signUp.querySelector('.alert-success')).toBeFalsy();
      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({});
      fixture.detectChanges();
      const message = signUp.querySelector('.aelert-success');
      expect(message?.textContent).toContain('Please check your e-mail to activate your account');
    });

    xit('hides sign up form after successful sign up request', async () => {
      await setupForm();
      expect(signUp.querySelector('[data-testid="form-sign-up"]')).toBeTruthy();
      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({});
      fixture.detectChanges();
      expect(signUp.querySelector('[data-testid="form-sign-up"]')).toBeFalsy();
    });

    xit('displays validation error coming from backend after submit failuer', async () => {
      await setupForm();
      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({
        validationErrors: {
          email: 'E-mail in use'
        }
      }, {
        status: 400,
        statusText: "Bad Request"
      });
      fixture.detectChanges();
      expect(signUp.querySelector('[data-testid="form-sign-up"]')).toBeFalsy();
    });

    it('hides spinner after sign up request fails', async () => {
      await setupForm();
      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({
        validationErrors: {
          email: 'E-mail in use'
        }
      }, {
        status: 400,
        statusText: "Bad Request"
      });
      fixture.detectChanges();
      expect(signUp.querySelector('span[role="status"]')).toBeFalsy();
    });
  });

  describe('Validation', () => {

    const testCases = [
      { field: 'username', value: '', error: 'Username is required' },
      { field: 'username', value: '', error: 'Username must be at least 4 characters long' },
      { field: 'email', value: '', error: 'E-mail is required' },
      { field: 'email', value: 'wrong-format', error: 'Invalid e-mail address' },
      { field: 'password', value: '', error: 'Password is required' },
      { field: 'password', value: 'password', error: 'Password must have at least one uppercase, 1 lowercase letter and 1 number' },
      { field: 'password', value: 'passWORD', error: 'Password must have at least one uppercase, 1 lowercase letter and 1 number' },
      { field: 'password', value: 'pass1234', error: 'Password must have at least one uppercase, 1 lowercase letter and 1 number' },
      { field: 'password', value: 'PASS1234', error: 'Password must have at least one uppercase, 1 lowercase letter and 1 number' },
      { field: 'passwordRepeat', value: 'pass', error: 'Password ismatch' },
    ]

    testCases.forEach((field, value, error) => {
      xit(`displays ${error} when ${field} has '${value}'`, async () => {
        const signUp = fixture.nativeElement as HTMLElement;
        expect(signUp.querySelector(`[data-testid="${field}-validation]`)).toBeNull();
        const input = signUp.querySelector(`input[id="${field}"]`) as HTMLInputElement;
        input.value = value as any;
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        const validationElement = signUp.querySelector(`[data-testid="${field}-validation]`);
        expect(validationElement?.textContent).toContain(error);
      });

      xit(`displays E-mail in use when email is not unique'`, async () => {
        let httpTestingController = TestBed.inject(HttpTestingController);

        const signUp = fixture.nativeElement as HTMLElement;
        expect(signUp.querySelector(`[data-testid="email-validation]`)).toBeNull();
        const input = signUp.querySelector(`input[id="email"]`) as HTMLInputElement;
        input.value = "non-unique-email@mail.com";
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        const request = httpTestingController.expectOne(({ url, method, body }) => {
          if (url === "/api/1.0/users" && method === "POST") {
            body.email === "non-unique-email@mail.com"
          }
          return false;
        });
        request.flush({});
        fixture.detectChanges();
        const validationElement = signUp.querySelector(`[data-testid="email-validation]`);
        expect(validationElement?.textContent).toContain("E-mail in use");
      });

    });
  });
});
