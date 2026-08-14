import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type ElAttachmentMediaVariant = 'icon' | 'image';

@Component({
  selector: 'el-attachment-media',
  templateUrl: './attachment-media.html',
  styleUrl: './attachment-media.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-attachment-media-host',
  },
})
export class ElAttachmentMedia {
  readonly variant = input<ElAttachmentMediaVariant>('icon');

  protected readonly mediaClass = computed(() => ({
    'el-attachment-media': true,
    'el-attachment-media--icon': this.variant() === 'icon',
    'el-attachment-media--image': this.variant() === 'image',
  }));
}
