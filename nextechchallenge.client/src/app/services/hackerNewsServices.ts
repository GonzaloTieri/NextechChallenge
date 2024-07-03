import { Injectable } from "@angular/core";
import { news } from "../models/news";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { paginatedNews } from "../models/paginatedNews";

@Injectable({
    providedIn: "root",
  })

  export class hackerNewsServices {

    constructor (private http: HttpClient){}
    public news : news[] = [];
    
    getHackerNews(): Observable<news[]> {
      return this.http.get<news[]>("/HackerNews/getnewstories");
    }

    getHackerNewsPaginated(searchText:string, pageNumber:number ): Observable<paginatedNews> {
      return this.http.get<paginatedNews>("/HackerNews/getnewstories/", { params: {
        searchText: searchText,
        pageNumber: pageNumber
      }});
    }
  }