import { AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, viewChild } from '@angular/core';
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
    height:500px;
  }
  `
})
export class CarrouselProd implements AfterViewInit, OnChanges {

  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');
  swipper: Swiper | undefined = undefined

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['images'].firstChange) {
      return
    }

    console.log("el onchande de las imagenes", changes);

    if (!this.swipper) return;

    this.swipper.destroy(true,true)
    this.swiperInit()

  }


  ngAfterViewInit(): void {
    this.swiperInit()
  }

  swiperInit() {

    const element = this.swiperDiv().nativeElement;

    if (!element) return;


    this.swipper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

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


    // console.log('Swiper element:', element);
  }



}
