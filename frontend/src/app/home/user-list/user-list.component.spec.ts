import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { getPage } from './test-helper';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from '../../app.routes';

const parsePagePramas = (request: TestRequest) => {
  let size = Number.parseInt(request.request.params.get('size')!);
  let page = Number.parseInt(request.request.params.get('page')!);

  if (Number.isNaN(size)) {
    size = 5;
  }

  if (Number.isNaN(page)) {
    page = 0;
  }

  return {
    size, page
  }
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, HttpClientTestingModule],
      providers: [
        provideRouter(routes),
        withHashLocation(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('display 3 users in list', () => {
    const request = httpTestingController.expectOne(() => true);
    const { page, size } = parsePagePramas(request);
    request.flush(getPage(page, size));
    fixture.detectChanges();
    const listItems = fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(3);
  });

  it('sends size param as 3', () => {
    const request = httpTestingController.expectOne(() => true);
    expect(request.request.params.get('size')).toBe('3');
  });

  it('displays next page button', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(0, 3));
    fixture.detectChanges();
    const nextPageButton = fixture.nativeElement.querySelector('button[data-testid="next-button"]');
    expect(nextPageButton).toBeTruthy();
  });

  it('request next page after clicking next page button', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(0, 3));
    fixture.detectChanges();
    const nextPageButton = fixture.nativeElement.querySelector('button[data-testid="next-button"]');
    nextPageButton.click();
    const nextPageRequest = httpTestingController.expectOne(() => true);
    expect(nextPageRequest.request.params.get('page')).toBe('1');
  });

  it('does not display next page at last page', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(2, 3));
    fixture.detectChanges();
    const nextPageButton = fixture.nativeElement.querySelector('button[data-testid="next-button"]');
    expect(nextPageButton).toBeFalsy();
  });

  it('does not display previous page button at first page', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(0, 3));
    fixture.detectChanges();
    const previousPageButton = fixture.nativeElement.querySelector('button[data-testid="previous-button"]');
    expect(previousPageButton).toBeFalsy();
  });

  it('displays previous button in page 2', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(1, 3));
    fixture.detectChanges();
    const previousPageButton = fixture.nativeElement.querySelector('button[data-testid="previous-button"]');
    expect(previousPageButton).toBeTruthy();
  });

  it('displays previous page after clicking previous page button', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(1, 3));
    fixture.detectChanges();
    const previousPageButton = fixture.nativeElement.querySelector('button[data-testid="previous-button"]');
    previousPageButton.click();
    const previousPageRequest = httpTestingController.expectOne(() => true);
    expect(previousPageRequest.request.params.get('page')).toBe('0');
  });

  it('displays spinner during the API call', () => {
    const request = httpTestingController.expectOne(() => true);
    expect(fixture.nativeElement.querySelector('span[role="status"]')).toBeTruthy();
    request.flush(getPage(0, 3));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span[role="status"]')).toBeFalsy();
  })
});
