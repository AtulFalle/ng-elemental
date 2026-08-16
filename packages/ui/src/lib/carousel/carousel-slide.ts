import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { EL_CAROUSEL } from './carousel.token';

@Component({
  selector: 'el-carousel-slide',
  templateUrl: './carousel-slide.html',
  styleUrl: './carousel-slide.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-carousel-slide-host',
    '[class.el-carousel-slide-host--active]': 'active()',
    '[attr.aria-hidden]': 'active() ? null : true',
    '[attr.inert]': 'active() ? null : ""',
  },
})
export class ElCarouselSlide {
  private readonly carousel = inject(EL_CAROUSEL, { optional: true });

  protected readonly active = computed(
    () => this.carousel?.isSlideActive(this) ?? true,
  );

  protected readonly rootClass = computed(() => ({
    'el-carousel-slide': true,
    'el-carousel-slide--active': this.active(),
  }));
}
