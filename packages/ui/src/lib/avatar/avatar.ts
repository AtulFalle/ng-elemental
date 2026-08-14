import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { ElIcon, type ElIconSize } from '../icon/icon';

export type ElAvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'el-avatar',
  imports: [ElIcon],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-avatar-host',
  },
})
export class ElAvatar {
  readonly src = input('');
  readonly alt = input('');
  readonly initials = input('');
  /** Font Awesome icon name without `fa-` prefix. Used when no image/initials. */
  readonly icon = input('');
  readonly size = input<ElAvatarSize>('md');

  private readonly failedSrc = signal<string | null>(null);

  protected readonly trimmedSrc = computed(() => this.src().trim());

  protected readonly showImage = computed(() => {
    const src = this.trimmedSrc();
    return !!src && this.failedSrc() !== src;
  });

  protected readonly showInitials = computed(
    () => !this.showImage() && !!this.initials().trim(),
  );

  protected readonly iconName = computed(() => {
    if (this.showImage() || this.showInitials()) {
      return null;
    }

    return this.icon().trim() || 'user';
  });

  protected readonly iconSize = computed((): ElIconSize => this.size());

  protected readonly hasAccessibleName = computed(() => !!this.alt().trim());

  protected readonly rootClass = computed(() => ({
    'el-avatar': true,
    'el-avatar--sm': this.size() === 'sm',
    'el-avatar--md': this.size() === 'md',
    'el-avatar--lg': this.size() === 'lg',
    'el-avatar--fallback': !this.showImage(),
  }));

  protected onImageError(): void {
    const src = this.trimmedSrc();
    if (src) {
      this.failedSrc.set(src);
    }
  }
}
