import { Injectable } from "@angular/core";
import { news } from "../models/news";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: "root",
  })

  export class HackerNewsServices {

    constructor (private http: HttpClient){}
    public news : news[] = [];
    
    getHackerNews(): Observable<news[]> {
      return this.http.get<news[]>("/HackerNews/getnewstories");
    }
  }