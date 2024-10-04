// @ts-ignore
import { SwiperOptions } from "swiper/types";

export const swiperConfig: SwiperOptions = {
  autoHeight: true,
  navigation: true,
  init: false,
  slidesPerView: 1,
  centeredSlides: true,
  breakpoints: {
    400: {
      slidesPerView: "auto",
      centeredSlides: false
    },
  }
}

export const swiperPagConfig: SwiperOptions = {
  spaceBetween: 10,
  slidesPerView: "auto",
  init: false
}
