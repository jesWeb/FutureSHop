import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { productImagePipe } from '@app/products/pipes/product-image.pipe';
// importar swiper carousel
import Swiper from 'swiper';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// El import de estilos de paginación puede dar error de tipos en TypeScript
// @ts-ignore
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'carrousel-prod',
  imports: [productImagePipe],
  templateUrl: './Carrousel-prod.html',
  styles: `
  .swiper{
    width:100%;
    heigth:500px;
  }
  `
})
export class CarrouselProd implements AfterViewInit {

  @Input() images: string[] = [];

  @ViewChild('swiperDiv', { static: false }) swiperDiv!: ElementRef;

  ngAfterViewInit(): void {
    const element = this.swiperDiv?.nativeElement;
    if (!element) {
      return;
    }
    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      modules: [
        Navigation,
        Pagination
      ],

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });

    console.log('Swiper element:', element);
  }

}
