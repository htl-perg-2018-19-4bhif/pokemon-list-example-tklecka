import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) { }

  public baseURL = 'https://pokeapi.co/api/v2/';

  get(url: string): Observable<Object> {
    const endpointUrl = `${this.baseURL}${url}`;
    return this.http.get(endpointUrl);
  }

}
