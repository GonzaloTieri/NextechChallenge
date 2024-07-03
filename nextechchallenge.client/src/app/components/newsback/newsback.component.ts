import { Component, OnDestroy, OnInit } from '@angular/core';
import { news } from '../../models/news';
import { hackerNewsServices } from '../../services/hackerNewsServices';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-newsback',
  templateUrl: './newsback.component.html',
  styleUrl: './newsback.component.css'
})
export class NewsbackComponent implements OnInit, OnDestroy  {
  news : news[] = [];
  loading: boolean = true;
  searchTerm: string = '';
  filteredNews: news[] = [];

  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;

  newsSubscription: Subscription | undefined;

  constructor(private _hackerNewsService: hackerNewsServices) {}

  ngOnInit() {
    this.loading = true;
    this.newsSubscription = this._hackerNewsService.getHackerNewsPaginated(this.searchTerm, this.currentPage).subscribe( (response) => {
      this.news = response.data;
      this.totalPages = response.totalPages;
      this.totalItems = response.totalItems;
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

  previousPage(): void {
    this.currentPage--;
    this.loading = true;
    this.newsSubscription = this._hackerNewsService.getHackerNewsPaginated(this.searchTerm, this.currentPage).subscribe( (response) => {
      this.news = response.data;
      this.totalPages = response.totalPages;
      this.totalItems = response.totalItems;
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

  nextPage(): void{
    this.currentPage++;
    this.loading = true;
    this.newsSubscription = this._hackerNewsService.getHackerNewsPaginated(this.searchTerm, this.currentPage).subscribe( (response) => {
      this.news = response.data;
      this.totalPages = response.totalPages;
      this.totalItems = response.totalItems;
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }


  filterNews(): void {
    setTimeout(() => {
      this.currentPage = 1;
      this.loading = true;
      this.newsSubscription = this._hackerNewsService.getHackerNewsPaginated(this.searchTerm, this.currentPage).subscribe( (response) => {
        this.news = response.data;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItems;
        this.loading = false;
      }, () => {
        this.loading = false;
      })
    }, 2000);
  }

  ngOnDestroy() {
    if (this.newsSubscription) {
      this.newsSubscription.unsubscribe();
    }
  }
}
