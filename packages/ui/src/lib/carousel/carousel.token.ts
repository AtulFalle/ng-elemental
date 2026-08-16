import { InjectionToken } from '@angular/core';

export type ElCarouselSize = 'sm' | 'md' | 'lg';

export interface ElCarouselContext {
  isSlideActive(slide: object): boolean;
}

export const EL_CAROUSEL = new InjectionToken<ElCarouselContext>('ElCarousel');
