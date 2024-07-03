import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsbackComponent } from './newsback.component';
import { hackerNewsServices } from '../../services/hackerNewsServices';
import { of } from 'rxjs';
import { news } from '../../models/news';
import { FormsModule } from '@angular/forms';

describe('NewsbackComponent', () => {
  let component: NewsbackComponent;
  let fixture: ComponentFixture<NewsbackComponent>;
  let hackerNewsServiceSpy: jasmine.SpyObj<hackerNewsServices>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('hackerNewsServices', ['getHackerNewsPaginated']);

    await TestBed.configureTestingModule({
      declarations: [ NewsbackComponent ],
      providers: [
        { provide: hackerNewsServices, useValue: spy }
      ],
      imports: [
        FormsModule
      ],
    })
    .compileComponents();

    hackerNewsServiceSpy = TestBed.inject(hackerNewsServices) as jasmine.SpyObj<hackerNewsServices>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsbackComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch news on ngOnInit', () => {
    const mockNews: news[] = [
      { id: 1, deleted:false, type:"news", title: 'News 1', text: 'Text 1', url:"http:fake.com" },
      { id: 2, deleted:false, type:"news", title: 'News 2', text: 'Text 2', url:"http:fake2.com" }
    ];
    const mockResponse = { data: mockNews, totalPages: 2, totalItems: 20, currentPage: 1 };

    hackerNewsServiceSpy.getHackerNewsPaginated.and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.news).toEqual(mockResponse.data);
    expect(component.totalPages).toBe(mockResponse.totalPages);
    expect(component.totalItems).toBe(mockResponse.totalItems);
    expect(component.loading).toBeFalse();
  });

  it('should fetch previous page on previousPage', () => {
    const mockNews: news[] = [
      { id: 1, deleted:false, type:"news", title: 'News 1', text: 'Text 1', url:"http:fake.com" },
    { id: 2, deleted:false, type:"news", title: 'News 2', text: 'Text 2', url:"http:fake2.com" },
    ];
    const mockResponse = { data: mockNews, totalPages: 2, totalItems: 20, currentPage: 1 };

    component.currentPage = 2;
    hackerNewsServiceSpy.getHackerNewsPaginated.and.returnValue(of(mockResponse));

    component.previousPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(1);
    expect(component.news).toEqual(mockResponse.data);
    expect(component.loading).toBeFalse();
  });

  it('should fetch next page on nextPage', () => {
    debugger;
    const mockNews: news[] = [
      { id: 1, deleted:false, type:"news", title: 'News 1', text: 'Text 1', url:"http:fake.com" },
    { id: 2, deleted:false, type:"news", title: 'News 2', text: 'Text 2', url:"http:fake2.com" },
    ];
    const mockResponse = { data: mockNews, totalPages: 2, totalItems: 20, currentPage: 1 };

    component.currentPage = 1;
    hackerNewsServiceSpy.getHackerNewsPaginated.and.returnValue(of(mockResponse));

    component.nextPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(2);
    expect(component.news).toEqual(mockResponse.data);
    expect(component.loading).toBeFalse();
  });

  it('should fetch filtered news on filterNews', (done) => {
    const mockNews: news[] = [
      { id: 1, deleted:false, type:"news", title: 'News 1', text: 'Text 1', url:"http:fake.com" },
      { id: 2, deleted:false, type:"news", title: 'News 2', text: 'Text 2', url:"http:fake2.com" },
    ];
    const mockResponse = { data: mockNews, totalPages: 2, totalItems: 20, currentPage: 1 };

    hackerNewsServiceSpy.getHackerNewsPaginated.and.returnValue(of(mockResponse));

    component.searchTerm = 'test';
    component.filterNews();
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.currentPage).toBe(1);
      expect(component.news).toEqual(mockResponse.data);
      expect(component.loading).toBeFalse();
      done();
    }, 2000);
  });
});