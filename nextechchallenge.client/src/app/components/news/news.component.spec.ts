import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { news } from '../../models/news';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HackerNewsServices } from '../../services/HackerNewsServices';
import { AppComponent } from '../../app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let mockHackerNewsService;
  let newsListDummy: news[] = [
    { id: 1, deleted:false, type:"news", title: 'News 1', text: 'Text 1', url:"http:fake.com" },
    { id: 2, deleted:false, type:"news", title: 'News 2', text: 'Text 2', url:"http:fake2.com" },
  ];

  beforeEach(async () => {
    mockHackerNewsService = jasmine.createSpyObj(['getHackerNews']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent, NewsComponent],
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [
        { provide: HackerNewsServices, useValue: mockHackerNewsService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    // fixture = TestBed.createComponent(NewsComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter news based on search term', () => {
    component.news = newsListDummy;
    component.searchTerm = 'News 1';
    component.filterNews();
    
    expect(component.filteredNews.length).toBe(1);
    expect(component.filteredNews[0].title).toBe('News 1');
  });

  it('should reset filtered news when search term is empty', () => {
    component.news = newsListDummy;
    component.searchTerm = '';
    component.filterNews();
    
    expect(component.filteredNews.length).toBe(2);
  });

});
