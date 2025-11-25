import { Component, input, computed, signal, linkedSignal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
})
export class Pagination {

  //valores de pagina
  pages = input(0)
  //donde inicia la paginacion
  currentPage = input<number>(1);
  //activacion dependiendo la pagina
  //trabaja bajo valor de una senal ya creada y la aocia a una nueva
  activatePage = linkedSignal(this.currentPage)


  //obtener la pagina
  getPageList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1)
  });



}
