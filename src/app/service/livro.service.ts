import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivroResultado } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<LivroResultado> {
    const params = new HttpParams().set('q', valorDigitado);
    return this.http.get<LivroResultado>(this.API, { params })
    //.pipe(
      // tap(retornoAPI => console.log(retornoAPI)),
      //map(resultado => resultado.items ?? []),
      // tap(resultado => console.log(resultado))
   // );
  }

}
