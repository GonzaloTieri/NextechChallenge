import { Component } from '@angular/core';
import { news } from '../../models/news';
import { HackerNewsServices } from '../../services/HackerNewsServices';



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  constructor(private _hackerNewsService: HackerNewsServices) {}
  
  news : news[] = [];
  filteredNews: news[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  searchTerm: string = '';

  ngOnInit() {
    this.loading = true;
    this._hackerNewsService.getHackerNews().subscribe( (newsList) => {
      console.log(newsList);
      this.news = newsList;
      this.filteredNews = newsList;
      this.loading = false;
    }, (error) => {
      this.loading = false;
    })
  }

  filterNews(): void {
    if (!this.searchTerm) {
      this.filteredNews = this.news;
    } else {
      this.filteredNews = this.news.filter(newsItem =>
        newsItem.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
  }

}
