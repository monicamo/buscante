import { catchError, debounceTime, distinctUntilChanged, filter, map, Subscription, switchMap, tap, throwError } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { Item, Livro } from 'src/app/models/interface';
import { FormControl } from '@angular/forms';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  // listaLivros: Livro[] = [];
  campoBusca =new FormControl();
  // subscription: Subscription
  // livro: Livro

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap((retornoAPI) => console.log(retornoAPI)),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError(erro => {
      return throwError(() => new Error('Ops, ocorreu um erro!'))
    })
  )

  // buscarLivros() {
  //   console.log("🚀 Chamando buscarLivros() com:", this.campoBusca); // TESTE
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     next: (items) => {
  //       console.log("📚 Dados recebidos:", items); // TESTE
  //       this.listaLivros = items ? this.livrosResultadoParaLivros(items) : [];
  //     },
  //     error: erro => {
  //       console.error("❌ Erro ao buscar livros:", erro);
  //       this.listaLivros = [];
  //     }
  //   });
  // }


  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }
}


