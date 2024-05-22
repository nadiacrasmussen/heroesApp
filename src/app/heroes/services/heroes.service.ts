import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero-interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl:string= environments.baseUrl

  constructor(private httpClient:HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`)
  }


  getHeroById(id:string):Observable<Hero|undefined>{
return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
.pipe(
  catchError(error=>of(undefined))
)
}

getSuggestions(query:string): Observable<Hero[]>{
  return this.httpClient.get<Hero[]>(`/heroes?q=${query}&_limit=6`);
}

//para crear un nuevo heroe
addHero(hero:Hero):Observable<Hero>{
  return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`,hero);
}
//para actualizar el heroe, tambien funcionaria con un put
updateHero(hero:Hero):Observable<Hero>{
  if (!hero.id)throw Error('Hero is required');
  return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero);

}

deleteHeroById(id:string):Observable<boolean>{
  return this.httpClient.delete<Hero>(`${this.baseUrl}/heroes/${id}`)
  .pipe(
    map( resp => true),
    catchError(err=>of(false))
);

}
}
